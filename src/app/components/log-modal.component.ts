import {Component, OnInit} from 'angular2/core';
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Router} from 'angular2/router';
import {ElementRef} from "angular2/core";
import {Input} from "angular2/core";
import {ViewChild} from "angular2/core";
import {Output, EventEmitter} from "angular2/core";

@Component({
    selector: 'log-modal',
    template: require('../templates/log.tpl')
})

export class LogModalComponent {
    open: boolean = false;
    hours = '';
    text = '';
    log_action = 'Note';
    error = null;
    hours_valid = true;
    text_valid = true;

    @Input() task_id;
    @Input() task_name;

    @Input()
    set show(show: boolean) {
        this.open = show == true;
        if (this.open && this.elementRef.length) {
            this.elementRef.modal('show');
        }
    }
    get show() {
        return this.open;
    }

    @Output() onClose = new EventEmitter<boolean>();
    @Output() onUpdate = new EventEmitter<boolean>();

    elementRef: any;

    constructor(
        protected _taskService: TaskService,
        elementRef: ElementRef) {

        this.elementRef = $(elementRef.nativeElement);
        this.elementRef.addClass('modal fade');
        this.elementRef.attr('role', 'dialog');
        this.elementRef.on('hide.bs.modal', this.closeModal.bind(this));
    }

    closeModal() {
        this.onClose.emit(false);
        this.error = null;
    }

    updateTask() {
        this.elementRef.modal('hide');
        this.onUpdate.emit(true);
    }

    logAdd() {
        let id = this.task_id;
        this.hours_valid = true;
        this.text_valid = true;

        // Validate hours.
        if (this.hours && Number(this.hours).toString() != this.hours) {
            this.error = 'Неправильно заполнено поле рабочих часов. ';
            this.hours_valid = false;
        }

        // Validate text.
        if (this.text.length == 0) {
            this.error = this.error || '';
            this.error += 'Поле с комментарием -- пустое';
            this.text_valid = false;
        }
        if (this.hours_valid == false || this.text_valid == false) {
            return;
        }

        this._taskService
            .addLogToTask(id, this.hours, this.text, this.log_action)
            .subscribe(
                result => {
                    const body = result.json();

                    if (body.status != 'ok') {
                        this.error = body.message;
                    }
                    else {
                        this.hours = '';
                        this.text = '';
                        this.log_action = 'Note';
                        this.error = null;
                        this.hours_valid = true;
                        this.text_valid = true;
                        this.updateTask();
                        this.closeModal();
                    }
                    console.log(result)
                },
                error => {
                    console.error('Error: ', error);
                    if (typeof error == 'string') {
                        this.error = error;
                    }
                    else if (error.hasOwnProperty('_body')) {
                        this.error = error.json().message;
                    }
                }
            )
    }
}

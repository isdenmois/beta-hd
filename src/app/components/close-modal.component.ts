import {Component, OnInit} from 'angular2/core';
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Router} from 'angular2/router';
import {ElementRef} from "angular2/core";
import {Input} from "angular2/core";
import {ViewChild} from "angular2/core";
import {Output, EventEmitter} from "angular2/core";
import {LogModalComponent} from "./log-modal.component";

@Component({
    selector: 'close-modal',
    template: require('../templates/close-log.tpl')
})

export class CloseModalComponent extends LogModalComponent {

    constructor(
        protected _taskService: TaskService,
        elementRef: ElementRef) {
        super(_taskService, elementRef);
    }

    logAdd() {
        let id = this.task_id;
        this.hours_valid = true;
        this.text_valid = true;

        // Validate hours.
        if (this.hours && Number(this.hours).toString() != this.hours) {
            this.error = 'Неправильно заполнено поле рабочих часов.';
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
            .closeTask(id, this.hours || 0.0, this.text)
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
                        try {
                            this.error = error.json().message;
                        }
                        catch (ex) {
                            this.error = 'Ошибка сервера';
                        }
                    }
                }
            )
    }

}

import {Component, OnInit} from 'angular2/core';
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Router} from 'angular2/router';
import {ElementRef} from "angular2/core";
import {Input} from "angular2/core";
import {ViewChild} from "angular2/core";
import {Output, EventEmitter} from "angular2/core";
import {LogModalComponent} from "./log-modal.component";
import {AppService} from "../services/app.service";

@Component({
    selector: 'create-task-modal',
    template: require('../templates/create-task.tpl')
})

export class TaskCreateModalComponent {
    open: boolean = false;
    projects = [{id: 0, title: 'none'}];
    priorities = AppService.getPriorities();
    bins = AppService.getBin();
    types = AppService.getTaskTypes();

    project = 0;
    summary = '';
    priority = 3;
    bin = 2;
    type = 2;
    system = 7;
    testing = 0;
    approval = 0;

    error = '';

    @Output() onClose = new EventEmitter<boolean>();

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
    @Input()
    set projectList(projectList) {
        projectList = projectList || [];
        projectList.unshift({id: 0, title: 'none'});
        this.projects = projectList;
    }
    get projectList() {
        return this.projects;
    }
    @Input() userList;

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
    }

    taskCreate() {
        console.log(this);
    }

}

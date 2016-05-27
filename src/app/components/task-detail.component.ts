import {Component, OnInit} from 'angular2/core';
import {NewLineToBrPipe} from "../pipes/nl2br.pipe";
import {LogModalComponent} from "./log-modal.component";
import {CloseModalComponent} from "./close-modal.component";
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Log} from '../class/log';
import {RouteParams} from "angular2/router";
import {Title} from 'angular2/platform/browser';
import {AssignModalComponent} from "./assign-modal.components";

@Component({
    selector: 'task-list',
    template: require('../templates/task-detail.tpl'),
    styles:[],
    pipes: [NewLineToBrPipe],
    providers: [Title],
    directives: [LogModalComponent, CloseModalComponent, AssignModalComponent]
})

export class TaskDetailComponent implements OnInit{
    task: Task = null;
    logs: Log[] = [];
    error = null;
    log_show = false;
    close_modal_show = false;
    task_name = '';
    perms = {
        view: false,
        close: false,
        log: false,
        edit: false,
        reject: false,
        assign: false
    };
    modals = {
        log: false,
        close: false,
        assign: false
    };

    constructor(
        protected _taskService: TaskService,
        private _routeParams: RouteParams,
        private _title: Title) {
    }

    /**
     * Method implementation.
     * On init component send request and save tasks and logs.
     */
    ngOnInit() {
        this.updateTask();
    }

    updateTask() {
        let id = +this._routeParams.get('id');
        this._taskService
            .getTaskDetail(id)
            .subscribe(
                details => {
                    const perms = details.perms || [];
                    this.error = null;
                    this.task = details.task;
                    this.logs = details.logs;
                    this.perms = details.perms;
                    this.task_name = details.task_name;
                    this._title.setTitle(`#${this.task.id} ${this.task.title}`);
                },
                error => {
                    console.error('Error: ', error);
                    this.error = error;
                }
            );
    }

    /**
     * Open modal with selected type.
     * @param type
     */
    openModal(type) {
        this.modals[type] = true;
    }

    /**
     * Close modal with selected type.
     * @param type
     */
    closeModal(type) {
        this.modals[type] = false;
    }
}

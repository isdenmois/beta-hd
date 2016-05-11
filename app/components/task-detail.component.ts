import {Component, OnInit} from 'angular2/core';
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Log} from '../class/log';
import {RouteParams} from "angular2/router";
import {NewLineToBrPipe} from "../pipes/nl2br.pipe";
import {LogModalComponent} from "./log-modal.component";
import {CloseModalComponent} from "./close-modal.component";

function isFloat(n){
    return true;
}

@Component({
    selector: 'task-list',
    templateUrl: 'app/templates/task-detail.tpl',
    styles:[],
    pipes: [NewLineToBrPipe],
    directives: [LogModalComponent, CloseModalComponent]
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

    constructor(
        protected _taskService: TaskService,
        private _routeParams: RouteParams) {
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
                },
                error => {
                    console.error('Error: ', error);
                    this.error = error;
                }
            );
    }

    onLogOpen() {
        this.log_show = true;
    }
    logOnClose() {
        this.log_show = false;
    }

    onCloseModalOpen() {
        this.close_modal_show = true;
    }

    onCloseModalClose() {
        this.close_modal_show = false;
    }
}

import {Component, OnInit} from 'angular2/core';
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Log} from '../class/log';
import {RouteParams} from "angular2/router";
import {NewLineToBrPipe} from "../pipes/nl2br.pipe";

@Component({
    selector: 'task-list',
    templateUrl: 'app/templates/task-detail.tpl',
    styles:[],
    pipes: [NewLineToBrPipe]
})

export class TaskDetailComponent implements OnInit{
    task: Task = null;
    logs: Log[] = [];

    constructor(
        protected _taskService: TaskService,
        private _routeParams: RouteParams) {
    }

    /**
     * Method implementation.
     * On init component send request and save tasks and logs.
     */
    ngOnInit() {
        let id = +this._routeParams.get('id');
        this._taskService
            .getTaskDetail(id)
            .subscribe(
                details => {
                    this.task = details.task;
                    this.logs = details.logs;
                },
                error => console.error('Error: ' + error),
                () => console.log('Completed!')
            );
    }
}

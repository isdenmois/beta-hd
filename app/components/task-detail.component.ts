import {Component, OnInit} from 'angular2/core';
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Log} from '../class/log';
import {RouteParams} from "angular2/router";
import {NewLineToBrPipe} from "../pipes/nl2br.pipe";

function isFloat(n){
    return true;
}

@Component({
    selector: 'task-list',
    templateUrl: 'app/templates/task-detail.tpl',
    styles:[],
    pipes: [NewLineToBrPipe]
})

export class TaskDetailComponent implements OnInit{
    task: Task = null;
    logs: Log[] = [];
    error = null;
    hours = '';
    text = '';
    log_action = 'Note';
    log_error = null;
    hours_valid = true;
    text_valid = true;

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
                    this.error = null;
                    this.task = details.task;
                    this.logs = details.logs;
                },
                error => {
                    console.error('Error: ', error);
                    this.error = error;
                }
            );
    }

    logAdd() {
        let id = +this._routeParams.get('id');
        this.hours_valid = true;
        this.text_valid = true;

        // Validate hours.
        if (this.hours && !isFloat(this.hours)) {
            this.log_error = 'Неправильно заполнено поле рабочих часов';
            this.hours_valid = false;
        }

        // Validate text.
        if (this.text.length == 0) {
            this.log_error = this.log_error || '';
            this.log_error += 'Поле с комментарием -- пустое';
            this.text_valid = false;
        }
        if (this.hours_valid == false || this.text_valid == false) {
            return;
        }

        this._taskService
            .addLogToTask(id, this.hours, this.text, this.log_action)
            .subscribe(
                result => {
                    this.hours = '';
                    this.text = '';
                    this.log_action = 'Note';
                    this.log_error = null;
                    this.hours_valid = true;
                    this.text_valid = true;
                    this.updateTask();
                    $('#modal').modal('hide');
                    console.log(result)
                },
                error => {
                    console.error('Error: ', error);
                    this.log_error = error;
                }
            )
    }
}

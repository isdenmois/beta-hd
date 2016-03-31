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
            .getTaskDetailSlow(id)
            .then(details => {
                this.task = details.task;
                this.saveLogs(details.logs);
            });
    }

    /**
     * Format logs for render.
     * @param logs
     */
    saveLogs(logs: Array<Log>) {
        let logList = [];
        let lastDate = '';
        for (let i = 0, l = logs.length; i < l; i++) {
            // Create group.
            let date = logs[i].time.slice(0, 10);
            if (date != lastDate) {
                lastDate = date;

                let log = new Log();
                log.type = 'TIMELINE';
                log.time = lastDate;
                log.color = 'red';
                logList.push(log);
            }

            // Set icon and color for timeline.
            switch (logs[i].type) {
                case 'QUESTION':
                    logs[i].icon = 'question';
                    logs[i].color = 'green';
                    break;

                case 'MESSAGE':
                    logs[i].icon = 'envelope';
                    logs[i].color = 'blue';
                    break;

                case 'NOTE':
                    logs[i].icon = 'envelope';
                    logs[i].color = 'blue';
                    break;

                case 'ASSIGNED':
                    logs[i].icon = 'plus';
                    logs[i].color = 'yellow';
                    break;
            }

            logList.push(logs[i]);
        }

        this.logs = logList;
    }
}

/**
 * Define Task service.
 */
import {Injectable} from 'angular2/core';
import {Task} from "../class/task";
import {Http} from "angular2/http";
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import {Log} from "../class/log";
import {Headers} from "angular2/http";
import {URLSearchParams} from "angular2/http";

let delay = 0;

@Injectable()
export class TaskService {
    public taskList;

    constructor(private http:Http) {
    }

    priorities = {
        '2': 'Low',
        '3': 'Normal',
        '4': 'High',
        '5': 'Critical',
    };

    types = {
        '2': 'Поддержка',
        '3': 'Услуга',
        '8': 'Задача',
    };

    getPriority(priority_id) {
        return this.priorities[priority_id] ? this.priorities[priority_id] : '';
    }

    getTicketType(type_id) {
        return this.types[type_id] ? this.types[type_id] : '';
    }

    getDate(date): Date {
        let dateObject: Date = new Date(parseInt(date) * 1000);
        if (date && dateObject) {
            return dateObject;
        }
        return null;
    }

    /**
     * Return task list without delay.
     * @returns {Promise<Task[]>}
     */
    getTaskList(): any {
        return this.http.get('/rest/?op=getAssignedTaskList')
            .map(response => {
                let taskList = response.json();

                let newTaskList: Task[] = [];
                for (let i in taskList) {
                    newTaskList.push(this.formatTask(taskList[i]));
                }

                return newTaskList;
            });
    }

    formatTask(task: Task): Task {
        task.deadline = this.getDate(task.deadline);
        task.otime = this.getDate(task.otime);
        task.ctime = this.getDate(task.ctime);
        task.start_date = this.getDate(task.start_date);
        task.type = this.getTicketType(task.type_id);
        task.priority = this.getPriority(task.priority);
        if (!task.user_name) {
            task.user_name = task.user_id + '';
        }

        return task;
    }

    getLogs(logs) {
        if (logs && logs[0] && Array.isArray(logs[0])) {
            logs = logs[0];
        }

        let logList = [];
        let lastDate = '';
        for (let i = 0, l = logs.length; i < l; i++) {
            // Create group.
            let date = logs[i].created;
            if (date != lastDate) {
                lastDate = date;

                let log = new Log();
                log.type = 'TIMELINE';
                log.time = this.getDate(lastDate);
                log.color = 'red';
                logList.push(log);
            }

            let log = new Log();
            log.id = logs[i].lid;
            log.type = logs[i].action;
            log.task = logs[i].ticket_id;
            log.hours = logs[i].hours;
            log.user = logs[i].user_name || logs[i].user_id;
            log.time = this.getDate(logs[i].created);
            log.description = logs[i].entry;

            // Set icon and color for timeline.
            switch (log.type) {
                case 'Question':
                    logs[i].icon = 'question';
                    logs[i].color = 'green';
                    break;

                case 'Message':
                    log.icon = 'envelope';
                    log.color = 'blue';
                    break;

                case 'Note':
                    log.icon = 'envelope';
                    log.color = 'blue';
                    break;

                case 'ASSIGNED':
                    log.icon = 'user-plus';
                    log.color = 'yellow';
                    break;

                case 'CREATED':
                    log.icon = 'plus';
                    log.color = 'yellow';
                    break;

                case null:
                    log.icon = 'envelope';
                    log.color = 'blue';
                    break;
            }

            logList.push(log);
        }

        return logList;
    }

    /**
     * Return task detail with log list.
     * @param id
     * @returns {any}
     */
    getTaskDetail(id: number):any {
        return this.http.get('/rest/?op=getTaskInfo&tid=' + id)
            .map(response => {
                let taskInfo = response.json();
                return {
                    logs: this.getLogs(taskInfo.logs),
                    task: this.formatTask(taskInfo.task_info)
                }
            });
    }

    /**
     * Emulate delay and return task detail with log list.
     * @param id
     * @returns {Promise<Task[]>|Promise}
     */
    getTaskDetailSlow(id: number):any {
        return new Promise<Task[]>(resolve =>
            setTimeout(()=>resolve(this.getTaskDetail(id)), delay)
        );
    }

    /**
     * Send addLog request to backend.
     * @param id
     * @param hours
     * @param text
     * @param type
     */
    addLogToTask(id, hours, text, log_action) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        if (this.hours) {

        }

        let params = new URLSearchParams();
        params.set('tid', id);
        params.set('hours', hours);
        params.set('text', text);
        params.set('log_action', log_action);

        return this.http.post(
            '/rest/?op=addLog',
            params.toString(),
            { headers: headers }
        )
    }
}

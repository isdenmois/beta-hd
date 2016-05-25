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
import {serverPath} from '../constants/server';

let delay = 0;

@Injectable()
export class TaskService {
    public taskList;

    constructor(private http:Http) {
    }

    priorities = {
        '1': 'Critical',
        '2': 'High',
        '3': 'Medium',
        '4': 'Low',
        '5': 'Normal',
        '6': 'None',
        '7': 'Question',
        '8': 'Payment',
    };

    types = {
        '2': 'Поддержка',
        '3': 'Услуга',
        '7': 'Услуга',
        '8': 'Задача',
        '11': 'Продвижение',
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
        return this.http.get(`${serverPath}/?op=getAssignedTaskList`)
            .map(response => {
                let parsed = response.json();
                if (parsed.status == 'ok') {
                    let taskList = parsed.message;

                    let newTaskList:Task[] = [];
                    for (let i in taskList) {
                        newTaskList.push(this.formatTask(taskList[i]));
                    }

                    return {
                        status: 'ok',
                        message: newTaskList
                    };
                }

                return parsed;
            });
    }

    formatTask(task: Task): Task {
        task.id = +task.id;
        task.deadline = this.getDate(task.deadline);
        task.otime = this.getDate(task.otime);
        task.ctime = this.getDate(task.ctime);
        task.start_date = this.getDate(task.start_date);
        task.type = this.getTicketType(task.type_id);
        task.priority = this.getPriority(task.priority);
        task.color = '';

        if (task.status == 'CLOSED') {
            task.color = 'bg-gray disabled';
        }
        else {
            console.log(task.status, task.priority);
            switch (task.priority) {
                case 'Critical':
                    task.color = 'bg-red-active';
                    break;
                case 'High':
                    task.color = 'bg-red disabled';
                    break;
                case 'Question':
                    task.color = 'bg-green disabled';
                    break;
            }
        }

        if (!task.user_name) {
            task.user_name = task.user_id + '';
        }

        return task;
    }

    formatTaskName(task: Task): string {
        return`${task.type} #${task.id}: ${task.title}`;
    }

    formatPerms(perms = []) {
        return {
            view: perms.indexOf('view') >= 0,
            close: perms.indexOf('close') >= 0,
            log: perms.indexOf('log') >= 0,
            edit: perms.indexOf('edit') >= 0,
            reject: perms.indexOf('reject') >= 0,
            assign: perms.indexOf('assign') >= 0
        }
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
                    log.icon = 'comment-o';
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

                case 'CLOSE':
                    log.icon = 'close';
                    log.color = 'red';
                    break;

                case 'EDIT':
                    log.icon = 'pencil';
                    log.color = 'green';
                    break;

                case 'REJECTED':
                    log.icon = 'level-up';
                    log.color = 'red';
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
        return this.http.get(`${serverPath}/?op=getTaskInfo&tid=${id}`)
            .map(response => {
                let parsed = response.json();
                if (parsed.status = 'ok') {
                    let taskInfo = parsed.message;

                    let result = {
                        status: 'ok',
                        logs: this.getLogs(taskInfo.logs),
                        task: this.formatTask(taskInfo.task_info),
                        task_name: '',
                        perms: this.formatPerms(taskInfo.perms)
                    };
                    result.task_name = this.formatTaskName(result.task);

                    return result;
                }

                return parsed;
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
     * @param log_action
     */
    addLogToTask(id, hours, text, log_action) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = new URLSearchParams();
        params.set('tid', id);
        if (hours) {
            params.set('hours', hours);
        }
        else {
            params.set('hours', '0.0');
        }
        params.set('text', text);
        params.set('log_action', log_action);

        return this.http.post(
            '/rest/?op=addLog',
            params.toString(),
            { headers: headers }
        )
    }

    /**
     * Close request to backend.
     * @param id
     * @param hours
     * @param text
     */
    closeTask(id, hours, text) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = new URLSearchParams();
        params.set('tid', id);
        if (hours) {
            params.set('hours', hours);
        }
        else {
            params.set('hours', '0.0');
        }
        params.set('text', text);

        return this.http.post(
            '/rest/?op=closeTask',
            params.toString(),
            { headers: headers }
        )
    }
}

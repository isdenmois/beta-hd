/**
 * Define Task service.
 */
var core_1 = require('angular2/core');
var http_1 = require("angular2/http");
require('rxjs/add/operator/map');
require('rxjs/operator/delay');
require('rxjs/operator/mergeMap');
require('rxjs/operator/switchMap');
var log_1 = require("../class/log");
var http_2 = require("angular2/http");
var http_3 = require("angular2/http");
var server_1 = require('../constants/server');
var delay = 0;
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        this.priorities = {
            '2': 'Low',
            '3': 'Normal',
            '4': 'High',
            '5': 'Critical',
        };
        this.types = {
            '2': 'Поддержка',
            '3': 'Услуга',
            '8': 'Задача',
        };
    }
    TaskService.prototype.getPriority = function (priority_id) {
        return this.priorities[priority_id] ? this.priorities[priority_id] : '';
    };
    TaskService.prototype.getTicketType = function (type_id) {
        return this.types[type_id] ? this.types[type_id] : '';
    };
    TaskService.prototype.getDate = function (date) {
        var dateObject = new Date(parseInt(date) * 1000);
        if (date && dateObject) {
            return dateObject;
        }
        return null;
    };
    /**
     * Return task list without delay.
     * @returns {Promise<Task[]>}
     */
    TaskService.prototype.getTaskList = function () {
        var _this = this;
        return this.http.get(server_1.serverPath + "/?op=getAssignedTaskList")
            .map(function (response) {
            var parsed = response.json();
            if (parsed.status == 'ok') {
                var taskList = parsed.message;
                var newTaskList = [];
                for (var i in taskList) {
                    newTaskList.push(_this.formatTask(taskList[i]));
                }
                return {
                    status: 'ok',
                    message: newTaskList
                };
            }
            return parsed;
        });
    };
    TaskService.prototype.formatTask = function (task) {
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
        if (!task.user_name) {
            task.user_name = task.user_id + '';
        }
        return task;
    };
    TaskService.prototype.formatTaskName = function (task) {
        return task.type + " #" + task.id + ": " + task.title;
    };
    TaskService.prototype.formatPerms = function (perms) {
        if (perms === void 0) { perms = []; }
        return {
            view: perms.indexOf('view') >= 0,
            close: perms.indexOf('close') >= 0,
            log: perms.indexOf('log') >= 0,
            edit: perms.indexOf('edit') >= 0,
            reject: perms.indexOf('reject') >= 0,
            assign: perms.indexOf('assign') >= 0
        };
    };
    TaskService.prototype.getLogs = function (logs) {
        if (logs && logs[0] && Array.isArray(logs[0])) {
            logs = logs[0];
        }
        var logList = [];
        var lastDate = '';
        for (var i = 0, l = logs.length; i < l; i++) {
            // Create group.
            var date = logs[i].created;
            if (date != lastDate) {
                lastDate = date;
                var log_2 = new log_1.Log();
                log_2.type = 'TIMELINE';
                log_2.time = this.getDate(lastDate);
                log_2.color = 'red';
                logList.push(log_2);
            }
            var log_3 = new log_1.Log();
            log_3.id = logs[i].lid;
            log_3.type = logs[i].action;
            log_3.task = logs[i].ticket_id;
            log_3.hours = logs[i].hours;
            log_3.user = logs[i].user_name || logs[i].user_id;
            log_3.time = this.getDate(logs[i].created);
            log_3.description = logs[i].entry;
            // Set icon and color for timeline.
            switch (log_3.type) {
                case 'Question':
                    logs[i].icon = 'question';
                    logs[i].color = 'green';
                    break;
                case 'Message':
                    log_3.icon = 'envelope';
                    log_3.color = 'blue';
                    break;
                case 'Note':
                    log_3.icon = 'comment-o';
                    log_3.color = 'blue';
                    break;
                case 'ASSIGNED':
                    log_3.icon = 'user-plus';
                    log_3.color = 'yellow';
                    break;
                case 'CREATED':
                    log_3.icon = 'plus';
                    log_3.color = 'yellow';
                    break;
                case 'CLOSE':
                    log_3.icon = 'close';
                    log_3.color = 'red';
                    break;
                case 'EDIT':
                    log_3.icon = 'pencil';
                    log_3.color = 'green';
                    break;
                case 'REJECTED':
                    log_3.icon = 'level-up';
                    log_3.color = 'red';
                    break;
                case null:
                    log_3.icon = 'envelope';
                    log_3.color = 'blue';
                    break;
            }
            logList.push(log_3);
        }
        return logList;
    };
    /**
     * Return task detail with log list.
     * @param id
     * @returns {any}
     */
    TaskService.prototype.getTaskDetail = function (id) {
        var _this = this;
        return this.http.get('${serverPath}/?op=getTaskInfo&tid=' + id)
            .map(function (response) {
            var parsed = response.json();
            if (parsed.status = 'ok') {
                var taskInfo = parsed.message;
                var result = {
                    status: 'ok',
                    logs: _this.getLogs(taskInfo.logs),
                    task: _this.formatTask(taskInfo.task_info),
                    task_name: '',
                    perms: _this.formatPerms(taskInfo.perms)
                };
                result.task_name = _this.formatTaskName(result.task);
                return result;
            }
            return parsed;
        });
    };
    /**
     * Emulate delay and return task detail with log list.
     * @param id
     * @returns {Promise<Task[]>|Promise}
     */
    TaskService.prototype.getTaskDetailSlow = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(function () { return resolve(_this.getTaskDetail(id)); }, delay);
        });
    };
    /**
     * Send addLog request to backend.
     * @param id
     * @param hours
     * @param text
     * @param log_action
     */
    TaskService.prototype.addLogToTask = function (id, hours, text, log_action) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var params = new http_3.URLSearchParams();
        params.set('tid', id);
        if (hours) {
            params.set('hours', hours);
        }
        else {
            params.set('hours', '0.0');
        }
        params.set('text', text);
        params.set('log_action', log_action);
        return this.http.post('/rest/?op=addLog', params.toString(), { headers: headers });
    };
    /**
     * Close request to backend.
     * @param id
     * @param hours
     * @param text
     */
    TaskService.prototype.closeTask = function (id, hours, text) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var params = new http_3.URLSearchParams();
        params.set('tid', id);
        if (hours) {
            params.set('hours', hours);
        }
        else {
            params.set('hours', '0.0');
        }
        params.set('text', text);
        return this.http.post('/rest/?op=closeTask', params.toString(), { headers: headers });
    };
    TaskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TaskService);
    return TaskService;
})();
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map
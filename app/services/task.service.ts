/**
 * Define Task service.
 */
import {Injectable} from 'angular2/core';
import {Task} from "../class/task";
import {TASK_LIST} from "./mock-task-list";
import {LOG_LIST} from "./mock-task-list";

let delay = 0;

@Injectable()
export class TaskService {
    /**
     * Return task list without delay.
     * @returns {Promise<Task[]>}
     */
    getTaskList(): Promise<Task[]> {
        return Promise.resolve(TASK_LIST);
    }

    /**
     * Return task list with delay emulating.
     * @returns {Promise<Task[]>|Promise}
     */
    getTaskListSlowly(): Promise<Task[]> {
        return new Promise<Task[]>(resolve =>
            setTimeout(()=>resolve(TASK_LIST), delay)
        );
    }

    /**
     * Return task detail with log list.
     * @param id
     * @returns {any}
     */
    getTaskDetail(id: number):any {
        let task: Task = TASK_LIST.find(obj => obj.id == id);
        if (task) {
            return Promise.resolve({
                task: task,
                logs: LOG_LIST
            });
        }

        return Promise.reject({});
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
}

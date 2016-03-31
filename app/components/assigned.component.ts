import { Component, OnInit } from 'angular2/core';
import { Task } from '../class/task';
import { TaskService } from '../services/task.service';
import {Router} from "angular2/router";
import {TaskListComponent} from "./task-list.component";


export class AssignedComponent extends TaskListComponent  implements OnInit{
    constructor(_router: Router, _taskListService: TaskService) {
        super(_router, _taskListService);
    }

    /**
     * Method implementation.
     * On init component send request for get assigned task list.
     */
    ngOnInit() {
        this._taskListService.getTaskListSlowly()
            .then(taskList => this.taskList = taskList);
    }
}

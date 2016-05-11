import { Component, OnInit } from 'angular2/core';
import { Task } from '../class/task';
import { TaskService } from '../services/task.service';
import {Router} from "angular2/router";
import {TaskListComponent} from "./task-list.component";


export class AssignedComponent extends TaskListComponent{
    constructor(router: Router, taskListService: TaskService) {
        super(router, taskListService);
        taskListService.getTaskList()
            .subscribe(
                response => {
                    if (response.status == 'ok') {
                        this.taskList = response.message;
                        this.error = null;
                    }
                    else {
                        this.taskList = [];
                        this.error = response.message;
                    }
                },
                error => {
                    this.error = error;
                    console.error('Error: ' + error)
                },
                () => console.log('Completed!')
            );
    }
}

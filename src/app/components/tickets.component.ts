import { Component, OnInit } from 'angular2/core';
import { Task } from '../class/task';
import { TaskService } from '../services/task.service';
import {Router} from "angular2/router";
import {TaskListComponent} from "./task-list.component";
import {TaskListFilterPipe} from "../pipes/filter-task-list.pipe";
import {TaskListSorterPipe} from "../pipes/sort-table.pipe";
import {Title} from 'angular2/platform/browser';


@Component({
  selector: 'tickets',
  template: require('../templates/task-list.tpl'),
  styles:[],
  providers: [Title],
  pipes: [TaskListFilterPipe, TaskListSorterPipe]
})
export class TicketsComponent extends TaskListComponent {
    filters = [
        {
            title: 'User',
            model: 'selectedUser',
            options: [
                {title: 'user1', value: 1},
                {title: 'Mospan, Nadezhda', value: 23},
                {title: 'Денис Моисеев', value: 62},
                {title: 'Дарья Войтова', value: 70},
                {title: 'Икищели, Михаил', value: 87},
                {title: 'Куликова, Екатерина', value: 86},
                {title: 'Михолапов, Валерий', value: 91},
                {title: 'Осецкий, Алексей', value: 93},
                {title: 'Рамазан, Кирилл', value: 88},
                {title: 'Саенко, Илья', value: 85},
                {title: 'Смирнова, Маргарита', value: 89},
                {title: 'Трофимов, Денис', value: 90},
            ]
        },
        {
            title: 'Status',
            model: 'selectedLongStatus',
            options: [
                {value: 'TASK_STATUS_OPEN', title: 'Open'},
                {value: 'TASK_STATUS_CLOSED', title: 'Closed'}
            ]
        },
        {
            title: 'Type',
            model: 'selectedType',
            options: [
                {value: 'null', title: 'All'},
                {value: 2, title: 'Поддержка'},
                {value: 7, title: 'Услуга'},
                {value: 8, title: 'Задача'},
                {value: 11, title: 'Продвижение'}
            ]
        }
    ];

    user = null;
    project = null;
    status = null;

    constructor(router: Router, taskListService: TaskService, title:Title) {
        super(router, taskListService);

        title.setTitle('Tickets');
        this.query.selectedStatus = 'null';
        this.query.selectedLongStatus = sessionStorage.getItem('ticketsSelectedStatus') || 'TASK_STATUS_OPEN';
        this.user = this.query.selectedUser = sessionStorage.getItem('ticketsSelectedUser') || 1;
        this.query.selectedType = sessionStorage.getItem('ticketsSelectedType') || 'null';
        this.updateData(false, false);
    }
    updateData(type, value) {
        if (type && type == 'selectedUser') {
            this.user = value;
            sessionStorage.setItem('ticketsSelectedUser', value);
        }
        else if (type && type == 'selectedProject') {
            this.project = value;
        }
        else if (type && type == 'selectedLongStatus') {
            this.status = value;
            sessionStorage.setItem('ticketsSelectedStatus', value);
        }
        else if (type && type == 'selectedType') {
            sessionStorage.setItem('ticketsSelectedType', value);
            return;
        }
        else if (type) {
            return;
        }

        this.fetching = true;

        this._taskListService.getFilteredTaskList(this.user, this.status, this.project)
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

                    this.fetching = false;
                },
                error => {
                    this.error = error;
                    console.error('Error: ' + error)
                },
                () => console.log('Completed!')
            );
    }
}

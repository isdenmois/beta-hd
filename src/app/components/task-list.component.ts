import {Component, OnInit} from 'angular2/core';
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Router} from 'angular2/router';
import {TaskListFilterPipe} from "../pipes/filter-task-list.pipe";
import {TaskListSorterPipe} from "../pipes/sort-table.pipe";

@Component({
    selector: 'task-list',
    template: require('../templates/task-list.tpl'),
    styles:[],
    pipes: [TaskListFilterPipe, TaskListSorterPipe]
})

export class TaskListComponent {
    taskList: Task[] = [];
    fetching = true;
    query = {
        selectedStatus: 'OPEN',
        selectedProject: null,
        selectedType: null,
        selectedUser: 1,
        selectedLongStatus: 'TASK_STATUS_OPEN'
    };
    columns = [
        {descr: 'ID',       name: 'id',       className: 'sorting'},
        {descr: 'Project',  name: 'project_title',  className: 'sorting hidden-xs'},
        {descr: 'Summary',  name: 'title',  className: 'sorting hidden-xs'},
        {descr: 'Status',   name: 'status',   className: 'sorting'},
        {descr: 'Priority', name: 'priority', className: 'sorting hidden-xs'},
        {descr: 'Type',     name: 'type',     className: 'sorting hidden-xs'},
        {descr: 'Deadline', name: 'deadline', className: 'sorting'}
    ];
    sorting = {
        col: '',
        dir: 1
    };
    error = null;

    constructor(
        protected _router: Router,
        protected _taskListService: TaskService) {
    }

    /**
     * Event handler.
     * Navigate to task detail page.
     * @param id
     */
    gotoDetail(id) {
        this._router.navigate(['TaskDetail', { id: id }]);
    }

    /**
     * Sort task list with selected column.
     * @param name
     */
    sort(name: string) {
        let column = this.columns.find(col => col.name == name);

        if (column) {
            let direction = 'sorting_asc';

            if (column.name == this.sorting.col && this.sorting.dir == -1) {
                this.sorting.dir = 1;
            }
            else if (column.name == this.sorting.col) {
                this.sorting.dir = -1;
                direction = 'sorting_desc';
            }
            else {
                this.sorting.col = column.name;
                this.sorting.dir = 1;
            }

            this.columns.map(col => col.className = 'sorting');
            column.className = direction;
        }
    }
}

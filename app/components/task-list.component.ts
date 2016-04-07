import {Component, OnInit} from 'angular2/core';
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Router} from 'angular2/router';

@Component({
    selector: 'task-list',
    templateUrl: 'app/templates/task-list.tpl',
    styles:[]
})

export class TaskListComponent {
    taskList: Task[] = [];
    columns = [
        {descr: 'ID',       name: 'id',       className: 'sorting'},
        {descr: 'Project',  name: 'project_title',  className: 'sorting'},
        {descr: 'Summary',  name: 'title',  className: 'sorting'},
        {descr: 'Status',   name: 'status',   className: 'sorting'},
        {descr: 'Priority', name: 'priority', className: 'sorting'},
        {descr: 'Type',     name: 'type',     className: 'sorting'},
        {descr: 'Deadline', name: 'deadline', className: 'sorting'}
    ];
    sorting = {
        col: '',
        dir: 1
    };

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
        let self = this;

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

            this.taskList.sort((t1, t2) => {
                if (t1[name] > t2[name]) {
                    return self.sorting.dir;
                }

                if (t1[name] < t2[name]) {
                    return -1 * self.sorting.dir;
                }

                return 0;
            });
        }
    }
}
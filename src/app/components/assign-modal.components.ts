import {Component, OnInit} from 'angular2/core';
import {Task} from '../class/task';
import {TaskService} from '../services/task.service';
import {Router} from 'angular2/router';
import {ElementRef} from "angular2/core";
import {Input} from "angular2/core";
import {ViewChild} from "angular2/core";
import {Output, EventEmitter} from "angular2/core";
import {LogModalComponent} from "./log-modal.component";

@Component({
    selector: 'assign-modal',
    template: require('../templates/assign.tpl'),
    inputs: ['show', 'task_name', 'task_id'],
    outputs: ['onUpdate', 'onClose']
})

export class AssignModalComponent extends LogModalComponent {

    constructor(
        protected _taskService: TaskService, elementRef: ElementRef) {
        super(_taskService, elementRef);
    }

    logAdd() {
        this.updateTask();
        this.closeModal();
    }

}

import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { AssignedComponent } from "./assigned.component";
import { TaskService } from '../services/task.service';
import { TaskDetailComponent } from "./task-detail.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.tpl',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        TaskService
    ]
})
@RouteConfig([
    {
        path: '/assigned',
        name: 'Assigned',
        component: AssignedComponent,
        useAsDefault: true
    },
    {
        path: '/task/:id',
        name: 'TaskDetail',
        component: TaskDetailComponent
    }
])
export class AppComponent {
    title = 'Task list';
}

import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { AssignedComponent } from "./assigned.component";
import { TaskService } from '../services/task.service';
import { TaskDetailComponent } from "./task-detail.component";
import {HTTP_PROVIDERS} from "angular2/http";
import {AppService} from "../services/app.service";

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.tpl',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        TaskService,
        AppService
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
    },
    {
        path: '/**',
        redirectTo: ['Assigned']
    }
])
export class AppComponent {
    title = 'Task list';
    username = '';
    email = '';
    job = '';

    getTeamById(team_id) {
        let teams = {
            '3': 'web-разработчик'
        };

        return teams[team_id] ? teams[team_id] : team_id;
    }

    constructor(appService: AppService) {
        appService.getAuthDetail()
            .subscribe(
                response => {
                    let user_info = response.json().user_info;
                    this.email = user_info.email;
                    this.username = `${user_info.fname} ${user_info.lname}`;
                    this.job = this.getTeamById(user_info.team_id);
                },
                error => console.error('Error: ' + error),
                () => console.log('Completed!')
            );
    }
}

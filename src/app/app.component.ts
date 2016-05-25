import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { AssignedComponent } from "./components/assigned.component";
import { TaskService } from './services/task.service';
import { TaskDetailComponent } from "./components/task-detail.component";
import {HTTP_PROVIDERS} from "angular2/http";
import {AppService} from "./services/app.service";
import {AppState} from "./app.service";

@Component({
    selector: 'app',
    template: require('./templates/app.tpl'),
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
export class App {
    title = 'Task list';
    username = '';
    email = '';
    job = '';
    hoursToday = '';
    hoursMonth = '';
    ticketsMonth = '';

    getTeamById(team_id) {
        let teams = {
            '3': 'web-разработчик'
        };

        return teams[team_id] ? teams[team_id] : team_id;
    }

    getTitleFor(url) {
        console.log('url');
        return this.title;
    }

    constructor(public appState: AppState) {
    }

    ngOnInit() {
      console.log('Initial App State', this.appState.state);
    }
}
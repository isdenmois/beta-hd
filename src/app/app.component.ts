import { Component } from 'angular2/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { AssignedComponent } from "./components/assigned.component";
import { TaskService } from './services/task.service';
import { TaskDetailComponent } from "./components/task-detail.component";
import {HTTP_PROVIDERS} from "angular2/http";
import {AppService} from "./services/app.service";
import {AppState} from "./app.service";
import {TicketsComponent} from "./components/tickets.component";
import {TaskCreateModalComponent} from "./components/task-create.component";

@Component({
    selector: 'app',
    template: require('./templates/app.tpl'),
    directives: [
        ROUTER_DIRECTIVES,
        TaskCreateModalComponent
    ],
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
        path: '/tickets',
        name: 'Tickets',
        component: TicketsComponent
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
    modals = {
        ticket: false
    };
    error = '';
    projectList = [];
    userList = [];

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

    constructor(public appState: AppState, private router: Router, private _AppService: AppService) {
        this.router.subscribe(val => {
            switch (val) {
                case 'assigned':
                    this.title = 'Assigned tickets';
                    break;

                case 'tickets':
                    this.title = 'Ticket list';
                    break;
                default:
                    this.title = '';
            }
        });

        _AppService
            .getProjectList()
            .subscribe(
                projectList => this.projectList = projectList,
                error => {this.error = error; console.log('error', error)}
            )

        _AppService
            .getUserList()
            .subscribe(
                userList => this.userList = userList,
                error => {this.error = error; console.log('error', error)}
            )
    }

    ngOnInit() {
        const headerHeight = (<HTMLScriptElement>document.querySelector('header')).offsetHeight;
        (<HTMLScriptElement>document.querySelector('.content-wrapper')).style.minHeight = (window.innerHeight - headerHeight) + 'px';
    }

    /**
     * Open modal with selected type.
     * @param type
     */
    openModal(type) {
        this.modals[type] = true;
    }

    /**
     * Close modal with selected type.
     * @param type
     */
    closeModal(type) {
        this.modals[type] = false;
    }
}

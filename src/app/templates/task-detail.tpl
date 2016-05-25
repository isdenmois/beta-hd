<div class="row">
    <span *ngIf="task == null && error == null"><i class="fa fa-circle-o-notch fa-spin"></i> Loading</span>
    <div *ngIf="error != null" class="alert alert-danger">
        <div class="">
            <h4><i class="icon fa fa-ban"></i> Возникла ошибка!</h4>
            {{error}}
        </div>
    </div>
    <div class="col-md-12">
        <div *ngIf="task" class="box box-widget widget-user">
            <div class="widget-user-header bg-aqua-active">
                <h3 class="widget-user-username">#{{task.id}} {{task.title}}</h3>
            </div>

            <!-- Modals -->
            <log-modal
                    *ngIf="perms.log"
                    [show]="log_show"
                    [task_name]="task_name"
                    [task_id]="task.id"
                    (onClose)="logOnClose()"
                    (onUpdate)="updateTask()"
            ></log-modal>
            <close-modal
                    *ngIf="perms.close"
                    [show]="close_modal_show"
                    [task_name]="task_name"
                    [task_id]="task.id"
                    (onClose)="onCloseModalClose()"
                    (onUpdate)="updateTask()"
            ></close-modal>

            <div class="box-footer">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">Status</h5>
                            <span class="description-text">{{task.status}}</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">Estimated hours</h5>
                            <span class="description-text">{{task.est_hours}}</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">Open Time</h5>
                            <span class="description-text">{{task.otime}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">Owner</h5>
                            <span class="description-text">{{task.user_name}}</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">Worked hours</h5>
                            <span class="description-text">{{task.wkd_hours}}</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">Deadline</h5>
                            <span class="description-text">{{task.deadline}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <hr>
                        <div [innerHTML]="task.description | nl2br"></div>
                    </div>
                </div>
            </div>
            <div class="box-footer">
                <a *ngIf="perms.log" class="btn btn-primary" (click)="onLogOpen()">Log</a>
                <a *ngIf="perms.assign" class="btn btn-primary" href="/actions/assign.php?id={{task.id}}&setmode=ticket_tab_1">Assign</a>
                <a *ngIf="perms.edit" class="btn btn-primary" href="/actions/edit.php?id={{task.id}}&setmode=ticket_tab_1">Edit</a>
                <a *ngIf="perms.reject" class="btn btn-primary" href="/actions/reject.php?id={{task.id}}&setmode=ticket_tab_1">Reject</a>
                <a *ngIf="perms.close" class="btn btn-danger" (click)="onCloseModalOpen()">Close</a>
            </div>
        </div>

        <div *ngIf="logs.length" class="row">
            <div class="col-sm-12">
                <ul class="timeline">

                    <!-- timeline time label -->
                    <li *ngFor="#log of logs" [class.time-label]="log.type == 'TIMELINE'">
                        <span class="bg-red" *ngIf="log.type == 'TIMELINE'">
                            {{log.time}}
                        </span>
                        <!-- timeline icon -->
                        <i class="{{log.icon ? 'fa fa-' + log.icon : ''}} bg-{{log.color}}" *ngIf="log.type != 'TIMELINE'"></i>
                        <div class="timeline-item" *ngIf="log.type != 'TIMELINE'">
                            <span class="time"><i class="fa fa-calendar-o"></i> {{log.time}}</span>
                            <span class="time" *ngIf="log.hours"><i class="fa fa-clock-o"></i> {{log.hours}} hours</span>

                            <h3 class="timeline-header"><a>{{log.user}}</a></h3>

                            <div class="timeline-body" [innerHTML]="log.description | nl2br"></div>
                            <div class="timeline-footer">
                                <a class="btn btn-primary btn-xs" *ngIf="log.canEdit">Edit</a>
                                <a class="btn btn-danger btn-xs" *ngIf="log.canDelete">Delete</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</div>

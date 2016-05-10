<div class="row">
    <span *ngIf="task == null"><i class="fa fa-circle-o-notch fa-spin"></i> Loading</span>
    <span *ngIf="error != null" class="error-message">Возникла ошибка: {{error}}</span>
    <div class="col-md-12">
        <div *ngIf="task" class="box box-widget widget-user">
            <div class="widget-user-header bg-aqua-active">
                <h3 class="widget-user-username">#{{task.id}}</h3>
                <h3 class="widget-user-desc">{{task.title}}</h3>
            </div>

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
                            <h5 class="description-header">Worked hours</h5>
                            <span class="description-text">{{task.wkd_hours}}</span>
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
                            <h5 class="description-header">Open Time</h5>
                            <span class="description-text">{{task.otime}}</span>
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
                <a class="btn btn-primary" data-toggle="modal" data-target="#log-modal">Log</a>
                <a class="btn btn-primary" href="/actions/assign.php?id={{task.id}}&setmode=ticket_tab_1">Assign</a>
                <a class="btn btn-primary" href="/actions/edit.php?id={{task.id}}&setmode=ticket_tab_1">Edit</a>
                <a class="btn btn-primary" href="/actions/reject.php?id={{task.id}}&setmode=ticket_tab_1">Reject</a>
                <a class="btn btn-danger" href="/actions/close.php?id={{task.id}}&setmode=ticket_tab_1">Close</a>
                <a class="btn btn-default" href="/ticket.php?id={{task.id}}">Вернуться на старую версию</a>
            </div>
            <!-- Modals -->
            <div class="modal fade" id="log-modal" tabindex="-1" role="dialog" aria-labelledby="logModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="logModalLabel">{{task.type}} #{{task.id}}: {{task.title}}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="error-message" *ngIf="log_error != null">
                                Возникла ошибка: {{log_error}}
                            </div>
                            <form name="logForm" method="post" action="/actions/log.php">
                                <input type="hidden" name="id" value="{{task.id}}">
                                <input type="hidden" name="actionComplete" value="1">
                                <input type="hidden" name="setmode" value="ticket_tab_1">

                                <div class="form-group">
                                    <label>Select an Activity</label>
                                    <select class="form-control" name="log_action" [(ngModel)]="log_action">
                                        <option value="Note">Note</option>
                                        <option value="Question">Question</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Enter Hours Worked</label>
                                    <input class="form-control" type="text" name="hours" [(ngModel)]="hours">
                                    <span class="help-block">Enter Hours Worked (accepts up to 2 decimal places). For example, enter "0.1" to log 5-6 minutes, "0.25" to log 15 minutes, "1" to log an hour.</span>
                                </div>
                                <div class="form-group">
                                    <label>Log Entry</label>
                                    <textarea class="form-control" name="comments" rows="10" [(ngModel)]="text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" (click)="logAdd()">Log</button>
                        </div>
                    </div>
                </div>
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

                            <h3 class="timeline-header"><a href="#">{{log.user}}</a></h3>

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
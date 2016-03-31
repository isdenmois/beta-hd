<div class="row">
    <span *ngIf="task == null"><i class="fa fa-circle-o-notch fa-spin"></i> Loading</span>
    <div class="col-md-12">
        <div *ngIf="task" class="box box-widget widget-user">
            <div class="widget-user-header bg-aqua-active">
                <h3 class="widget-user-username">#{{task.id}}</h3>
                <h3 class="widget-user-desc">{{task.summary}}</h3>
            </div>

            <div class="box-footer">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">{{task.status}}</h5>
                            <span class="description-text">Status</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">{{task.estimated}}</h5>
                            <span class="description-text">Estimated hours</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header text-green">{{task.worked}}</h5>
                            <span class="description-text">Worked hours</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">{{task.owner}}</h5>
                            <span class="description-text">Owner</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">{{task.opentime}}</h5>
                            <span class="description-text">Open Time</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header text-red">{{task.deadline}}</h5>
                            <span class="description-text">Deadline</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <hr>
                        <div [innerHTML]="task.details | nl2br"></div>
                    </div>
                </div>
            </div>
            <div class="box-footer">
                <a class="btn btn-primary">Log</a>
                <a class="btn btn-primary">Assign</a>
                <a class="btn btn-primary">Edit</a>
                <a class="btn btn-danger">Close</a>
                <a class="btn btn-default" href="/ticket.php?id={{task.id}}">Вернуться на старую версию</a>
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
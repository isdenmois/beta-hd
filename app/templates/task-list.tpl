<div class="box">
    <div class="alert alert-danger" *ngIf="error != null">
        <div class="">
            <h4><i class="icon fa fa-ban"></i> Возникла ошибка!</h4>
            {{error}}
        </div>
    </div>
    <div class="box box-primary">
        <div class="box-body">
            <div class="form-group col-xs-12 col-md-6 col-lg-3">
                <label>Status</label>
                <select class="form-control" [(ngModel)]="query.selectedStatus">
                    <option value="null">All</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </select>
            </div>
            <div class="form-group col-xs-12 col-md-6 col-lg-3">
                <label>Project</label>
                <select class="form-control">
                    <option>dolevoe.net.ru</option>
                    <option>Обучение 2014</option>
                    <option>podgolovnik.ru</option>
                </select>
            </div>
            <div class="form-group col-xs-12 col-md-6 col-lg-3">
                <label>Type</label>
                <select class="form-control" [(ngModel)]="query.selectedType">
                    <option value="null">All</option>
                    <option value="2">Поддержка</option>
                    <option value="3">Услуга</option>
                    <option value="8">Задача</option>
                </select>
            </div>
        </div>
    </div>
    <div class="box-body table-responsive" [ngSwitch]="taskList.length > 0">
        <table class="table table-bordered table-hover dataTable" *ngSwitchWhen="true">
            <thead>
                <tr role="row">
                    <th *ngFor="#col of columns" class="{{col.className}}" (click)="sort(col.name)">
                        {{col.descr}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr  class="{{task.color}} color-palette clickable" role="row" *ngFor="#task of taskList | taskfilter: [query.selectedStatus, query.selectedType]" (click)="gotoDetail(task.id)">
                    <td class="{{col.className}}" *ngFor="#col of columns">{{task[col.name]}}</td>
                </tr>
            </tbody>
            <tfoot>
            </tfoot>
        </table>
        <span *ngSwitchDefault><i class="fa fa-circle-o-notch fa-spin"></i> Loading</span>
    </div>
</div>
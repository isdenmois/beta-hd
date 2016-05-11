<div class="box">
    <div class="alert alert-danger" *ngIf="error != null">
        <div class="">
            <h4><i class="icon fa fa-ban"></i> Возникла ошибка!</h4>
            {{error}}
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
                <tr  class="{{task.color}} color-palette clickable" role="row" *ngFor="#task of taskList" (click)="gotoDetail(task.id)">
                    <td class="{{col.className}}" *ngFor="#col of columns">{{task[col.name]}}</td>
                </tr>
            </tbody>
            <tfoot>
            </tfoot>
        </table>
        <span *ngSwitchDefault><i class="fa fa-circle-o-notch fa-spin"></i> Loading</span>
    </div>
</div>
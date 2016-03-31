<div class="box">
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
                <tr class="clickable" role="row" *ngFor="#task of taskList" (click)="gotoDetail(task.id)">
                    <td *ngFor="#col of columns">{{task[col.name]}}</td>
                </tr>
            </tbody>
            <tfoot>
                <a class="btn btn-default" href="/assignedTickets.php">Вернуться на старую версию</a>
            </tfoot>
        </table>
        <span *ngSwitchDefault><i class="fa fa-circle-o-notch fa-spin"></i> Loading</span>
    </div>
</div>
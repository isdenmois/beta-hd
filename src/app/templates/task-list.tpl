<div class="box">
    <div class="alert alert-danger" *ngIf="error != null">
        <div class="">
            <h4><i class="icon fa fa-ban"></i> Возникла ошибка!</h4>
            {{error}}
        </div>
    </div>
    <div class="box box-primary">
        <div class="box-body">
            <div class="form-group col-xs-12 col-md-6 col-lg-3" *ngFor="let filter of filters">
                <label>{{filter.title}}</label>
                <select class="form-control" [(ngModel)]="query[filter.model]" (change)="updateData(filter.model, $event.target.value)" >
                    <option value="{{option.value}}" *ngFor="let option of filter.options">{{option.title}}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="box-body table-responsive">
        <table class="table table-bordered table-hover dataTable" *ngIf="taskList.length > 0 && fetching == false">
            <thead>
                <tr role="row">
                    <th *ngFor="let col of columns" class="{{col.className}}" (click)="sort(col.name)">
                        {{col.descr}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr  class="{{task.color}} color-palette clickable" role="row" *ngFor="let task of taskList | taskfilter: [query.selectedStatus, query.selectedType] | tasksort: [sorting.col, sorting.dir]" (click)="gotoDetail(task.id)">
                    <td class="{{col.className}}" *ngFor="let col of columns">{{task[col.name]}}</td>
                </tr>
            </tbody>
            <tfoot>
            </tfoot>
        </table>
        <span *ngIf="taskList.length == 0 || fetching == true"><i class="fa fa-circle-o-notch fa-spin"></i> Loading</span>
    </div>
</div>

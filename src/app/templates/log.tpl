<div class="modal-dialog" role="document" [class.loading]="fetching">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="logModalLabel">{{task_name}}</h4>
        </div>
        <div class="modal-body">
            <div class="alert alert-danger" *ngIf="error != null">
                <div class="">
                    <h4><i class="icon fa fa-ban"></i> Возникла ошибка!</h4>
                    {{error}}
                </div>
            </div>
            <form name="logForm" method="post" action="/actions/log.php">
                <div class="{{hours_valid ? '' : 'has-error '}}form-group">
                    <label>Enter Hours Worked</label>
                    <input class="form-control" type="text" name="hours" [(ngModel)]="hours">
                    <span class="help-block">Enter Hours Worked (accepts up to 2 decimal places). For example, enter "0.1" to log 5-6 minutes, "0.25" to log 15 minutes, "1" to log an hour.</span>
                </div>
                <div class="{{text_valid ? '' : 'has-error '}}form-group">
                    <label>Log Entry</label>
                    <textarea class="form-control" name="comments" rows="10" [(ngModel)]="text"></textarea>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Hide dialog</button>
            <button type="button" class="btn btn-primary" (click)="logAdd()">Log</button>
        </div>
    </div>
</div>
<span class="modal-loader" [class.loading]="fetching"><span class="modal-loader-content"> <i class="fa fa-circle-o-notch fa-spin"></i> Отправка</span></span>

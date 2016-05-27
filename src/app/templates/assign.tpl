<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="logModalLabel">Assign ticket: {{task_name}}</h4>
        </div>
        <div class="modal-body">
            <div class="alert alert-danger" *ngIf="error != null">
                <div class="">
                    <h4><i class="icon fa fa-ban"></i> Возникла ошибка!</h4>
                    {{error}}
                </div>
            </div>
            <form name="logForm" method="post">
                <div class="{{text_valid ? '' : 'has-error '}}form-group">
                    <label>Comments or Instructions</label>
                    <textarea class="form-control" name="comments" rows="10" [(ngModel)]="text"></textarea>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Hide dialog</button>
            <button type="button" class="btn btn-primary" (click)="logAdd()">Assign ticket</button>
        </div>
    </div>
</div>

import {Pipe, PipeTransform} from "angular2/core";

/**
 * Filter task list with selected.
 */
@Pipe({name: 'taskfilter'})
export class TaskListFilterPipe implements PipeTransform {
    transform(value, args) {
        console.log(args);
        let [ selectedStatus, selectedType ] = args;
        selectedStatus = selectedStatus == "null" ? null : selectedStatus;
        selectedType = selectedType == "null" ? null : +selectedType;
        return value.filter(item => {
            if (selectedStatus && item.status != selectedStatus) {
                return false;
            }
            if (selectedType && item.type_id != selectedType) {
                return false;
            }

            return true;
        });
    }
}

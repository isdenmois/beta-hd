import {Pipe, PipeTransform} from "angular2/core";

/**
 * Filter task list with selected.
 */
@Pipe({name: 'tasksort'})
export class TaskListSorterPipe implements PipeTransform {
  transform(collection, args) {
    const [column, direction] = args;
    if (column == '') {
      return collection;
    }

    collection.sort((t1, t2) => {
      if (t1[column] > t2[column]) {
        return direction;
      }

      if (t1[column] < t2[column]) {
        return -1 * direction;
      }

      return 0;
    });

    return collection;
  }
}

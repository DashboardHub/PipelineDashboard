import { Injectable } from '@angular/core';

/**
 * Sorting service
 */
@Injectable({
  providedIn: 'root',
})
export class SortingService {
  /**
   * This function is used for sorting the list by date field
   */
  sortList(list: any, field: any): void {
    list.sort((obj1: any, obj2: any) => {
      const date1: Date = new Date(obj1[field]);
      const date2: Date = new Date(obj2[field]);
      return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
    });
  }
}

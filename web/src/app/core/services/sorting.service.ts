// Core modules
import { Injectable } from '@angular/core';

/**
 * Sorting service
 */
@Injectable({
  providedIn: 'root',
})
export class SortingService {
  /**
   * Sort the list by date field
   */
  sortListByDate<T>(list: T[], field: string): void {
    list.sort((obj1: any, obj2: any) => {
      const date1: Date = new Date(obj1[field]);
      const date2: Date = new Date(obj2[field]);

      return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
    });
  }

  /**
   * Sort the list by any key
   */
  sortListByNumber<T>(list: T[], field: string): void {
    list.sort((obj1: any, obj2: any) => {
      return obj2[field] - obj1[field];
    });
  }
}

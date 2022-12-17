import { Injectable } from '@angular/core';
import { delay, map, mergeAll, mergeMap, Observable, of, toArray } from 'rxjs';

type department = { id: number, name?: string };
const departmentMapper = (id: number) => {
  return 'Department_' + id;
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() {
  }

  findAllDepartmentIds(): Observable<number[]> {
    return of([1, 2, 3]
    ).pipe(delay(3000));
  }

  findNameById(id: number): Observable<string> {
    return of(departmentMapper(id)).pipe(delay(2000));
  }

  findDepartmentsWithNames() {
    return this.findAllDepartmentIds().pipe(
      mergeAll(), // converts a higher-order Observable into single observables. In this case it takes the array of all department ids and re-emits them one by one
      mergeMap(id => this.findNameById(id).pipe(
          map(name => {
            return {
              id: id,
              name: name
            };
          })
        ) // emits departments updated with their name
      ),
      toArray() // take all the data emitted by the single observables and put them back into a single array
    );
  }
}

import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export type department = { departmentName?: string, personInChargeName?: string, branchName?: string };

export type departmentReference = department & { departmentId: number, personInChargeId: number, branchId: number };

const departmentMapper = (id: number) => {
  return 'Department_' + id;
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly findNameById: (id: number) => Observable<string>;

  readonly findAllDepartments: () => Observable<departmentReference[]>;

  constructor() {
    this.findNameById = (id: number) => of(departmentMapper(id))
      .pipe(delay(2000));

    this.findAllDepartments = () => of([
      {
        departmentId: 10,
        personInChargeId: 11,
        branchId: 12
      }, {
        departmentId: 20,
        personInChargeId: 21,
        branchId: 22
      }, {
        departmentId: 30,
        personInChargeId: 31,
        branchId: 32
      }
    ]).pipe(delay(3000));
  }
}

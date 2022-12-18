import { Injectable } from '@angular/core';
import { map, mergeAll, mergeMap, Observable, toArray } from 'rxjs';
import { department, DepartmentService } from './department.service';
import { PersonService } from './person.service';
import { BranchService } from './branch.service';

@Injectable({
  providedIn: 'root'
})
export class NestedObservableService {

  findDepartmentsWithNames: () => Observable<department[]>;

  constructor(private readonly departmentService: DepartmentService,
              private readonly personService: PersonService,
              private readonly branchService: BranchService) {

    this.findDepartmentsWithNames = () => {
      return this.departmentService.findAllDepartments().pipe(
        mergeAll(), // convert a higher-order Observable into single observables. In this case it takes the array of all department ids and re-emits them one by one
        mergeMap(departmentReference => this.departmentService.findNameById(departmentReference.departmentId).pipe(
            map(name => {
              return {
                ...departmentReference,
                departmentName: name
              };
            })
          ) // emits departments updated with the department name
        ), mergeMap(departmentReference => this.personService.findNameById(departmentReference.personInChargeId).pipe(
            map(name => {
              return {
                ...departmentReference,
                personInChargeName: name
              };
            })
          ) // emits departments updated with the name of the person in charge
        ), mergeMap(departmentReference => this.branchService.findNameById(departmentReference.branchId).pipe(
            map(name => {
              return {
                ...departmentReference,
                branchName: name
              } as department;
            })
          ) // emits departments updated with the branch name
        ),
        toArray() // take all the data emitted by the single observables and put them back into a single array
      );
    };
  }
}

import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NestedObservableService } from './nested-observable.service';
import { department, departmentReference, DepartmentService } from './department.service';
import { PersonService } from './person.service';
import { BranchService } from './branch.service';
import { delay, of } from 'rxjs';

describe('NestedObservableService', () => {

  let testSubject: NestedObservableService;

  beforeEach(() => {

    const departmentServiceMock = {
      findAllDepartments: () => of([{
        departmentId: 1,
        personInChargeId: 1,
        branchId: 1
      }] as departmentReference[]),
      findNameById: id => of(`Department (${id})`).pipe(delay(2000))
    } as DepartmentService;

    const personServiceMock = {
      findNameById: id => of(`Jerry, Man (${id})`).pipe(delay(1000))
    } as PersonService;

    const branchServiceMock = {
      findNameById: id => of(`Branch (${id})`).pipe(delay(3000))
    } as BranchService;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: DepartmentService,
          useValue: departmentServiceMock
        },
        {
          provide: PersonService,
          useValue: personServiceMock
        }, {
          provide: BranchService,
          useValue: branchServiceMock
        },
      ]
    });

    testSubject = TestBed.inject(NestedObservableService);
  });

  it('test with delay should contain all resolved names from ids', fakeAsync(() => {
      let expectedResult = [
        {
          'departmentId': 1,
          'personInChargeId': 1,
          'branchId': 1,
          'departmentName': 'Department (1)',
          'personInChargeName': 'Jerry, Man (1)',
          'branchName': 'Branch (1)'
        }];

      let received: department[] = [];

      testSubject.findDepartmentsWithNames().subscribe(
        {
          next: result => {
            received = result;
          }
        }
      );

      // After 5 seconds the observable should not be complete
      tick(5000);

      expect(received).not.toBeUndefined();
      expect(received).toHaveLength(0);
      expect(received).toStrictEqual([]);

      // After 6 seconds the observable should be complete
      tick(1000);

      expect(received).not.toBeUndefined();
      expect(received).toStrictEqual(expectedResult);
      expect(received).toHaveLength(1);
    })
  );

});

import { TestBed } from '@angular/core/testing';

import { NestedObservableService } from './nested-observable.service';
import { department, departmentReference, DepartmentService } from './department.service';
import { PersonService } from './person.service';
import { BranchService } from './branch.service';
import { of } from 'rxjs';

describe('NestedObservableService', () => {

  let testSubject: NestedObservableService;

  beforeEach(() => {

    const departmentServiceMock = {
      findAllDepartments: () => of([{
        departmentId: 1,
        personInChargeId: 1,
        branchId: 1
      }] as departmentReference[]),
      findNameById: id => of(`Department (${id})`)
    } as DepartmentService;

    const personServiceMock = {
      findNameById: id => of(`Jerry, Man (${id})`)
    } as PersonService;

    const branchServiceMock = {
      findNameById: id => of(`Branch (${id})`)
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

  it('should be created', () => {
    expect(testSubject).toBeTruthy();
  });

  it('test with no delay should contain all resolved names from ids', () => {
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

    // This assertion at the end only works because the observable is resolved immediately.
    // If I were to put a delay in one of the mocks we would have had a failing test
    expect(received).toStrictEqual(expectedResult);
  });

});

import { TestBed } from '@angular/core/testing';

import { NestedObservableService } from './nested-observable.service';
import { department, DepartmentService } from './department.service';
import { PersonService } from './person.service';
import { BranchService } from './branch.service';

describe('NestedObservableService', () => {

  let testSubject: NestedObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepartmentService,
        PersonService,
        BranchService
      ]
    });
    testSubject = TestBed.inject(NestedObservableService);
  });

  it('should be created', () => {
    expect(testSubject).toBeTruthy();
  });

  it('should contain the right info', (done) => {
    let expectedResult = [
      {
        'departmentId': 10,
        'personInChargeId': 11,
        'branchId': 12,
        'departmentName': 'Department_10',
        'personInChargeName': 'Dummy, John (11)',
        'branchName': 'Branch_12'
      },
      {
        'departmentId': 20,
        'personInChargeId': 21,
        'branchId': 22,
        'departmentName': 'Department_20',
        'personInChargeName': 'Dummy, John (21)',
        'branchName': 'Branch_22'
      },
      {
        'departmentId': 30,
        'personInChargeId': 31,
        'branchId': 32,
        'departmentName': 'Department_30',
        'personInChargeName': 'Dummy, John (31)',
        'branchName': 'Branch_32'
      }];

    let received: department[] = [];

    testSubject.findDepartmentsWithNames().subscribe(
      {
        next: result => {
          received = result;
          done();
        }
      }
    );

    expect(received).toStrictEqual(expectedResult);
  });

});

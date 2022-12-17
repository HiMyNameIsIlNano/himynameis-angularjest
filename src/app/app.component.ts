import { Component } from '@angular/core';
import { RandomTextService } from './init/random-text.service';
import { flatMap, map, mergeAll, mergeMap, Observable, toArray } from 'rxjs';
import { DepartmentService } from './nested-observables/department.service';
import { LoggerService } from './logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private titleText = 'Angular Jest Test Project';

  readonly observeTextGenerator: Observable<string>;

  constructor(private randomTextGenerator: RandomTextService,
              private departmentService: DepartmentService,
              private logger: LoggerService) {
    this.observeTextGenerator = this.randomTextGenerator.observeTextGenerator;

    this.departmentService.findDepartmentsWithNames()
      .subscribe(departmentsWithNames => this.logger.info('Departments: ', departmentsWithNames));
  }

  get title(): string {
    return this.titleText;
  }
}

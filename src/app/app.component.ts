import { Component } from '@angular/core';
import { RandomTextService } from './init/random-text.service';
import { Observable } from 'rxjs';
import { LoggerService } from './logger/logger.service';
import { NestedObservableService } from './nested-observables/nested-observable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private titleText = 'Angular Jest Test Project';

  readonly observeTextGenerator: Observable<string>;

  constructor(private randomTextGenerator: RandomTextService,
              private departmentService: NestedObservableService,
              private logger: LoggerService) {
    this.observeTextGenerator = this.randomTextGenerator.observeTextGenerator;

    this.departmentService.findDepartmentsWithNames()
      .subscribe(departmentsWithNames => this.logger.info('Departments: ', departmentsWithNames));
  }

  get title(): string {
    return this.titleText;
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { FooModule } from './foo/foo.module';
import { CAT_FACTS_URL } from './init/init.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoggerModule } from './logger/logger.module';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FooModule,
        MatSliderModule,
        LoggerModule
      ],
      declarations: [
        AppComponent
      ], providers: [
        {provide: CAT_FACTS_URL, useValue: 'dummy'}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Angular Jest Test Project'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Angular Jest Test Project');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#title')?.textContent).toContain('Angular Jest Test Project');
  });
});

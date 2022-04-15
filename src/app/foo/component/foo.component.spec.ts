import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooComponent } from './foo.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatGridListHarness, MatGridTileHarness } from '@angular/material/grid-list/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { FooService } from '../service/foo.service';
import { Observable } from 'rxjs';

describe('FooComponent', () => {

  let component: FooComponent;
  let fixture: ComponentFixture<FooComponent>;
  let loader: HarnessLoader;

  jest.mock('@angular/common/http');
  const serviceMock = {
    getSomeData: jest.fn().mockReturnValue(new Observable())
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatGridListModule],
      declarations: [FooComponent],
      providers: [{provide: FooService, useValue: serviceMock}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  test('Grid List should be one', async () => {
    const listHarnesses = await loader.getAllHarnesses(MatGridListHarness);
    expect(listHarnesses.length).toEqual(1);
  });

  test('Grid Titles should be two', async () => {
    const tileHarnesses = await loader.getAllHarnesses(MatGridTileHarness);
    expect(tileHarnesses.length).toEqual(2);
  });
});

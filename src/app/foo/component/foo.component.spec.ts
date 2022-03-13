import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FooComponent} from './foo.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatGridListHarness, MatGridTileHarness} from "@angular/material/grid-list/testing";
import { HarnessLoader } from '@angular/cdk/testing';

describe('FooComponent', () => {
  let component: FooComponent;
  let fixture: ComponentFixture<FooComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatGridListModule],
      declarations: [FooComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  it('Grid List should be one', async () => {
    const listHarnesses = await loader.getAllHarnesses(MatGridListHarness);
    expect(listHarnesses.length).toEqual(1);
  });

  it('Grid Titles should be two', async () => {
    const tileHarnesses = await loader.getAllHarnesses(MatGridTileHarness);
    expect(tileHarnesses.length).toEqual(2);
  });
});

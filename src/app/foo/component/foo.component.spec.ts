import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooComponent } from './foo.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatGridListHarness, MatGridTileHarness } from '@angular/material/grid-list/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { CatFactResponse, CatFactsService } from '../service/cat-facts.service';
import { of } from 'rxjs';
import mocked = jest.mocked;

describe('FooComponent', () => {

  let component: FooComponent;
  let fixture: ComponentFixture<FooComponent>;
  let loader: HarnessLoader;

  let expectedFact: CatFactResponse = new CatFactResponse('A fact about cats', 17);

  const serviceMock = (mocked<Partial<CatFactsService>>({
    getSomeFactOnCats: jest.fn().mockReturnValue(of(expectedFact))
  }) as CatFactsService);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatGridListModule],
      declarations: [FooComponent],
      providers: [{provide: CatFactsService, useValue: serviceMock}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  describe('HTML Mat Components', () => {
    test('#should be one Grid List', async () => {
      const listHarnesses = await loader.getAllHarnesses(MatGridListHarness);
      expect(listHarnesses.length).toEqual(1);
    });

    test('#should be two Grid Titles', async () => {
      const tileHarnesses = await loader.getAllHarnesses(MatGridTileHarness);
      expect(tileHarnesses.length).toEqual(2);
    });
  });

  describe('Mat UI contents', () => {
    test(`#should be ${expectedFact.text}`, async () => {
      const tileHarnesses = await loader.getAllHarnesses(MatGridTileHarness);
      expect(await tileHarnesses[0].hasHeader()).toBe(false);
      expect(await (await tileHarnesses[0].host()).text()).toBe('A fact about cats');
    });
  });
});

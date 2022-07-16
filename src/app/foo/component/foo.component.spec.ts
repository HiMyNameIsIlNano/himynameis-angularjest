import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooComponent } from './foo.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatGridListHarness, MatGridTileHarness } from '@angular/material/grid-list/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { CatFactResponse, CatFactsService } from '../service/cat-facts.service';
import { of } from 'rxjs';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatCardModule } from '@angular/material/card';
import mocked = jest.mocked;

describe('FooComponent', () => {

  let component: FooComponent;
  let fixture: ComponentFixture<FooComponent>;
  let loader: HarnessLoader;

  let expectedFact: CatFactResponse = {
    factLengthInLetters: 17,
    factText: 'A fact about cats'
  };

  const serviceMock = (mocked<Partial<CatFactsService>>({
    getSomeFactOnCats: jest.fn().mockReturnValue(of(expectedFact))
  }) as CatFactsService);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatGridListModule, MatCardModule],
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

    test('#should be one Grid Titles', async () => {
      const tileHarnesses = await loader.getAllHarnesses(MatGridTileHarness);
      expect(tileHarnesses.length).toEqual(1);
    });
  });

  describe('Mat UI contents', () => {
    test(`#should be ${expectedFact.factText}`, async () => {
      const tileHarnesses = await loader.getAllHarnesses(MatGridTileHarness);

      expect(tileHarnesses.length).toBe(1);
      expect(await tileHarnesses[0].hasHeader()).toBe(false);

      const matCardHarnesses = await loader.getAllHarnesses(MatCardHarness);
      expect(matCardHarnesses.length).toBe(1);
      expect(await matCardHarnesses[0].getTitleText()).toBe('Length: 17');
      expect(await matCardHarnesses[0].getText()).toContain('A fact about cats');
    });
  });
});

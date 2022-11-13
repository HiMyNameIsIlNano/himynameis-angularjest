import { BazService } from './baz.service';
import { LoggerService } from '../logger/logger.service';
import { BazMockService, PayloadDto } from './baz-mock.service';
import { throwError } from 'rxjs';

describe('BazService', () => {

  let testSubject: BazService;

  let loggerStub: LoggerService;

  let mockServiceStub: BazMockService;

  beforeEach(() => {

    mockServiceStub = new BazMockService();

    loggerStub = {
      info: (_) => {
      },
      warn: (_) => {
      },
      error: (_) => {
      }
    } as LoggerService;

    testSubject = new BazService(mockServiceStub, loggerStub);
  });

  it('should be created', () => {
    expect(testSubject).toBeTruthy();
  });

  it('test everything is fine', () => {
    jest.spyOn(mockServiceStub, 'getMockedData');

    const logInfoSpy = jest.spyOn(loggerStub, 'info');
    const logErrorSpy = jest.spyOn(loggerStub, 'error');
    let received: PayloadDto[] = [];
    let expectedResult = [
      {
        id: 1,
        name: 'item',
        description: 'itemOne'
      }, {
        id: 2,
        name: 'item',
        description: 'itemTwo'
      }
    ];

    testSubject.getSomeData().subscribe(
      {
        next: result => received = result
      }
    );

    expect(logInfoSpy).toHaveBeenCalled();
    expect(received).toStrictEqual(expectedResult);
    expect(logErrorSpy).not.toHaveBeenCalled();
  });

  it('test error case', () => {
    // This way we activate the error channel in the baz.service.ts
    jest.spyOn(mockServiceStub, 'getMockedData').mockReturnValue(
      throwError(() => new Error('I am a bad error'))
    );

    const logErrorSpy = jest.spyOn(loggerStub, 'error');

    testSubject.getSomeData().subscribe();

    expect(logErrorSpy).toHaveBeenCalled();
  });
});

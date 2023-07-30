import * as angularCore from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { JokesService } from './jokes.service';
import { of } from 'rxjs';

describe('JokesService', () => {
  function createInstance() {
    const mockHttp = {
      get: jest.fn().mockReturnValue(of({})),
    };

    const injectSpy = jest.spyOn(angularCore, 'inject');
    injectSpy.mockImplementation(providerToken => {
      if (providerToken === HttpClient) {
        return mockHttp;
      }
      return undefined;
    });

    return { service: new JokesService(), mockHttp };
  }

  it('should be created', () => {
    const { service } = createInstance();
    expect(service).toBeTruthy();
  });

  describe('getRandomJoke', () => {
    it('should call http', () => {
      const { service, mockHttp } = createInstance();
      service.getRandomJoke();
      expect(mockHttp.get).toBeCalled();
    });
  });
});

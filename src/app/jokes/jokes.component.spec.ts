import { HttpClient } from '@angular/common/http';
import { JokesComponent } from './jokes.component';
import * as angularCore from '@angular/core';
import { of } from 'rxjs';

describe('JokesComponent', () => {
  function createComponent() {
    const injectSpy = jest.spyOn(angularCore, 'inject');
    injectSpy.mockImplementation(providerToken => {
      if (providerToken === HttpClient) {
        return {
          get: jest.fn().mockReturnValue(of({})),
        };
      }
      return undefined;
    });

    return new JokesComponent();
  }

  it('should create component', () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });
});

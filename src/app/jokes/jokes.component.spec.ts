import * as angularCore from '@angular/core';
import { Store } from '@ngrx/store';
import { jokesApiActions } from '../+state/jokes-api.actions';
import { jokesActions } from '../+state/jokes.actions';
import { JokesComponent } from './jokes.component';

describe('JokesComponent', () => {
  function createComponent() {
    const mockStore = {
      dispatch: jest.fn(),
      select: jest.fn(),
    } as Partial<Store>;

    const injectSpy = jest.spyOn(angularCore, 'inject');
    injectSpy.mockImplementation(providerToken => {
      if (providerToken === Store) {
        return mockStore;
      }
      return undefined;
    });

    return { component: new JokesComponent(), mockStore };
  }

  it('should create component', () => {
    const { component } = createComponent();
    expect(component).toBeTruthy();
  });

  describe('onFavorite', () => {
    it('should dispatch favoriteJoke action', () => {
      const { component, mockStore } = createComponent();
      const expected = { id: 'joke-1' } as any;
      component.onFavorite(expected);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        jokesActions.favoriteJoke({ joke: expected })
      );
    });
  });

  describe('loadInitalJokes$$', () => {
    it('should call getRandomJoke 10 times', () => {
      const { component, mockStore } = createComponent();
      component.ngOnInit();
      expect(mockStore.dispatch).toBeCalledWith(
        jokesApiActions.getRandomJoke()
      );
      expect(mockStore.dispatch).toBeCalledTimes(10);
    });
  });

  describe('toggleJokesInterval', () => {
    it('should set interval if not already set', () => {
      const { component } = createComponent();
      component.toggleJokesInterval();
      expect(component.intervalRunning).toBeTruthy();
    });

    it('should remove interval if already set', () => {
      const { component } = createComponent();
      // Set interval
      component.toggleJokesInterval();
      // Unset interval
      component.toggleJokesInterval();

      expect(component.intervalRunning).toBeFalsy();
    });
  });

  describe('onDestroy', () => {
    it('should destroy interval subscription if set', () => {
      const { component } = createComponent();

      const spy = jest.spyOn(component as any, 'stopJokesInterval');

      component.toggleJokesInterval();
      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });
});

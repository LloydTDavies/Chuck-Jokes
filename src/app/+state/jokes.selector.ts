import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './jokes.reducer';

export const selectFeature = createFeatureSelector<State>('jokes');
export const selectJokes = createSelector(
  selectFeature,
  (state: State) => state.jokes
);
export const selectFavorites = createSelector(
  selectFeature,
  (state: State) => state.favorites
);

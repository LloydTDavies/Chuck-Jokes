import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './favorites.reducer';

export const selectFeature = createFeatureSelector<State>('favorites');

export const selectFavorites = createSelector(
  selectFeature,
  (state: State) => state.favorites || []
);

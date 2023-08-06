import { createReducer, on } from '@ngrx/store';
import { Joke } from '../shared/models/joke';
import { favoritesActions } from './favorites.actions';
import { jokesActions } from './jokes.actions';

export interface State {
  loading: boolean;
  error?: any;
  favorites: Joke[];
}
export const initialState: State = {
  loading: false,
  favorites: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(jokesActions.favoriteJokesUpdated, (state, props): State => {
    const { favorites } = props;
    return { ...state, favorites };
  }),
  on(favoritesActions.unfavoriteJokeSuccess, (state, props): State => {
    const { favorites } = props;
    return { ...state, favorites };
  }),
  on(favoritesActions.loadFavoritesSuccess, (state: State, props): State => {
    return { ...state, favorites: props.jokes };
  })
);

import { createReducer, on } from '@ngrx/store';
import { Joke } from '../shared/models/joke';
import { jokesApiActions } from './jokes-api.actions';
import { jokesActions } from './jokes.actions';

export interface State {
  loading: boolean;
  error?: any;
  jokes: Joke[];
  favorites: Joke[];
}
export const initialState: State = {
  loading: false,
  jokes: [],
  favorites: [],
};

export const jokesReducer = createReducer(
  initialState,
  on(jokesApiActions.getRandomJoke, (state): State => {
    return { ...state, loading: true };
  }),
  on(jokesApiActions.getRandomJokeSuccess, (state, props): State => {
    const jokes: Joke[] = [...state.jokes, props.joke];
    return { ...state, jokes, loading: false };
  }),
  on(jokesApiActions.getRandomJokeError, (state, props): State => {
    return { ...state, error: props.error, loading: false };
  }),
  on(jokesActions.favoriteJoke, (state, props): State => {
    const favorites = [...state.favorites, props.joke];
    return { ...state, favorites };
  }),
  on(jokesActions.unfavoriteJoke, (state, props): State => {
    const favorites = state.favorites.filter(favs => favs.id !== props.joke.id);
    return { ...state, favorites };
  })
);

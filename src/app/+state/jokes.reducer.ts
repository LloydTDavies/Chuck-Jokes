import { createReducer, on } from '@ngrx/store';
import { Joke } from '../shared/models/joke';
import { jokesApiActions } from './jokes-api.actions';
import { jokesActions } from './jokes.actions';
import { environment } from 'src/environments/environment';

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
    let jokes: Joke[] = [...state.jokes, props.joke];
    if (state.jokes.length > 9) {
      const oldestJoke = jokes.reduce((acc, joke) => {
        if (acc.created_at > joke.created_at) {
          return joke;
        } else {
          return acc;
        }
      }, jokes[0]);
      jokes.splice(jokes.indexOf(oldestJoke), 1);
    }
    return { ...state, jokes, loading: false };
  }),
  on(jokesApiActions.getRandomJokeError, (state, props): State => {
    return { ...state, error: props.error, loading: false };
  }),
  on(jokesActions.favoriteJoke, (state, props): State => {
    if (
      state.favorites.length < 10 &&
      !state.favorites.find((favs: Joke) => favs.id === props.joke.id)
    ) {
      const favorites = [...state.favorites, props.joke];
      saveToLocalStorage(favorites);
      return { ...state, favorites };
    }
    return state;
  }),
  on(jokesActions.unfavoriteJoke, (state, props): State => {
    const favorites = state.favorites.filter(favs => favs.id !== props.joke.id);
    saveToLocalStorage(favorites);
    return { ...state, favorites };
  }),
  on(jokesActions.removeAllJokes, (state: State): State => {
    return { ...state, jokes: [] };
  }),
  on(jokesActions.loadFavoritesSuccess, (state: State, props): State => {
    return { ...state, favorites: props.jokes };
  })
);

const saveToLocalStorage = (favorites: Joke[]) => {
  localStorage.setItem(environment.CHUCK_JOKES_KEY, JSON.stringify(favorites));
};

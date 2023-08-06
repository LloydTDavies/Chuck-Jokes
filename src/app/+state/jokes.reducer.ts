import { createReducer, on } from '@ngrx/store';
import { Joke } from '../shared/models/joke';
import { jokesApiActions } from './jokes-api.actions';
import { jokesActions } from './jokes.actions';

export interface State {
  loading: boolean;
  error?: any;
  jokes: Joke[];
}
export const initialState: State = {
  loading: false,
  jokes: [],
};

export const jokesReducer = createReducer(
  initialState,
  on(jokesApiActions.getRandomJoke, (state): State => {
    return { ...state, loading: true };
  }),
  on(jokesApiActions.updateJokes, (state, props): State => {
    const { jokes } = props;
    return { ...state, jokes, loading: false };
  }),
  on(jokesApiActions.getRandomJokeError, (state, props): State => {
    return { ...state, error: props.error, loading: false };
  }),
  on(jokesActions.removeAllJokes, (state: State): State => {
    return { ...state, jokes: [] };
  })
);

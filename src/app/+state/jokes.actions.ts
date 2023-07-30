import { createActionGroup, props } from '@ngrx/store';
import { Joke } from '../shared/models/joke';

export const jokesActions = createActionGroup({
  source: 'Jokes',
  events: {
    'Add Joke': props<{ joke: Joke }>(),
    'Remove Joke': props<{ joke: Joke }>(),
    'Favorite Joke': props<{ joke: Joke }>(),
    'Unfavorite Joke': props<{ joke: Joke }>(),
  },
});

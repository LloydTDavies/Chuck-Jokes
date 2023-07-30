import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Joke } from '../shared/models/joke';

export const jokesActions = createActionGroup({
  source: 'Jokes',
  events: {
    'Add Joke': props<{ joke: Joke }>(),
    'Remove all jokes': emptyProps(),
    'Favorite Joke': props<{ joke: Joke }>(),
    'Unfavorite Joke': props<{ joke: Joke }>(),
    'Load Favorites': emptyProps(),
    'Load Favorites success': props<{ jokes: Joke[] }>(),
    'Load Favorites unavailable': emptyProps(),
  },
});

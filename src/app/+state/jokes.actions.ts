import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Joke } from '../shared/models/joke';

export const jokesActions = createActionGroup({
  source: 'Jokes',
  events: {
    'Add Joke': props<{ joke: Joke }>(),
    'Remove all jokes': emptyProps(),
    'Favorite Joke': props<{ joke: Joke }>(),
    'Favorite Joke failed': props<{ error: any }>(),
    'Favorite jokes updated': props<{ favorites: Joke[] }>(),
  },
});

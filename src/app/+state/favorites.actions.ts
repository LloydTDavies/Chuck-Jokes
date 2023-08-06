import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Joke } from '../shared/models/joke';

export const favoritesActions = createActionGroup({
  source: 'Favorites',
  events: {
    'Unfavorite Joke': props<{ joke: Joke }>(),
    'Unfavorite Joke success': props<{ favorites: Joke[] }>(),
    'Load Favorites': emptyProps(),
    'Load Favorites success': props<{ jokes: Joke[] }>(),
    'Load Favorites unavailable': emptyProps(),
  },
});

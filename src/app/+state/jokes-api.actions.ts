import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Joke } from '../shared/models/joke';

export const jokesApiActions = createActionGroup({
  source: 'Jokes Api',
  events: {
    'Get random joke': emptyProps(),
    'Get random joke success': props<{ joke: Joke }>(),
    'Get random joke error': props<{ error: any }>(),
  },
});

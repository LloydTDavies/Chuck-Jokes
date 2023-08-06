import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import { jokesApiActions } from './jokes-api.actions';
import { selectJokes } from './jokes.selector';
import { JokesService } from './jokes.service';

@Injectable({
  providedIn: 'root',
})
export class JokesEffects {
  private readonly actions$ = inject(Actions);
  private readonly jokeService = inject(JokesService);
  private readonly store = inject(Store);

  readonly loadJokes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(jokesApiActions.getRandomJoke),
      mergeMap(() =>
        this.jokeService.getRandomJoke().pipe(
          withLatestFrom(this.store.select(selectJokes)),
          map(([joke, jokes]) => {
            const newJokes = [...jokes];
            if (newJokes.length === 10) {
              newJokes.shift();
            }
            newJokes.push(joke);
            return jokesApiActions.updateJokes({ jokes: newJokes });
          })
        )
      )
    );
  });
}

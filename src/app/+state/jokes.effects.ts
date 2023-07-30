import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { jokesApiActions } from './jokes-api.actions';
import { mergeMap, map } from 'rxjs';
import { JokesService } from './jokes.service';

@Injectable({
  providedIn: 'root',
})
export class JokesEffects {
  private readonly actions$ = inject(Actions);
  private readonly jokeService = inject(JokesService);
  readonly loadJokes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(jokesApiActions.getRandomJoke),
      mergeMap(() =>
        this.jokeService
          .getRandomJoke()
          .pipe(map(joke => jokesApiActions.getRandomJokeSuccess({ joke })))
      )
    );
  });
}

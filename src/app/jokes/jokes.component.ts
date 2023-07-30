import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Joke } from '../shared/models/joke';
import { selectJokes, selectLoading } from '../+state/jokes.selector';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { jokesApiActions } from '../+state/jokes-api.actions';
import { jokesActions } from '../+state/jokes.actions';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent implements OnDestroy {
  private readonly store = inject(Store);

  private readonly loadInitialJokes$$ = new Subject<void>();
  private readonly destroy$$ = new Subject<void>();

  private timer?: NodeJS.Timeout;

  /**
   * An array of chuck norris jokes
   */
  readonly jokes$: Observable<Joke[]> = this.store.select(selectJokes);
  readonly isLoading$: Observable<boolean> = this.store.select(selectLoading);

  constructor() {
    this.loadInitialJokes$$
      .pipe(
        tap(() => {
          for (let index = 0; index < 10; index++) {
            this.store.dispatch(jokesApiActions.getRandomJoke());
          }
          this.timer = setInterval(() => {
            this.store.dispatch(jokesApiActions.getRandomJoke());
          }, 5000);
        }),
        takeUntil(this.destroy$$)
      )
      .subscribe();
  }

  loadJokes(): void {
    this.loadInitialJokes$$.next();
  }

  onFavorite(joke: Joke): void {
    if (joke) this.store.dispatch(jokesActions.favoriteJoke({ joke }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(jokesActions.removeAllJokes());
    clearInterval(this.timer);
    this.destroy$$.next();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, interval, tap } from 'rxjs';
import { jokesApiActions } from '../+state/jokes-api.actions';
import { jokesActions } from '../+state/jokes.actions';
import { selectJokes } from '../+state/jokes.selector';
import { Joke } from '../shared/models/joke';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private jokesIntervalSubscription?: Subscription;

  /**
   * Determines if the joke interval is running.
   * Will also change the button text for the toggle.
   */
  intervalRunning = false;

  /**
   * An array of chuck norris jokes
   */
  readonly jokes$: Observable<Joke[]> = this.store.select(selectJokes);

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      this.store.dispatch(jokesApiActions.getRandomJoke());
    }
  }

  /**
   * Adds a joke to be favored
   * @param joke Joke to be favored
   */
  onFavorite(joke: Joke): void {
    if (joke) this.store.dispatch(jokesActions.favoriteJoke({ joke }));
  }

  toggleJokesInterval() {
    if (this.intervalRunning) {
      this.stopJokesInterval();
    } else {
      this.startJokesInterval();
    }
    this.intervalRunning = !this.intervalRunning;
  }

  private startJokesInterval() {
    this.jokesIntervalSubscription = interval(5000)
      .pipe(tap(() => this.store.dispatch(jokesApiActions.getRandomJoke())))
      .subscribe();
  }

  private stopJokesInterval() {
    if (this.jokesIntervalSubscription) {
      this.jokesIntervalSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.stopJokesInterval();
    this.store.dispatch(jokesActions.removeAllJokes());
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Joke } from '../shared/models/joke';
import { selectJokes } from '../+state/jokes.selector';
import { Observable } from 'rxjs';
import { jokesApiActions } from '../+state/jokes-api.actions';
import { jokesActions } from '../+state/jokes.actions';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  private readonly store = inject(Store);
  readonly jokes$: Observable<Joke[]> = this.store.select(selectJokes);

  constructor() {
    for (let index = 0; index < 10; index++) {
      this.store.dispatch(jokesApiActions.getRandomJoke());
    }
  }

  onFavorite(joke: Joke) {
    if (joke) this.store.dispatch(jokesActions.favoriteJoke({ joke }));
  }
}

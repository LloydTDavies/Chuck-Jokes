import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFavorites, selectJokes } from '../+state/jokes.selector';
import { Joke } from '../shared/models/joke';
import { jokesActions } from '../+state/jokes.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  private readonly store = inject(Store);
  readonly jokes$: Observable<Joke[]> = this.store.select(selectFavorites);

  onUnfavorite(joke: Joke) {
    if (joke) this.store.dispatch(jokesActions.unfavoriteJoke({ joke }));
  }
}

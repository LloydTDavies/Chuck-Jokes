import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { favoritesActions } from '../+state/favorites.actions';
import { selectFavorites } from '../+state/favorites.selector';
import { Joke } from '../shared/models/joke';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  private readonly store = inject(Store);
  readonly jokes$: Observable<Joke[]> = this.store.select(selectFavorites);

  ngOnInit(): void {
    this.store.dispatch(favoritesActions.loadFavorites());
  }

  onUnfavorite(joke: Joke) {
    if (joke) this.store.dispatch(favoritesActions.unfavoriteJoke({ joke }));
  }
}

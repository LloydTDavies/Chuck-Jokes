import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Joke } from '../shared/models/joke';
import { favoritesActions } from './favorites.actions';
import { selectFavorites } from './favorites.selector';
import { jokesActions } from './jokes.actions';

const saveToLocalStorage = (favorites: Joke[]) => {
  localStorage.setItem(environment.CHUCK_JOKES_KEY, JSON.stringify(favorites));
};

@Injectable({
  providedIn: 'root',
})
export class FavoritesEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  readonly loadFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(favoritesActions.loadFavorites),
      map(() => {
        const storedFavs = localStorage.getItem(environment.CHUCK_JOKES_KEY);
        if (storedFavs) {
          const jokes = JSON.parse(storedFavs);
          return favoritesActions.loadFavoritesSuccess({ jokes });
        }
        return favoritesActions.loadFavoritesUnavailable();
      })
    );
  });

  readonly addToFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(jokesActions.favoriteJoke),
      withLatestFrom(this.store.select(selectFavorites)),
      map(([action, stateFavorites]) => {
        const { joke } = action;
        if (stateFavorites.length === 10) {
          return jokesActions.favoriteJokeFailed({
            error: 'Unable to favorite more than 10 jokes',
          });
        }
        if (stateFavorites.find((favs: Joke) => favs.id === joke.id)) {
          return jokesActions.favoriteJokeFailed({
            error: 'Unable to favorite the same joke',
          });
        }
        const favorites = [...stateFavorites, joke];
        saveToLocalStorage(favorites);
        return jokesActions.favoriteJokesUpdated({
          favorites,
        });
      })
    );
  });

  readonly removeFromFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(favoritesActions.unfavoriteJoke),
      withLatestFrom(this.store.select(selectFavorites)),
      map(([action, stateFavorites]) => {
        const { joke } = action;
        const favorites = stateFavorites.filter(favs => favs.id !== joke.id);
        saveToLocalStorage(favorites);
        return favoritesActions.unfavoriteJokeSuccess({
          favorites,
        });
      })
    );
  });
}

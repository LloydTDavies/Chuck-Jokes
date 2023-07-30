import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { jokesActions } from './+state/jokes.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly store = inject(Store);

  constructor() {
    this.store.dispatch(jokesActions.loadFavorites());
  }
}

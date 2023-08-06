import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites.component';
import { SharedModule } from '../shared/shared.module';
import { favoritesReducer } from '../+state/favorites.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesEffects } from '../+state/favorites.effects';

const routes: Routes = [{ path: '', component: FavoritesComponent }];

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('favorites', favoritesReducer),
    EffectsModule.forFeature([FavoritesEffects]),
  ],
})
export class FavoritesModule {}

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JokesComponent } from './jokes.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { jokesReducer } from '../+state/jokes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JokesEffects } from '../+state/jokes.effects';

const routes: Routes = [{ path: '', component: JokesComponent }];

@NgModule({
  declarations: [JokesComponent],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature('jokes', jokesReducer),
    EffectsModule.forFeature([JokesEffects]),
  ],
})
export class JokesModule {}

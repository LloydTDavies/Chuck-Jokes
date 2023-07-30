import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JokesComponent } from './jokes.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: JokesComponent }];

@NgModule({
  declarations: [JokesComponent],
  imports: [RouterModule.forChild(routes), HttpClientModule, SharedModule],
})
export class JokesModule {}

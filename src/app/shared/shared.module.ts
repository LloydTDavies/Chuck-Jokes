import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JokeCardComponent } from './ui/joke-card/joke-card.component';
import { JokeCardListComponent } from './ui/joke-card-list/joke-card-list.component';

@NgModule({
  declarations: [JokeCardComponent, JokeCardListComponent],
  imports: [CommonModule],
  exports: [JokeCardComponent, JokeCardListComponent, CommonModule],
})
export class SharedModule {}

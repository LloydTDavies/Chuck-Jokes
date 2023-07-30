import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JokeCardComponent } from './ui/joke-card/joke-card.component';

@NgModule({
  declarations: [JokeCardComponent],
  imports: [CommonModule],
  exports: [JokeCardComponent, CommonModule],
})
export class SharedModule {}

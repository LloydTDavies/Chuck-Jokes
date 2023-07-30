import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Joke } from '../../models/joke';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeCardComponent {
  @Output() favorite = new EventEmitter<Joke>();
  @Input() joke!: Joke;
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Joke } from '../../models/joke';

@Component({
  selector: 'app-joke-card-list',
  templateUrl: './joke-card-list.component.html',
  styleUrls: ['./joke-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeCardListComponent {
  @Input() jokes: Joke[] = [];
  @Input() showUnfavorite = false;
  @Output() readonly favorite = new EventEmitter<Joke>();
}

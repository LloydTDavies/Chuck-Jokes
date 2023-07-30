import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Joke } from '../shared/models/joke';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  private readonly http = inject(HttpClient);
  readonly jokes$ = this.http.get<Joke>(
    'https://api.chucknorris.io/jokes/random'
  );
}

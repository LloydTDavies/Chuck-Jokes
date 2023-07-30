import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from '../shared/models/joke';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  private readonly http = inject(HttpClient);

  getRandomJoke(): Observable<Joke> {
    return this.http.get<Joke>('https://api.chucknorris.io/jokes/random');
  }
}

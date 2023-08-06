import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Joke } from '../../models/joke';
import { JokeCardComponent } from './joke-card.component';

describe('JokeCardComponent', () => {
  let component: JokeCardComponent;
  let fixture: ComponentFixture<JokeCardComponent>;
  const defaultJoke: Joke = {
    id: '1',
    categories: [],
    created_at: new Date(),
    icon_url: '',
    updated_at: new Date(),
    url: 'www.url1.com',
    value:
      'Why did the chicken cross the road, because Chuck norris told it to.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeCardComponent);
    component = fixture.componentInstance;

    component.joke = defaultJoke;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display joke', () => {
    const textContent =
      fixture.debugElement.nativeElement.querySelector(
        '#joke-text'
      ).textContent;
    expect(textContent.trim()).toEqual(defaultJoke.value);
  });
});

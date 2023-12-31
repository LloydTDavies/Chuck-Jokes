import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeCardListComponent } from './joke-card-list.component';

describe('JokeCardListComponent', () => {
  let component: JokeCardListComponent;
  let fixture: ComponentFixture<JokeCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokeCardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

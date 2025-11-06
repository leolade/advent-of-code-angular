import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleDay } from './puzzle-day';

describe('PuzzleDay', () => {
  let component: PuzzleDay;
  let fixture: ComponentFixture<PuzzleDay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleDay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleDay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlePart } from './puzzle-part.component';

describe('PuzzleDay', () => {
  let component: PuzzlePart;
  let fixture: ComponentFixture<PuzzlePart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzlePart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzlePart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

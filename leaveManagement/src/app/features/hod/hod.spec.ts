import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hod } from './hod';

describe('Hod', () => {
  let component: Hod;
  let fixture: ComponentFixture<Hod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hod],
    }).compileComponents();

    fixture = TestBed.createComponent(Hod);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

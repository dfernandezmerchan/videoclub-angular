import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anadir } from './anadir';

describe('Anadir', () => {
  let component: Anadir;
  let fixture: ComponentFixture<Anadir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Anadir],
    }).compileComponents();

    fixture = TestBed.createComponent(Anadir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderButtonLinks } from './header-button-links';

describe('HeaderButtonLinks', () => {
  let component: HeaderButtonLinks;
  let fixture: ComponentFixture<HeaderButtonLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderButtonLinks],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderButtonLinks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

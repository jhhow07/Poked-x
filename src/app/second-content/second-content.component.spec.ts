import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondContentComponent } from './second-content.component';

describe('SecondContentComponent', () => {
  let component: SecondContentComponent;
  let fixture: ComponentFixture<SecondContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondContentComponent]
    });
    fixture = TestBed.createComponent(SecondContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

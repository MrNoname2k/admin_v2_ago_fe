import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouceComponent } from './annouce.component';

describe('AnnouceComponent', () => {
  let component: AnnouceComponent;
  let fixture: ComponentFixture<AnnouceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnouceComponent]
    });
    fixture = TestBed.createComponent(AnnouceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

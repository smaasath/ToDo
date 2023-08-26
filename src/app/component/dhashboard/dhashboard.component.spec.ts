import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhashboardComponent } from './dhashboard.component';

describe('DhashboardComponent', () => {
  let component: DhashboardComponent;
  let fixture: ComponentFixture<DhashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DhashboardComponent]
    });
    fixture = TestBed.createComponent(DhashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

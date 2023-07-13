import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlogdetailsComponent } from './viewlogdetails.component';

describe('ViewlogdetailsComponent', () => {
  let component: ViewlogdetailsComponent;
  let fixture: ComponentFixture<ViewlogdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewlogdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewlogdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

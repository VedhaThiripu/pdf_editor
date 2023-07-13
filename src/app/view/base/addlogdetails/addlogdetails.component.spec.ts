import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlogdetailsComponent } from './addlogdetails.component';

describe('AddlogdetailsComponent', () => {
  let component: AddlogdetailsComponent;
  let fixture: ComponentFixture<AddlogdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlogdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlogdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

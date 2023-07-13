import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlogformComponent } from './newlogform.component';

describe('NewlogformComponent', () => {
  let component: NewlogformComponent;
  let fixture: ComponentFixture<NewlogformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewlogformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewlogformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

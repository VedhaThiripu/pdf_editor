import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronstatusComponent } from './cronstatus.component';

describe('CronstatusComponent', () => {
  let component: CronstatusComponent;
  let fixture: ComponentFixture<CronstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

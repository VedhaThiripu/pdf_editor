import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoguploadstatusComponent } from './loguploadstatus.component';

describe('LoguploadstatusComponent', () => {
  let component: LoguploadstatusComponent;
  let fixture: ComponentFixture<LoguploadstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoguploadstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoguploadstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

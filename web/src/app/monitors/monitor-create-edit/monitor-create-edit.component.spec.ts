import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorCreateEditComponent } from './monitor-create-edit.component';

describe('MonitorCreateEditComponent', () => {
  let component: MonitorCreateEditComponent;
  let fixture: ComponentFixture<MonitorCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

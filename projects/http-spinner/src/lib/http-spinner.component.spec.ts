import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HttpSpinnerComponent } from './http-spinner.component';

describe('HttpSpinnerComponent', () => {
  let component: HttpSpinnerComponent;
  let fixture: ComponentFixture<HttpSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

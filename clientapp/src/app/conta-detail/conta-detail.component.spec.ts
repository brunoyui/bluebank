import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaDetailComponent } from './conta-detail.component';

describe('ContaDetailComponent', () => {
  let component: ContaDetailComponent;
  let fixture: ComponentFixture<ContaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

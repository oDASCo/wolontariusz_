import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HereBlockComponent } from './here-block.component';

describe('HereBlockComponent', () => {
  let component: HereBlockComponent;
  let fixture: ComponentFixture<HereBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HereBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HereBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

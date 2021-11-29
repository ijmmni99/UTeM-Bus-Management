import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaraiBasComponent } from './senarai-bas.component';

describe('SenaraiBasComponent', () => {
  let component: SenaraiBasComponent;
  let fixture: ComponentFixture<SenaraiBasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenaraiBasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiBasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

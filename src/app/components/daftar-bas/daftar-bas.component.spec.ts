import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarBasComponent } from './daftar-bas.component';

describe('DaftarBasComponent', () => {
  let component: DaftarBasComponent;
  let fixture: ComponentFixture<DaftarBasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaftarBasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarBasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

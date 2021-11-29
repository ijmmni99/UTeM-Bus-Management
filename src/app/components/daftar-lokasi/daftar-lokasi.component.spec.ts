import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarLokasiComponent } from './daftar-lokasi.component';

describe('DaftarLokasiComponent', () => {
  let component: DaftarLokasiComponent;
  let fixture: ComponentFixture<DaftarLokasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaftarLokasiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarLokasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

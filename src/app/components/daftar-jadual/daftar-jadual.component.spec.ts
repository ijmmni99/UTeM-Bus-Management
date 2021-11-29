import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarJadualComponent } from './daftar-jadual.component';

describe('DaftarJadualComponent', () => {
  let component: DaftarJadualComponent;
  let fixture: ComponentFixture<DaftarJadualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaftarJadualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarJadualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

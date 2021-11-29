import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaraiLokasiComponent } from './senarai-lokasi.component';

describe('SenaraiLokasiComponent', () => {
  let component: SenaraiLokasiComponent;
  let fixture: ComponentFixture<SenaraiLokasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenaraiLokasiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiLokasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

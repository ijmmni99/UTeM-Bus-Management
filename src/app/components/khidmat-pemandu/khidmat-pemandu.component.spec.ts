import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhidmatPemanduComponent } from './khidmat-pemandu.component';

describe('KhidmatPemanduComponent', () => {
  let component: KhidmatPemanduComponent;
  let fixture: ComponentFixture<KhidmatPemanduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhidmatPemanduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhidmatPemanduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

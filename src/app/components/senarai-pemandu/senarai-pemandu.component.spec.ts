import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaraiPemanduComponent } from './senarai-pemandu.component';

describe('SenaraiPemanduComponent', () => {
  let component: SenaraiPemanduComponent;
  let fixture: ComponentFixture<SenaraiPemanduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenaraiPemanduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiPemanduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

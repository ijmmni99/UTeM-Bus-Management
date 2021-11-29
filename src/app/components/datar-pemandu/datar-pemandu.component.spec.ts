import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatarPemanduComponent } from './datar-pemandu.component';

describe('DatarPemanduComponent', () => {
  let component: DatarPemanduComponent;
  let fixture: ComponentFixture<DatarPemanduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatarPemanduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatarPemanduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaraiJadualComponent } from './senarai-jadual.component';

describe('SenaraiJadualComponent', () => {
  let component: SenaraiJadualComponent;
  let fixture: ComponentFixture<SenaraiJadualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenaraiJadualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiJadualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

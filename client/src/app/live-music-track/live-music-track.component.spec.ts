import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMusicTrackComponent } from './live-music-track.component';

describe('LiveMusicTrackComponent', () => {
  let component: LiveMusicTrackComponent;
  let fixture: ComponentFixture<LiveMusicTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveMusicTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMusicTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

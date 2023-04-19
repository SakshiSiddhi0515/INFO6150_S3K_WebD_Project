import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMusicArtistComponent } from './live-music-artist.component';

describe('LiveMusicArtistComponent', () => {
  let component: LiveMusicArtistComponent;
  let fixture: ComponentFixture<LiveMusicArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveMusicArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMusicArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

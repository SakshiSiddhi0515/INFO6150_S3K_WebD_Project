import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMusicAlbumComponent } from './live-music-album.component';

describe('LiveMusicAlbumComponent', () => {
  let component: LiveMusicAlbumComponent;
  let fixture: ComponentFixture<LiveMusicAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveMusicAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMusicAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

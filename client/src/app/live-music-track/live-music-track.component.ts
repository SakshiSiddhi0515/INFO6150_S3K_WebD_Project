import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-live-music-track',
  templateUrl: './live-music-track.component.html',
  styleUrls: ['./live-music-track.component.css']
})
export class LiveMusicTrackComponent implements OnInit {

  id: string;
  track: Object;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { 
    route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.spotifyService
      .getTrack(this.id)
      .subscribe((res: any) => {
        this.renderTrack(res);
      });
  }

  renderTrack(res: any): void {
    this.track = res;
  }

  back(): void {
    this.location.back();
  }

}

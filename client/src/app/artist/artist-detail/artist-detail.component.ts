import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ArtistService } from '../artist.service';
import { AlbumService } from 'src/app/album/album.service';
import { SongService } from 'src/app/song/song.service';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/album';
import { Song } from 'src/app/models/song';
import { UserService } from 'src/app/user/user.service';
import { GLOBAL } from 'src/global';
import { transAnimation } from "../../animation/animation";

@Component({
  	selector: 'app-artist-detail',
  	templateUrl: './artist-detail.component.html',
	styleUrls: ['./artist-detail.component.css'],
	providers: [ ArtistService, AlbumService, SongService, UserService ]  ,
	animations: [transAnimation]
})
export class ArtistDetailComponent implements OnInit {
	public artist: Artist;
	public albums: Album[];
	public songs: Song[];
	public token: string;
	public url: string;
	public songSectionShow: boolean;
	public albumSelected: string;
	@Output() play: EventEmitter<Song> = new EventEmitter();
	public page: number;
	public totalItems:number;
	public idArtist: string;
	public showSong = false;
	public songSource: String;

  	constructor(
		private _artistService: ArtistService,
		private _albumService: AlbumService,
		private _songService: SongService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService
	) { 
		this.token = this._userService.getTokenInLocalStorage();
		this.url = GLOBAL.url;
		this.page = 1;
		this.totalItems = 0;
	}

  	ngOnInit() {
		this.idArtist = this._route.snapshot.paramMap.get("idArtist");
		
		this.getArtist(this.idArtist);
		
	}

	getSongs(idAlbum:string){
		this.albumSelected = idAlbum;
		this._songService.getSongs(this.token,idAlbum).subscribe(
			songResponse => {
				if(songResponse.song){
					this.songs = songResponse.song;
				}
			},
			songError => {
				console.log(songError);
			}
		)
	}

	getAlbums(idArtist: string){
		this._albumService.getAlbums(this.token,idArtist,this.page.toString(),4).subscribe(
			res => {
				if(res.album){
					this.albums = res.album.docs;
					this.totalItems = res.album.total;
					if(this.albums.length > 0){
						this.albumSelected = this._route.snapshot.paramMap.get("idAlbum");
						
						if(!this.albumSelected){
							this.albumSelected = this.albums[0]._id;
						}

						this.getSongs(this.albumSelected);
						this.songSectionShow = true;
						
					}else{
						this.songSectionShow = false;
					}
				}
			},
			err => {
				console.log(err);
			}
		)
	}
	  
	getArtist(idArtist: string){
		this._artistService.getArtist(this.token,idArtist).subscribe(
			response => {
				if(response.artist){
					this.artist = response.artist;
					this.getAlbums(this.artist._id);
				}
			},
			error => {
				console.log(error);
			}
		)
	}


	playSong(song){
		// this.play.emit(song);
		this.showSong = false;
		this.songSource = "../../../assets/localSongs/" + song.songName;
		this.showSong = true;
		// const data = {name: song.name, path: '../../../assets/localSongs/Number.mp3'};
		// this._artistService.setCurrentSong(data);
	}

	pageChanged(event: any): void {
		this.page = event.page;
		this.getAlbums(this.idArtist);
	}

}

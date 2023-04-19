import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { ArtistService } from "../artist/artist.service";
import { UserService } from "../user/user.service";
import { GLOBAL } from 'src/global';
import { Album } from '../models/album';
import { AlbumService } from '../album/album.service';
import { Song } from "../models/song";
import { SongService } from '../song/song.service';
import { Route, Router, ActivatedRoute, Params } from "@angular/router";
import { transAnimation } from "../animation/animation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArtistService,UserService,AlbumService, SongService],
  animations: [transAnimation]
})
export class HomeComponent implements OnInit {
	public artists: Artist[];
	public lastAlbums : Album[];
	public topSongs : Song[];
	public token: string;
	public nextPage;
	public prePage;
	public pageDefault: string;
	public url: string;
	public gender: string;

  	constructor(
		private _artistService: ArtistService,
		private _userService: UserService,
		private _albumService: AlbumService,
		private _songService: SongService,
		private _route: ActivatedRoute
	) { 
		this.pageDefault = "1";
		this.token = this._userService.getTokenInLocalStorage();
		this.url = GLOBAL.url;
		this.gender =  this._route.snapshot.params.gender;
	}

	ngOnInit() {
		this.getArtists();
		this.getLastAlbums();
		this.getTopSongs();
		
	}

	getArtists(){
		this._route.params.forEach((param : Params) => {
			let page  = param['page'];
			if(!page){
				page = "1";
			}
			
			this.prePage = parseInt(page) - 1;
			this.nextPage = parseInt(page) + 1;
			
			if(this.prePage == 0){
				this.prePage = 1;
			}

			this._artistService.getArtists(this.token,page,"4").subscribe(
				response => {
					if(response.artists){
						this.artists = response.artists.docs;
						if(response.artists.pages){
							if(parseInt(response.artists.pages) == parseInt(response.artists.page)){
								this.nextPage = false;
							}
						}
					}
				},
				error => {
					console.log(error);
				}
			)
		})
	}

	getLastAlbums(){
		this._albumService.getLastAlbums(this.token,"6").subscribe(
			response => {
				if(response.album){
					this.lastAlbums = response.album;
				}
			},
			error => {
				console.log(error);
			}
		)
	}

	getTopSongs(){
		this._songService.getTopSongs(this.token).subscribe(
			response => {
				if(response.count){
					
					let array = [];
					for (let i = 0; i < response.count.length; i++) {
						let sg = response.count[i].song;
						if(response.count[i].artist){
							sg.album = response.count[i].album;
							sg.album.artist = response.count[i].artist;
						}
						
						array.push(new Song(sg._id,sg.name,sg.number,sg.gender,sg.file,sg.duration,sg.album));	
					}
					this.topSongs = array;
					
				}
			},
			error => {

			}
		)
	}

}

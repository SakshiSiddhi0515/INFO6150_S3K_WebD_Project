import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Params } from "@angular/router";


import { Song } from 'src/app/models/song';
import { SongService } from 'src/app/song/song.service';
import { UserService } from 'src/app/user/user.service';
import { GLOBAL } from 'src/global';
import { transAnimation } from "../animation/animation";

@Component({
  	selector: 'app-filter',
  	templateUrl: './filter.component.html',
  	styleUrls: ['./filter.component.css'],
	providers: [SongService,UserService],
	animations: [transAnimation]
})
export class FilterComponent implements OnInit {

  	public genre:string;
	public songs: Song[];
	public token: string;
	public nextPage;
	public prePage;
	public totalPage;  
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		//private _router: Route,
		private _songService: SongService,
		private _userService: UserService
	) { 
		this.genre =  this._route.snapshot.params.gender;
		this.token = this._userService.getTokenInLocalStorage();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		
		this.getSongsByGender();
	}

	getSongsByGender(){
		this._route.params.forEach((param : Params) => {
			let page = param['page'];
			if(!page){
				page = 1;
			}

			this.nextPage = parseInt(page) + 1;
			this.prePage = parseInt(page) - 1;
			
			if(this.prePage == 0){
				this.prePage = 1;
			}
			
			this._songService.getSongsByGenre(this.token,this.genre,page).subscribe(
				response => {
					if(response.songs){
						this.songs = response.songs.docs;
						if(response.songs.pages){
							if(parseInt(response.songs.pages) == parseInt(response.songs.page)){
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

}

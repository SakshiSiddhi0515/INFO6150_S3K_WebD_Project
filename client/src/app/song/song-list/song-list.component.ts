import { Component,OnInit, TemplateRef } from "@angular/core";
import { Route,ActivatedRoute, Router, Params } from "@angular/router";

import { Song } from "../../models/song";
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { UploadService } from "../../services/upload.service";
import { MessageService } from "../../messages/message.service";
import { SongService } from "../song.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Ng7BootstrapBreadcrumbService } from 'ng7-bootstrap-breadcrumb';
import { transAnimation } from "../../animation/animation";

@Component({
    selector :'song-list',
    templateUrl:'./song-list.component.html',
    providers: [UploadService, MessageService, UserService, SongService],
    animations: [transAnimation]
})

export class SongListComponent implements OnInit{
    public token: string;
    public albumId: string;
    public nextPage:any;
    public prePage: any;
    public songs: Song[];
    public modalRef: BsModalRef;
    public idSongToDelete:string;
    public artistId: string;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService,
        private _messageService: MessageService,
        private _songService: SongService,
        private _route: ActivatedRoute,
        private _router: Router,
        private modalService: BsModalService,
        private ng7BootstrapBreadcrumbService: Ng7BootstrapBreadcrumbService
    ){
        this.token = this._userService.getTokenInLocalStorage()
        this.albumId = this._route.snapshot.params.albumId;
        this.artistId = this._route.snapshot.params.idArtist;
    }

    ngOnInit(){
        this.getSongs();
        this.idSongToDelete = null;
        console.log(this.artistId);
    }

    getSongs(){
        this._route.params.forEach((param : Params) => {
            
            this.albumId = param['id'];
			
            this._songService.getSongs(this.token, this.albumId).subscribe(
                response => {
                    if(!response.song){
                        this._messageService.sendMessage(response.message, 'danger');
                    }else{
                        if(response.song.length > 0){
                            this.songs = response.song;
                        
                            this.ng7BootstrapBreadcrumbService.updateBreadcrumbLabels({artist: this.songs[0].album.artist.name,album: this.songs[0].album.title});
                        }else{
                            this.ng7BootstrapBreadcrumbService.updateBreadcrumbLabels({artist: 'artist',album: 'album'});
                        }
                        
                    }
                },
                error => {
                    console.log(error);
                }
            )
        })
    }

    openModal(template: TemplateRef<any>, idSong: string) {
		this.idSongToDelete = idSong;
		this.modalRef = this.modalService.show(template);
    }

    confirm(){
        if(this.idSongToDelete){
            this._songService.delete(this.token,this.idSongToDelete).subscribe(
                response => {
                    if(!response.song){
                        this._messageService.sendMessage(response.message, 'danger');
                    }else{
                        this._messageService.sendMessage('Song deleted successfully', 'success');
                        this.getSongs();
                        this.idSongToDelete = null;
                    }
                },
                error => {
                    if(error.error.message){
                        this._messageService.sendMessage(error.error.message, 'danger');
                    }
                    console.log(error);
                }
            )
        }
        this.modalRef.hide();
    }

    decline(){
        this.idSongToDelete = null;
        this.modalRef.hide();
    }
}
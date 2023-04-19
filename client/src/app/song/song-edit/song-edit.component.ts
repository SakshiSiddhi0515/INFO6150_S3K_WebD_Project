import { Component,OnInit } from "@angular/core";
import { Route, ActivatedRoute, Router,Params } from "@angular/router";
import { transAnimation } from "../../animation/animation";
import { Song } from "../../models/song";
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { UploadService } from "../../services/upload.service";
import { MessageService } from "../../messages/message.service";
import { SongService } from "../song.service";
import { GLOBAL } from 'src/global';
import { Ng7BootstrapBreadcrumbService } from 'ng7-bootstrap-breadcrumb';

@Component({
    selector :'song-edit',
    templateUrl:'../song-create/song-create.component.html',
    providers: [UploadService, MessageService, UserService, SongService],
    animations: [transAnimation]
})

export class SongEditComponent implements OnInit{
    public title: string;
    public song: Song;
    public token: string;
    public url: string;
    public filesToUpload: Array<File>;
    public albumId: string;
    public idArtist:string;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService,
        private _messageService: MessageService,
        private _songService: SongService,
        private _route: ActivatedRoute,
        private _router: Router,
        private ng7BootstrapBreadcrumbService: Ng7BootstrapBreadcrumbService
    ){
        this.title = 'Edit Song';
        this.song = new Song('','',0,'','','','');
        this.token = this._userService.getTokenInLocalStorage();
        this.albumId =  this._route.snapshot.params.albumId;
        this.idArtist =  this._route.snapshot.params.idArtist;
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        this.getSong();
    }

    getSong(){
        this._route.params.forEach((param : Params) => {
            let id = param['songId'];
            console.log(id);

            this._songService.getSong(this.token,id).subscribe(
                response => {
                    if(!response.song){
                        this._messageService.sendMessage(response.message, 'danger');
                    }else{
                        this.song = response.song;
                        this.ng7BootstrapBreadcrumbService.updateBreadcrumbLabels({
                            artist: response.song.album.artist.name,
                            album:response.song.album.title,
                            song:response.song.name,
                        });
                    }
                },
                error => {
                    console.log(error);
                }
            )
        })
    }

    onSubmit(){
        
        this._songService.upload(this.token,this.song, this.song._id).subscribe(
            response => {
                if(!response.song){
                    this._messageService.sendMessage(response.message,'danger');
                }else{
                    this.song = response.song;

                    if(this.filesToUpload){
                        this._uploadService.makeFileRequest(this.url+'upload_song/'+this.song._id,[],this.filesToUpload,this.token,'file').then(
                            (result) => {
                                console.log(result);
                            },
                            (error) => {
                                console.log(error);
                            }
                        )
                    }
                        

                    this._router.navigate(['/dashboard/songs/'+this.idArtist+'/'+this.albumId]);
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    
    uploadFile(input: any){
        this.filesToUpload = <Array<File>>input.target.files;
    }

}
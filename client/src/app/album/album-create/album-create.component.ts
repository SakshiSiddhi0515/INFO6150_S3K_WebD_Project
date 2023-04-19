import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Album } from "../../models/album";
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { AlbumService } from "../album.service";
import { MessageService } from "../../messages/message.service";
import { UploadService } from "../../services/upload.service";
import { GLOBAL } from 'src/global';
import { transAnimation } from "../../animation/animation";
@Component({
    selector: 'album-create',
    templateUrl: './album-create.component.html',
    providers : [ UserService,AlbumService,MessageService,UploadService ],
    animations: [transAnimation]
})

export class AlbumCreateComponent implements OnInit {
    public album : Album;
    public token : string;
    public user: string;
    public title: string;
    public albumImg: any;
    public artistId: string;
    public filesToUpload: Array<File>;
    public url:string;

    constructor(
        private _albumService: AlbumService,
        private _userService: UserService,
        private _messageService: MessageService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ){
        this.token = _userService.getTokenInLocalStorage();
        this.user = _userService.getUserLogged();
        this.title = 'Create Album';
        this.albumImg = 'assets/images/default-user-image.png';
        this.album = new Album('','',1900,'','');
        this.artistId = this._route.snapshot.params.idArtist;
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log(this.artistId);
    }

    onSubmit(){
        this.album.artist = this.artistId;
        this._albumService.saveAlbum(this.token,this.album).subscribe(
            response => {
                if(!response.album){
                    this._messageService.sendMessage(response.album, 'danger');
                }else{
                    this.album = response.album;
                    this._uploadService.makeFileRequest(this.url+'album_upload_image/'+this.album._id,[],this.filesToUpload,this.token,'image').then(
                        (result) => {
                                
                        },
                        (error) => {
                            console.log(error);
                        }
                        
                    )
                    this._router.navigate(['dashboard/albums/'+this.artistId]);    
                    
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    selectImage(){
        document.getElementById("inputImage").click();
    }

    preview(files) {
        if (files.length === 0)
          return;
     
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          this._messageService.sendMessage("Only images are supported.","danger");
          return;
        }
     
        var reader = new FileReader();
        this.albumImg = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
            this.albumImg = reader.result; 
        }
	}

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.preview(fileInput.target.files);
	}
}
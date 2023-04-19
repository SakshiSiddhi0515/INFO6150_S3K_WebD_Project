import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ArtistService } from "../artist.service";
import { User } from "../../models/user";
import { Artist } from "../../models/artist";
import { MessageService } from '../../messages/message.service';
import { UserService } from "../../user/user.service";
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from 'src/global';
import { transAnimation } from "../../animation/animation";

@Component({
    selector : 'artist-create',
    templateUrl : './artist-create.component.html',
    providers: [ArtistService, MessageService, UserService, UploadService],
    animations: [transAnimation]
})

export class ArtistCreateComponent implements OnInit {
    public artist : Artist;
    public token : string;
    public title: string;
    public artistImg: any;
    public filesToUpload: Array<File>;
    public url: string;

    constructor(
        private _artistService: ArtistService,
        private _userService: UserService,
        private _messageService: MessageService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Create Artist';
        this.artist = new Artist('','','','');
        this.token = this._userService.getTokenInLocalStorage();
        this.artistImg = 'assets/images/default-user-image.png';
        this.url = GLOBAL.url;
        
    }

    ngOnInit(){
        
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
        this.artistImg = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
            this.artistImg = reader.result; 
        }
	}

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.preview(fileInput.target.files);
	}

    selectImage(){
        document.getElementById("inputImage").click();
    }

    onSubmit(){
        this._artistService.saveArtist(this.token, this.artist).subscribe(
            response => {
                if(!response.artist){
                    this._messageService.sendMessage(response.message, 'danger');
                }else{
                    this.artist = response.artist
                    if(this.filesToUpload){
                        this._uploadService.makeFileRequest(this.url+'uploadArtistImg/'+this.artist._id,[],this.filesToUpload,this.token,'image').then(
                            (result) => {
                                this._router.navigate(['dashboard/artists']);        
                            },
                            (error) => {
                                console.log(error);
                            }
                        )
                    }else{
                        this._router.navigate(['dashboard/artists']);
                    }
                    this._messageService.sendMessage('Artist created successfully', 'success');
                }
            },
            error => {
                console.log(error);
            }
        )
    }

}
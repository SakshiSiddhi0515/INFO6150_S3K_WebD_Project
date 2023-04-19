import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";

import { Artist } from "../../models/artist";
import { ArtistService } from '../artist.service';
import { MessageService } from '../../messages/message.service';
import { UserService } from '../../user/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from 'src/global';
import { Ng7BootstrapBreadcrumbService } from 'ng7-bootstrap-breadcrumb';
import { transAnimation } from "../../animation/animation";

@Component({
    selector : 'artist-edit',
    templateUrl : '../artist-create/artist-create.component.html',
    providers : [ ArtistService, MessageService, UserService, UploadService ],
    animations: [transAnimation]
})

export class ArtistEditComponent implements OnInit{
    public token:string;
    public artist: Artist;
    public title:string;
    public artistImg: any;
    public filesToUpload: Array<File>;
    public url;

    constructor(
        private _artistService: ArtistService,
        private _messageService: MessageService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService,
        private ng7BootstrapBreadcrumbService: Ng7BootstrapBreadcrumbService
    ){
        this.token = _userService.getTokenInLocalStorage();
        this.artist = new Artist('','','','');
        this.title = 'Edit artist';
        this.artistImg = 'assets/images/default-user-image.png';
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        this.getArtist();
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

    getArtist(){
        this._route.params.forEach((param : Params) => {
            let id = param['id'];
            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if(response.artist){
                        this.artist = response.artist;
                        this.ng7BootstrapBreadcrumbService.updateBreadcrumbLabels({artist: response.artist.name});
                        if(this.artist.image){
                            this.artistImg = this.url+'getImageArtist/'+this.artist.image;
                        }
                    }
                },
                error => {
                    console.log(error);
                }
            )
        })
    }

    onSubmit(){
        this._artistService.updateArtist(this.token,this.artist._id,this.artist).subscribe(
            response =>{
                if(response.artist){
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
                    this._messageService.sendMessage('Artist successfully updated','success');
                }else{
                    this._messageService.sendMessage(response.message,'danger');
                }
            },
            error =>{
                console.log(error);
            }
        )
    }

}
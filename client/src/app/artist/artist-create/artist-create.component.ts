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
import { HttpClient } from "@angular/common/http";

@Component({
    selector : 'artist-create',
    templateUrl : './artist-create.component.html',
    styleUrls: ['./artist-create.component.css'],
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
    selectedFile: any;

    constructor(
        private _artistService: ArtistService,
        private _userService: UserService,
        private _messageService: MessageService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router,
        private http: HttpClient
    ){
        this.title = 'Create Artist';
        this.artist = new Artist('','','','','');
        this.token = this._userService.getTokenInLocalStorage();
        this.artistImg = 'assets/images/default-user-image.png';
        this.url = GLOBAL.url;
        
    }

    ngOnInit(){
        
    }

    preview() {
        if (!this.selectedFile || !this.selectedFile.name) 
          return;
     
        var mimeType = this.selectedFile.type;
        if (mimeType.match(/image\/*/) == null) {
          this._messageService.sendMessage("Only images are supported.","danger");
          return;
        }
     
        var reader = new FileReader();
        this.artistImg = this.selectedFile;
        reader.readAsDataURL(this.selectedFile); 
        reader.onload = (_event) => { 
            this.artistImg = reader.result; 
        }
	}

    fileChangeEvent(fileInput: any){
        // this.filesToUpload = <Array<File>>fileInput.target.files;
        // this.selectedFile = fileInput.target.files[0];
        this.selectedFile = fileInput.target.files[0];
        this.preview();
	}

    selectImage(){
        document.getElementById("inputImage").click();
    }

    onSubmit(form: HTMLFormElement){
        this.onUpload();
        form.preventDefault(); // Prevent form submission
        this.artist.artistPicSrc = this.selectedFile ? this.selectedFile.name : '';
        this._artistService.saveArtist(this.token, this.artist).subscribe(
            response => {
                if(!response.artist){
                    this._messageService.sendMessage(response.message, 'danger');
                }else{
                    this.artist = response.artist
                    if(this.selectedFile){
                        this._uploadService.makeFileRequest(this.url+'uploadArtistImg/'+this.artist._id,[],this.filesToUpload,this.token,'image').then(
                            (result) => {
                                // this.onUpload();
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

    // onUpload() {
    //     const formData = new FormData();
    //     formData.append('file', this.selectedFile);
    //     this.http.post('http://localhost:3000/upload', formData).subscribe(
    //       (response) => console.log(response),
    //       (error) => console.log(error)
    //     );
    // }

    onUpload() {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.http.post('http://localhost:3000/upload', formData).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }
    

}
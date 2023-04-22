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
import { HttpClient } from "@angular/common/http";
@Component({
    selector: 'album-create',
    templateUrl: './album-create.component.html',
    styleUrls: ['./album-create.component.css'],
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
    selectedFile: any;
    // public baseUrl = '../../../assets/localSongs/'

    constructor(
        private _albumService: AlbumService,
        private _userService: UserService,
        private _messageService: MessageService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService,
        private http: HttpClient
    ){
        this.token = _userService.getTokenInLocalStorage();
        this.user = _userService.getUserLogged();
        this.title = 'Create Album';
        this.albumImg = 'assets/images/default-user-image.png';
        this.album = new Album('','',1900,'','','');
        this.artistId = this._route.snapshot.params.idArtist;
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log(this.artistId);
    }

    onSubmit(){
        this.onUpload();
        this.album.artist = this.artistId;
        this.album.albumPicSrc = this.selectedFile.name;
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

    preview() {
        if (!this.selectedFile || !this.selectedFile.name)
          return;
     
        var mimeType = this.selectedFile.type;
        if (mimeType.match(/image\/*/) == null) {
          this._messageService.sendMessage("Only images are supported.","danger");
          return;
        }
     
        var reader = new FileReader();
        this.albumImg = this.selectedFile;
        reader.readAsDataURL(this.selectedFile); 
        reader.onload = (_event) => { 
            this.albumImg = reader.result; 
        }
	}

    fileChangeEvent(fileInput: any){
        // this.filesToUpload = <Array<File>>fileInput.target.files;
        // this.preview(fileInput.target.files);
        this.selectedFile = fileInput.target.files[0];
        this.preview();

	}

    onUpload() {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.http.post('http://localhost:3000/upload', formData).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }
}
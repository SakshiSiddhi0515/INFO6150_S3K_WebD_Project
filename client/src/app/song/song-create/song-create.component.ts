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
import { HttpClient } from "@angular/common/http";

@Component({
    selector :'song-create',
    templateUrl:'./song-create.component.html',
    providers: [UploadService, MessageService, UserService, SongService],
    animations: [transAnimation]
})

export class SongCreateComponent implements OnInit{
    public title: string;
    public song: Song;
    public token: string;
    public albumId: string;
    public url: string;
    public filesToUpload: Array<File>;
    public idArtist:string;
    selectedFile: File;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService,
        private _messageService: MessageService,
        private _songService: SongService,
        private _route: ActivatedRoute,
        private _router: Router,
        private http: HttpClient
    ){
        this.title = 'Create Song';
        this.song = new Song('','',0,'','','','','');
        this.token = this._userService.getTokenInLocalStorage();
        this.albumId =  this._route.snapshot.params.albumId;
        this.idArtist =  this._route.snapshot.params.idArtist;
        this.url = GLOBAL.url;
    }

    ngOnInit(){

    }

    onSubmit(){
        this.onUpload();
        this.song.album = this.albumId;
        this.song.songName = this.selectedFile.name;
        console.log(this.song);
        this._songService.save(this.token,this.song).subscribe(
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

                    // if(this.filesToUpload){
                    //     const formData = new FormData();
                    //     formData.append('file', this.filesToUpload[0], this.filesToUpload[0].name);
              
                    //     fetch('http://localhost:3789/upload?folderPath=C:\Users\kunal\OneDrive\Desktop\msc-ng-node-mongo\client\musicFiles', {
                    //       method: 'POST',
                    //       body: formData
                    //     }).then(response => {
                    //       console.log('File uploaded successfully.');
                    //     }).catch(error => {
                    //       console.error('Error occurred while uploading the file.');
                    //     });
                    //   }
                        

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

    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
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
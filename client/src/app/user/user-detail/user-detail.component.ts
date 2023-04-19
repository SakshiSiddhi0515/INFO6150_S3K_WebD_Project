import { Component, OnInit,SecurityContext  } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Route, Router, Params, ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/global';
import { MessageService } from 'src/app/messages/message.service';
import { transAnimation } from "../../animation/animation";

@Component({
    selector: 'user-detail',
    templateUrl: '../user-edit/user-edit.component.html',
    providers: [UserService, UploadService, MessageService],
    animations: [transAnimation]
})

export class UserDetailComponent implements OnInit{
    
    public user: User;
    public userLogged;
    public filesToUpload : Array<File>;
    public message: string;
    public token;
    public url;
    public alerts: any[];
    public userImg: any;
    public buttonTitle: string;
    public title:string;
    public detailProfile: boolean;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router,
        sanitizer: DomSanitizer,
        private _messageService: MessageService
    ){
        this.url = GLOBAL.url;
        this.token = this._userService.getTokenInLocalStorage();
        this.userLogged = this._userService.getUserLogged();
        this.userImg = 'assets/images/default-user-image.png';
        this.buttonTitle = 'Edit';
        this.title = 'User';
        this.detailProfile = true;
    }
    
    ngOnInit(){
        
        this.getUser();
    }

    getUser(){

        this._userService.getUser(this.userLogged._id).subscribe(
            response => {
                console.log(response.user);
                if(!response.user){

                }else{
                    this.user = response.user;
                    if(this.user.image){
                        this.userImg = this.url+'user/get_image_profile/'+this.user.image; 
                    }
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    selectImage(){
        document.getElementById("inputImageUser").click();
    }

    changeImg(data: any){
        if(data.file){
            this.userImg = this.url+'user/get_image_profile/'+data.file+'/true';
        }
    }

    preview(files) {
        if (files.length === 0)
          return;
     
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          
          this._messageService.sendMessage("Only images are supported.", "danger");
          return;
        }
     
        var reader = new FileReader();
        this.userImg = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
            this.userImg = reader.result; 
        }
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.preview(fileInput.target.files);
    }

    onSubmit(){
        this._userService.updateUser(this.user._id, this.user).subscribe(
            response => {
                if(!response.user){
                    this._messageService.sendMessage("Error", "danger");
                }else{
                    if(this.filesToUpload){
                        this._uploadService.makeFileRequest(this.url+'user/upload_image/'+this.user._id,[],this.filesToUpload,this.token,'image').then(
                            (result) => {
                                //this._messageService.sendMessage("Profile successfully edited", "success");
                                
                            },
                            (error) =>{
                                console.log(error);
                                this._messageService.sendMessage("Error uploading the file", "danger");
                            }
                        )
                    }
                    this._messageService.sendMessage("Profile successfully edited", "success");
                }
            },
            error =>{
                console.log(error);
                this._messageService.sendMessage("Error uploading the file", "danger");
            }
        )
    }
}
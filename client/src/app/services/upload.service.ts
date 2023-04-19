import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { catchError,map,tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { GLOBAL } from 'src/global';
import { MessageService } from "../messages/message.service";

@Injectable()

export class UploadService{
    public url: string;
    
    constructor(
        private _http: HttpClient,
        private _messageService: MessageService
    ){
        this.url = GLOBAL.url;    
    }

    makeFileRequest(url : string, params : Array<string>, files : Array<File>, token : string, name : string){       
        return new Promise(function(resolve, reject){
            let formData:any = new FormData();
            let xhr = new XMLHttpRequest();

            for(let i = 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open("POST",url , true);
            xhr.setRequestHeader("Authorization", token);
            xhr.send(formData);
        })
    }


}
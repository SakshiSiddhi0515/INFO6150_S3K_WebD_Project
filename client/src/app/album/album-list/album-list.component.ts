import { Component, OnInit,TemplateRef } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Album } from "../../models/album";
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { AlbumService } from "../album.service";
import { MessageService } from "../../messages/message.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Ng7BootstrapBreadcrumbService } from 'ng7-bootstrap-breadcrumb';
import { transAnimation } from "../../animation/animation";

@Component({
    selector: 'album-list',
    templateUrl: './album-list.component.html',
    styleUrls: ['./album-list.component.css'],
    providers : [ UserService,AlbumService,MessageService ],
    animations: [transAnimation]
})

export class AlbumListComponent implements OnInit {
    public album : Album;
    public albums : Album[];
    public token : string;
    public nextPage;
    public prePage;
    public artistId: string;
    public idAlbumToDelete: string;
    public modalRef: BsModalRef;
    public page: number;
    public totalRows: number;

    constructor(
        private _userService: UserService,
        private _albumService: AlbumService,
        private _router: Router,
        private _route : ActivatedRoute,
        private _messageService: MessageService,
        private modalService: BsModalService,
        private ng7BootstrapBreadcrumbService: Ng7BootstrapBreadcrumbService
    ){
        this.token = _userService.getTokenInLocalStorage();
        this.idAlbumToDelete = null;
        this.totalRows = 0;
        this.page = 1;
        this.artistId = this._route.snapshot.params.id;
    }

    ngOnInit(){
        this.getAlbums();
    }

    getAlbums(){
        this._albumService.getAlbums(this.token, this.artistId,this.page.toString(),null).subscribe(
            response => {
                if(!response.album){
                    this._messageService.sendMessage(response.message,'danger');
                }else{
                    if(response.album.docs.length > 0){
                        this.totalRows = response.album.total;
                        this.albums = response.album.docs;
                        this.ng7BootstrapBreadcrumbService.updateBreadcrumbLabels({artist: this.albums[0].artist.name });
                    }else{
                        this.ng7BootstrapBreadcrumbService.updateBreadcrumbLabels({artist: 'Artists' });
                    }
                    
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    openModal(template: TemplateRef<any>, idAlbum: string) {
		this.idAlbumToDelete = idAlbum;
		this.modalRef = this.modalService.show(template);
    }

    confirm(){
        if(this.idAlbumToDelete){
            this._albumService.deleteAlbum(this.token,this.idAlbumToDelete).subscribe(
                response => {
                    if(!response.album){
                        this._messageService.sendMessage(response.message, 'danger');
                    }else{
                        this._messageService.sendMessage('The album has been removed correctly', 'success');
                    }
                    this.getAlbums();
                },
                error => {
                    console.log(error);
                }
            )
            this.modalRef.hide();
        }
    }

    decline(){
        this.idAlbumToDelete = null;
        this.modalRef.hide();
    }

    pageChanged(event: any): void {
        this.page = event.page;
        this.getAlbums();
    }

}
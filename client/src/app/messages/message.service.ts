import { Injectable } from '@angular/core';
import { Observable,Subject} from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class MessageService {
    public subject = new Subject<any>();

    sendMessage(message: string, type:string) {
        this.subject.next({ text: message, type:type });
    }

    clear() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
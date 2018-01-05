import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { IComment } from "../models/IComment";

@Injectable()
export class CommentService {
    constructor(private _http: HttpClient) { }

    private _baseUrl = 'http://localhost:9001';

    public getCommentsByPostId(postId: number): Observable<IComment[]> {
        return <Observable<IComment[]>>this._http.get(`${this._baseUrl}/posts/${postId}/comments`);
    }

    public onAddReplyByPostId(reply: IComment): Observable<IComment> {
        return <Observable<IComment>>this._http.post(`${this._baseUrl}/posts/${reply.postId}/comments`, reply);
    }
}

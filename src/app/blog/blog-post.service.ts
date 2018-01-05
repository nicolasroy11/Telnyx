import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { IBlogPost } from "../models/IBlogPost";

@Injectable()
export class BlogPostService {
    constructor(private _http: HttpClient) { }

    private _baseUrl = 'http://localhost:9001';

    public getAll(): Observable<IBlogPost[]> {
        return <Observable<IBlogPost[]>>this._http.get(`${this._baseUrl}/posts`);
    }

    public getById(id: number): Observable<IBlogPost> {
        const postsObservable = <Observable<IBlogPost[]>>this._http.get(`${this._baseUrl}/posts`);
        return postsObservable.map(posts => posts.filter(post => post.id === id)[0]);
    }
}

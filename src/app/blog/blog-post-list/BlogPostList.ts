/**
 * @overview Blog Post List page.  Renders Posts ordered by date from local API
 */
import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../blog-post.service';

import template from './blog-post-list.html';
import { Router } from '@angular/router';
import { IBlogPost } from '../../models/IBlogPost';

@Component({
    selector: 'blog-post-list',
    template,
})
export class BlogPostListComponent implements OnInit {
    public blogPosts: IBlogPost[];
    public constructor(private _blogService: BlogPostService, private _router: Router) { }

    public ngOnInit() {
        this.getBlogPosts();
    }

    public getBlogPosts() {
        this._blogService.getAll().subscribe((res: IBlogPost[]) => {
            this.blogPosts = this._sortByString(res, 'publish_date', true);
        });
    }

    public onPostSelected(postId: number): void {
        this._router.navigate([this._router.url, postId]);
    }

    private _sortByString(array: any[], string: string, inverse: boolean = false) {
        array.sort(function (a: any, b: any) {
            const A = a[string];
            const B = b[string];
            const polarity: number = inverse ? -1 : 1;
            return (A < B) ? (-1 * polarity) : (A > B) ? polarity : 0;
        });
        return array;
    }
}

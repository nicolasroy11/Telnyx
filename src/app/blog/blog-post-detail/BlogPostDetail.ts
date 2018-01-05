/**
 * @overview Blog Post Detail page.  Render a single post fectched by id
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogPostService } from '../blog-post.service';

import template from './blog-post-detail.html';
import { ActivatedRoute } from '@angular/router';
import { IBlogPost } from '../../models/IBlogPost';
import { IComment } from '../../models/IComment';
import { CommentSectionComponent } from './comment-section/CommentSection';

@Component({
    selector: 'blog-post-detail',
    template,
})
export class BlogPostDetailComponent implements OnInit {
    @ViewChild('commentSection') public commentSection: CommentSectionComponent;
    public testString: string = 'test test';
    public post: IBlogPost;
    public comments: IComment[];
    public postId: number;
    public constructor(private _blogService: BlogPostService, private _activatedRoute: ActivatedRoute) { }

    public ngOnInit() {
        this._activatedRoute.params.subscribe((params) => {
            this.postId = +params['id'];
            this._blogService.getById(this.postId).subscribe((res: IBlogPost) => {
                this.post = res;
            });
        });
    }

    public onClickedReply(): void {
        this.commentSection.onClickedReply();
    }
}

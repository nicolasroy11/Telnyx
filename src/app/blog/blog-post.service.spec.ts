/**
 * @overview Jasmine test for Blog Post List.
 *
 * @see {@link https://jasmine.github.io/2.8/introduction}
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { BlogPostService } from './blog-post.service';
import { IComment } from '../models/IComment';

describe('Service: CommentService', () => {
    let service: CommentService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CommentService, BlogPostService]
        });
        service = TestBed.get(CommentService);
    });

    it('should post a new comment', () => {
        const dummyComment: IComment = {
            id: 999,
            postId: 1,
            parent_id: null,
            user: 'me',
            date: '3000-01-01',
            content: 'test comment',
        }

        service.onAddReplyByPostId(dummyComment).subscribe((res) => {
            expect(res).toBeTruthy();
            expect(res.postId).toEqual(1);
        });
    });
})
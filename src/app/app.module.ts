/// <reference path='../../declarations.d.ts'/>

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';

import { AppComponent } from './app.component';
import { NavigationComponent } from './Navigation';
import AboutComponent from './about';
import HomeComponent from './home';
import { BlogPostListComponent } from './blog/blog-post-list/BlogPostList';
import { BlogPostService } from './blog/blog-post.service';
import { HttpClientModule } from '@angular/common/http';
import { BlogPostDetailComponent } from './blog/blog-post-detail/BlogPostDetail';
import { CommentSectionComponent } from './blog/blog-post-detail/comment-section/CommentSection';
import { CommentService } from './blog/comment.service';
import { CommentDialog } from './blog/blog-post-detail/comment-section/comment-dialog/CommentDialog';
import { FormsModule } from '@angular/forms';

const routing = RouterModule.forRoot([
  {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'blog',
    component: BlogPostListComponent
  },
  {
    path: 'blog/:id',
    component: BlogPostDetailComponent
  }, {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
]);

@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TreeModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    HomeComponent,
    BlogPostListComponent,
    BlogPostDetailComponent,
    CommentSectionComponent,
    CommentDialog
  ],
  providers: [
    BlogPostService,
    CommentService
  ],
  entryComponents: [
    CommentDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

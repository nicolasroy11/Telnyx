import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import template from './comment-dialog.html';

@Component({
    selector: 'comment-dialog',
    template,
  })
  export class CommentDialog {
      public message: string;
  
    constructor(
      public dialogRef: MatDialogRef<CommentDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onCancelClick(): void {
      this.dialogRef.close();
    }

    onReturnMessage() {
        this.dialogRef.close(this.message);
    }
  
  }
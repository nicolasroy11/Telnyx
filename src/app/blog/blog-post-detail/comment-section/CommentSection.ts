/**
 * @overview About page.  Renders the comment section.
 */
import { Component, Input, OnInit, ViewChild } from '@angular/core';


import template from './comment-section.html';
import { TreeComponent } from 'angular-tree-component';
import { TreeNode } from 'angular-tree-component/dist/defs/api';
import { IComment } from '../../../models/IComment';
import { TreeNodeCommentDataModel } from '../../../models/TreeNodeCommentDataModel';
import { CommentService } from '../../comment.service';
import { MatDialog } from '@angular/material';
import { CommentDialog } from './comment-dialog/CommentDialog';

@Component({
    selector: 'comment-section',
    template,
})
export class CommentSectionComponent implements OnInit {
    @ViewChild('Tree') tree: TreeComponent;
    @Input() public postId: number;
    @Input() public comments: IComment[];
    public options = {
        nodeHeight: 60,
        allowDrag: false,
        allowDrop: false,
        animateExpand: true,
        scrollOnActivate: true,
        animateSpeed: 30,
        animateAcceleration: 1.2
    }
    public nodes: TreeNode[];

    public constructor(private _commentService: CommentService, private dialog: MatDialog) { }

    public ngOnInit() {
        this._commentService.getCommentsByPostId(this.postId).subscribe((coms) => {
            this.comments = this._sortByString(coms, 'date', false);
            this.nodes = this._buildCommentTree();
        });
    }

    public onTreeLoad() {
        this.tree.treeModel.expandAll();
    }

    public onClickedReply(parentCommentId?: number) {
        this.createReply(this.postId, parentCommentId);
    }

    public createReply(postId: number, parentCommentId?: number): void {
        let dialogRef = this.dialog.open(CommentDialog, { width: '250px', data: { name: 'test' } });
        dialogRef.afterClosed().subscribe(msg => {
            if (msg) {
                const d = new Date(),
                    curr_date = `0${d.getDate().toString().slice(-2)}`,
                    curr_month = `0${(d.getMonth() + 1).toString().slice(-2)}`,
                    curr_year = d.getFullYear().toString(),
                    date = `${curr_year}-${curr_month}-${curr_date}`;
                const reply: IComment = {
                    postId: postId,
                    content: msg,
                    parent_id: parentCommentId,
                    user: 'me',
                    date
                };
                this._commentService.onAddReplyByPostId(reply).subscribe(
                    () => {},
                    (err) => { console.log(err); },
                    () => { }
                );
            }
        });
    }

    private _buildCommentTree() {
        const tempHash_id_to_comment: { [id: number]: IComment } = {};
        const tempHash_parentId_to_childCommentIds: { [parentId: number]: number[] } = {};
        const rootCommentNodes = new Array<TreeNodeCommentDataModel>();

        // build temp hashes
        for (let i = 0; i < this.comments.length; i++) {
            tempHash_id_to_comment[this.comments[i].id] = this.comments[i];
            if (this.comments[i].parent_id) {
                if (!tempHash_parentId_to_childCommentIds[this.comments[i].parent_id]) {
                    tempHash_parentId_to_childCommentIds[this.comments[i].parent_id] = []
                }
                tempHash_parentId_to_childCommentIds[this.comments[i].parent_id].push(this.comments[i].id);
            } else {
                const rootNode = new TreeNodeCommentDataModel();
                rootNode.id = this.comments[i].id;
                rootNode.name = this.comments[i].content;
                rootNode.commentModel = this.comments[i];
                rootCommentNodes.push(rootNode);
            }
        }

        // build sibling tree node data groups from tempHash_parentId_to_childCommentIds
        const siblingNodesGroupedByParentId: { [parentId: string]: TreeNodeCommentDataModel[] } = {};
        for (const parentId in tempHash_parentId_to_childCommentIds) {
            if (tempHash_parentId_to_childCommentIds.hasOwnProperty(parentId)) {
                const siblingIdGroup: number[] = tempHash_parentId_to_childCommentIds[parentId];
                siblingNodesGroupedByParentId[parentId] = new Array<TreeNodeCommentDataModel>();
                for (let i = 0; i < siblingIdGroup.length; i++) {
                    const nodeId: number = siblingIdGroup[i];
                    const treeNode = new TreeNodeCommentDataModel();
                    treeNode.id = nodeId;
                    treeNode.name = tempHash_id_to_comment[nodeId].content;
                    treeNode.commentModel = tempHash_id_to_comment[nodeId];
                    siblingNodesGroupedByParentId[parentId].push(treeNode);
                }
            }
        }

        // recursively scaffold the tree hierarchy from sibling tree node data groups
        for (let i = 0; i < rootCommentNodes.length; i++) {
            rootCommentNodes[i].children = siblingNodesGroupedByParentId[rootCommentNodes[i].id];
            if (rootCommentNodes[i].children) {
                populateChildren(rootCommentNodes[i].children);
            }
        }
        function populateChildren(children: TreeNodeCommentDataModel[]) {
            for (let i = 0; i < children.length; i++) {
                const child: TreeNodeCommentDataModel = children[i];
                if (siblingNodesGroupedByParentId[child.id]) {
                    child.children = siblingNodesGroupedByParentId[child.id];
                    populateChildren(child.children);
                }
            }
        }

        return rootCommentNodes;
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

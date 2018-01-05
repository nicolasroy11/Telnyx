import { IComment } from "./IComment";

export class TreeNodeCommentDataModel {
    id: number;
    name: string;
    commentModel: IComment;
    children: any[];
}
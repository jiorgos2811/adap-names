import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        // precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(baseName,"Should not be null or undefined");
        super(baseName, parent);
    }

    public open(): void {
        //precondition
        IllegalArgumentException.assertCondition(this.doGetFileState() === FileState.CLOSED, "You can only open a closed files");
        // do something
    }

    public close(): void {
        //precondition
        IllegalArgumentException.assertCondition(this.doGetFileState() === FileState.OPEN, "You can only close an open files");
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}
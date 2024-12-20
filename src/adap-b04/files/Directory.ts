import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        // precondition
        IllegalArgumentException.assert(bn != null && bn != undefined,"Should not be null or undefined");
        super(bn, pn);
    }

    public add(cn: Node): void {
        //precondition
        IllegalArgumentException.assert(!this.childNodes.has(cn), "Child node already exists");
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        //precondition
        IllegalArgumentException.assert(this.childNodes.has(cn),"Child node does not exist yet and can't be removed");
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

}
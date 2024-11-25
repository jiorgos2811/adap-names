import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        // precondition
        IllegalArgumentException.assert(bn != null && bn != undefined,"Should not be null or undefined");
        super(bn, pn);

        if (tn != undefined) {
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        //precondition
        IllegalArgumentException.assert(target != null && target != undefined,"Should not be null or undefined");
        this.targetNode = target;
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void {
        //precondition
        IllegalArgumentException.assert(bn != null && bn != undefined,"Should not be null or undefined");
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        //precondition
        IllegalArgumentException.assert(target != null && target != undefined,"Should not be null or undefined");
        const result: Node = this.targetNode as Node;
        return result;
    }
}
import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        //precondition
        IllegalArgumentException.assert(bn != null && bn != undefined,"Should not be null or undefined");
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.add(this);
    }

    public move(to: Directory): void {
        //precondition
        IllegalArgumentException.assert(to != null && to != undefined,"Should not be null or undefined");
        this.parentNode.remove(this);
        to.add(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        //precondition
        IllegalArgumentException.assert(bn != null && bn != undefined,"Should not be null or undefined");
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        //precondition
        IllegalArgumentException.assert(bn != null && bn != undefined,"Should not be null or undefined");
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

}

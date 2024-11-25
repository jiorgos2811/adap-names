import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(bn);
        this.doSetBaseName(bn);
        this.parentNode = pn;
    }

    public move(to: Directory): void {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(to);
        this.parentNode.remove(this);
        to.add(this);
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
        IllegalArgumentException.assertIsNotNullOrUndefined(bn);
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(bn);
        this.baseName = bn;
    }

    public getParentNode(): Node {
        return this.parentNode;
    }

}

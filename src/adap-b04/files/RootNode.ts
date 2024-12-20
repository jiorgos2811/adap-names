import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        //precondition
        IllegalArgumentException.assert(to != null && to != undefined, "Target directory must not be null or undefined");
        // null operation
    }

    protected doSetBaseName(bn: string): void {
        //precondition
        IllegalArgumentException.assert(bn != null && bn != undefined, "Base name must not be null or undefined");
        // null operation
    }

}
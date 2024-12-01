import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { Exception } from "../common/Exception";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
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
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        const matches = new Set<Node>();
        const stack: Node[] = [this]; //use a stack for iterative traversal
    
        try {
            
            while (stack.length > 0) {
                const currentNode = stack.pop() as Node;
    
                //assert invariants
                currentNode.assertClassInvariants();
    
                //check if the current node matches
                if (currentNode.doGetBaseName() === bn) {
                    matches.add(currentNode);
                }
    
                //if Directory, add children to stack
                if (currentNode instanceof Directory) {
                    const directory = currentNode as Directory;
                    directory.getChildNodes().forEach(child => stack.push(child));
                }
            }
        } catch (error) {
            throw new ServiceFailureException("Error while finding nodes", error as Exception);
        }
    
        return matches;
    }

}

import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        //precondition
        IllegalArgumentException.assert(
            other != null && other != undefined,
            "Component array cannot be null"
        );
        IllegalArgumentException.assert(
            other.every(component => component !== null && component !== undefined),
            "All components must be non-null"
        );
        
        super(delimiter);
        this.components = other; 
        
        //postcondition
        MethodFailedException.assert(
            this.getNoComponents() === other.length,
            "Number of components must match input array length"
        );
        this.assertInvariant();
    }

    public getNoComponents(): number {
        const count = this.components.length;
        
        //postcondition
        MethodFailedException.assert(
            count >= 0,
            "Component count must be non-negative"
        );
        return count;
    }

    public getComponent(i: number): string {
        //precondition
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );

        const result = this.components[i];
        
        //postcondition
        MethodFailedException.assert(
            result != null && result != undefined,
            "Retrieved component cannot be null"
        );
        return result;
    }

    public setComponent(i: number, c: string) {
        //precondition
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );
        IllegalArgumentException.assert(
            c != null && c != undefined,
            "Component cannot be null"
        );

        this.components[i] = c;
        
        //postcondition
        MethodFailedException.assert(
            this.components[i] === c,
            "Component was not set correctly"
        );
        this.assertInvariant();

    }

    public insert(i: number, c: string) {
        //precondition
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );
        IllegalArgumentException.assert(
            c != null && c != undefined,
            "Component cannot be null"
        );

        const oldLength = this.components.length;
        this.components.splice(i, 0, c);
        
        // Postconditions
        MethodFailedException.assert(
            this.components.length === oldLength + 1,
            "Array length must increase by 1"
        );
        MethodFailedException.assert(
            this.components[i] === c,
            "Inserted component must match input"
        );
        this.assertInvariant();
    }

    public append(c: string) {
        IllegalArgumentException.assert(
            c != null && c != undefined,
            "Component cannot be null"
        );
        const oldLength = this.components.length;
        this.components.push(c);
        
        //postcondition
        MethodFailedException.assert(
            this.components.length === oldLength + 1,
            "Array length must increase by 1"
        );
        MethodFailedException.assert(
            this.components[this.components.length - 1] === c,
            "Appended component must match input"
        );
        this.assertInvariant();
    }

    public remove(i: number) {
        //precondition
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );
        const oldLength = this.components.length;
        const removedComponent = this.components[i];
        this.components.splice(i, 1);
        
        // Postconditions
        MethodFailedException.assert(
            this.components.length === oldLength - 1,
            "Array length must decrease by 1"
        );
        MethodFailedException.assert(
            !this.components.includes(removedComponent) || 
            this.components.indexOf(removedComponent) !== i,
            "Component must be removed from specified position"
        );
        this.assertInvariant();
    }

    //Checks if initialized in order to avoid infinite calls with assertInvariance
    protected isInitialized(): boolean {
        return this.components !== undefined;
    }

}
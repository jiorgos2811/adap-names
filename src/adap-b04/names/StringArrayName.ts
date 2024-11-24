import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(
            other,
            "Component array cannot be null"
        );
        
        super(delimiter);
        this.components = other; 
        
        //postcondition
        MethodFailedException.assertCondition(
            this.getNoComponents() === other.length,
            "Number of components must match input array length"
        );
        this.assertInvariant();
    }

    public getNoComponents(): number {
        const count = this.components.length;
        
        //postcondition
        MethodFailedException.assertCondition(
            count >= 0,
            "Component count must be non-negative"
        );
        return count;
    }

    public getComponent(i: number): string {
        //precondition
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );

        const result = this.components[i];
        
        //postcondition
        MethodFailedException.assertIsNotNullOrUndefined(
            result,
            "Retrieved component cannot be null"
        );
        this.assertInvariant();
        return result;
    }

    public setComponent(i: number, c: string) {
        //precondition
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );
        IllegalArgumentException.assertIsNotNullOrUndefined(
            c,
            "Component cannot be null"
        );

        this.components[i] = c;
        
        //postcondition
        MethodFailedException.assertCondition(
            this.components[i] === c,
            "Component was not set correctly"
        );
        this.assertInvariant();

    }

    public insert(i: number, c: string) {
        //precondition
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );
        IllegalArgumentException.assertIsNotNullOrUndefined(
            c,
            "Component cannot be null"
        );

        const oldLength = this.components.length;
        this.components.splice(i, 0, c);
        
        // Postconditions
        MethodFailedException.assertCondition(
            this.components.length === oldLength + 1,
            "Array length must increase by 1"
        );
        MethodFailedException.assertCondition(
            this.components[i] === c,
            "Inserted component must match input"
        );
        this.assertInvariant();
    }

    public append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(
            c,
            "Component cannot be null"
        );
        const oldLength = this.components.length;
        this.components.push(c);
        
        //postcondition
        MethodFailedException.assertCondition(
            this.components.length === oldLength + 1,
            "Array length must increase by 1"
        );
        MethodFailedException.assertCondition(
            this.components[this.components.length - 1] === c,
            "Appended component must match input"
        );
        this.assertInvariant();
    }

    public remove(i: number) {
        //precondition
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );
        const oldLength = this.components.length;
        const removedComponent = this.components[i];
        this.components.splice(i, 1);
        
        // Postconditions
        MethodFailedException.assertCondition(
            this.components.length === oldLength - 1,
            "Array length must decrease by 1"
        );
        MethodFailedException.assertCondition(
            !this.components.includes(removedComponent) || 
            this.components.indexOf(removedComponent) !== i,
            "Component must be removed from specified position"
        );
        this.assertInvariant();
    }

}
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    private readonly components: readonly string[];

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

    public setComponent(i: number, c: string): Name {
        //precondition
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );
        IllegalArgumentException.assert(
            c != null && c != undefined,
            "Component cannot be null"
        );

        const newComponents = [...this.components];
        newComponents[i] = c;
        this.assertInvariant();

        return new StringArrayName(newComponents, this.delimiter);

    }

    public insert(i: number, c: string): Name {
        //precondition
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );
        IllegalArgumentException.assert(
            c != null && c != undefined,
            "Component cannot be null"
        );

        const newComponents = [...this.components];
        newComponents.splice(i, 0, c);

        const newName = new StringArrayName(newComponents, this.delimiter);

        // Postcondition
        MethodFailedException.assert(
            newName.getComponent(i) === c,
            "Inserted component is not at the specified index"
        );
        newName.assertInvariant();

        return newName;
    }

    public append(c: string): Name {
        IllegalArgumentException.assert(
            c != null && c != undefined,
            "Component cannot be null"
        );
        const newComponents = [...this.components, c];
        const newName = new StringArrayName(newComponents, this.delimiter);

        // Postcondition
        MethodFailedException.assert(
            newName.getComponent(newName.getNoComponents() - 1) === c,
            "Appended component was not set correctly"
        );
        newName.assertInvariant();

        return newName;
    }

    public remove(i: number): Name {
        //precondition
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            "Index must be non-negative and less than number of components"
        );
        const newComponents = this.components.filter((_, index) => index !== i);
        const newName = new StringArrayName(newComponents, this.delimiter);

        // Postcondition
        MethodFailedException.assert(
            newName.getNoComponents() === this.getNoComponents() - 1,
            "Component count did not decrease after removal"
        );
        newName.assertInvariant();

        return newName;
        
    }

    public equals(other: any): boolean {
        if (!super.equals(other)) return false;
        if (!(other instanceof StringArrayName)) return false;
        if (this.components.length !== other.components.length) return false;

        // Compare each component
        return this.components.every((c, i) => c === other.components[i]);
    }

    //Checks if initialized in order to avoid infinite calls with assertInvariance
    protected isInitialized(): boolean {
        return this.components !== undefined;
    }
}
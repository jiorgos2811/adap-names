import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {

        //precondition
        IllegalArgumentException.assert(other != null && other != undefined, "Should not be null or undefined");

        super(delimiter);
        this.name = other;
        this.noComponents = !this.name ? 0 : this.name.split(this.delimiter).length;

        // Postconditions
        MethodFailedException.assert(
            this.noComponents === this.getNoComponents(),
            "Length must match number of components"
        );
        this.assertInvariant();
    }

    public getNoComponents(): number {
        if (!this.name) {
            return 0;
        }
        const count = this.name.split(this.delimiter).length;
        
        //postcondition
        MethodFailedException.assert(
            count >= 0,
            "Component count must be non-negative"
        );
        return count;
    }

    public getComponent(i: number): string {
        //preconditions
        IllegalArgumentException.assert(
            i >= 0,
            "Index must be non-negative"
        );
        IllegalArgumentException.assert(
            i < this.getNoComponents(),
            "Index must be less than number of components"
        );

        const components = this.name.split(this.delimiter);
        const result = components[i];
        
        //postconditions
        MethodFailedException.assert(
            result != null && result != undefined,
            "Component cannot be null"
        );
        return result;
    }

    public setComponent(i: number, c: string):Name {
        //precondition
        IllegalArgumentException.assert(c != null && c != undefined, "Component cannot be null");
        IllegalArgumentException.assert(
            i >= 0,
            "Index must be non-negative"
        );
        IllegalArgumentException.assert(
            i < this.getNoComponents(),
            "Index must be less than number of components"
        );

        const components = this.name.split(this.delimiter);
        const oldLength = components.length;
        components[i] = c;
        const newName = new StringName(components.join(this.delimiter), this.delimiter);
        
        //postcondition
        MethodFailedException.assert(
            newName.getComponent(i) === c,
            "Component was not set correctly"
        );
        MethodFailedException.assert(
            newName.getNoComponents() === oldLength,
            "Number of components must not change"
        );
        this.assertInvariant();

        return newName

    }

    public insert(i: number, c: string):Name {
        //precondition
        IllegalArgumentException.assert(c != null && c != undefined, "Component cannot be null");
        IllegalArgumentException.assert(
            i >= 0,
            "Index must be non-negative"
        );
        IllegalArgumentException.assert(
            i <= this.getNoComponents(),
            "Index must not exceed number of components"
        );

        const oldLength = this.getNoComponents();
        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);
        const newName = new StringName(components.join(this.delimiter), this.delimiter);
        
        //postcondition
        MethodFailedException.assert(
            newName.getNoComponents() === oldLength + 1,
            "Only one component gets inserted at a time"
        );
        MethodFailedException.assert(
            newName.getComponent(i) === c,
            "Inserted component must match input"
        );
        newName.assertInvariant();
        return newName
    }

    public append(c: string):Name {
        // Preconditions
        IllegalArgumentException.assert(c != null && c != undefined, "Component cannot be null");

        return this.name
            ? new StringName(this.name + this.delimiter + c, this.delimiter)
            : new StringName(c, this.delimiter);
    }

    public remove(i: number):Name {
        //precondition
        IllegalArgumentException.assert(
            i >= 0,
            "Index must be non-negative"
        );
        IllegalArgumentException.assert(
            i < this.getNoComponents(),
            "Index must be less than number of components"
        );

        const components = this.name.split(this.delimiter);
        components.splice(i, 1);
        const newName = new StringName(components.join(this.delimiter), this.delimiter);

        // Postcondition
        MethodFailedException.assert(newName.getNoComponents() === this.getNoComponents() - 1, "One component must be removed");

        return newName;
    }

    public equals(other: any): boolean {
        if (!super.equals(other)) return false;
        if (!(other instanceof StringName)) return false;
        return this.name === other.name;
    }

    //Checks if initialized in order to avoid infinite calls with assertInvariance
    protected isInitialized(): boolean {
        return this.name !== undefined;
    }

}
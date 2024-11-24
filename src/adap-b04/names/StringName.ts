import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {

        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(other);

        super(delimiter);
        this.name = other;
        this.noComponents = this.name.split(this.delimiter).length;

        // Postconditions
        MethodFailureException.assertCondition(
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
        MethodFailureException.assertCondition(
            count >= 0,
            "Component count must be non-negative"
        );
        return count;
    }

    public getComponent(i: number): string {
        //preconditions
        IllegalArgumentException.assertCondition(
            i >= 0,
            "Index must be non-negative"
        );
        IllegalArgumentException.assertCondition(
            i < this.getNoComponents(),
            "Index must be less than number of components"
        );

        const components = this.name.split(this.delimiter);
        const result = components[i];
        
        //postconditions
        MethodFailureException.assertIsNotNullOrUndefined(
            result,
            "Component cannot be null"
        );
        this.assertInvariant();
        return result;
    }

    public setComponent(i: number, c: string) {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "Component cannot be null");
        IllegalArgumentException.assertCondition(
            i >= 0,
            "Index must be non-negative"
        );
        IllegalArgumentException.assertCondition(
            i < this.getNoComponents(),
            "Index must be less than number of components"
        );

        const components = this.name.split(this.delimiter);
        const oldLength = components.length;
        components[i] = c;
        this.name = components.join(this.delimiter);
        
        //postcondition
        MethodFailureException.assertCondition(
            this.getComponent(i) === c,
            "Component was not set correctly"
        );
        MethodFailureException.assertCondition(
            this.getNoComponents() === oldLength,
            "Number of components must not change"
        );
        this.assertInvariant();
    }

    public insert(i: number, c: string) {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "Component cannot be null");
        IllegalArgumentException.assertCondition(
            i >= 0,
            "Index must be non-negative"
        );
        IllegalArgumentException.assertCondition(
            i <= this.getNoComponents(),
            "Index must not exceed number of components"
        );

        const oldLength = this.getNoComponents();
        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;
        
        //postcondition
        MethodFailureException.assertCondition(
            this.getNoComponents() === oldLength + 1,
            "Only one component gets inserted at a time"
        );
        MethodFailureException.assertCondition(
            this.getComponent(i) === c,
            "Inserted component must match input"
        );
        this.assertInvariant();
    }

    public append(c: string) {
        // Preconditions
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "Component cannot be null");

        const oldLength = this.getNoComponents();
        if (this.name === "") {
            this.name = c;
        } else {
            this.name += this.delimiter + c;
        }
        this.noComponents += 1;
        
        // Postconditions
        MethodFailureException.assertCondition(
            this.getNoComponents() === oldLength + 1,
            "Only one component gets appended at a time"
        );
        MethodFailureException.assertCondition(
            this.getComponent(this.getNoComponents() - 1) === c, //Compares last comp with input
            "Appended component must match input"
        );
        this.assertInvariant();
    }

    public remove(i: number) {
        //precondition
        IllegalArgumentException.assertCondition(
            i >= 0,
            "Index must be non-negative"
        );
        IllegalArgumentException.assertCondition(
            i < this.getNoComponents(),
            "Index must be less than number of components"
        );

        const oldLength = this.getNoComponents();
        const removedComponent = this.getComponent(i);
        const components = this.name.split(this.delimiter);
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.noComponents -= 1;
        
        //postcondition
        MethodFailureException.assertCondition(
            this.getNoComponents() === oldLength - 1,
            "Number of components must decrease by 1"
        );
        MethodFailureException.assertCondition(
            !this.name.includes(removedComponent + this.delimiter) &&
            !this.name.endsWith(removedComponent),
            "Component must be completely removed"
        );
        this.assertInvariant();
    }

}
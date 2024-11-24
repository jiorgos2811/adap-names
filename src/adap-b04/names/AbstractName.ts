import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(delimiter, "Constructor precondition: delimiter must not be null or undefined");
        this.delimiter = delimiter;
        //postcondition
        this.assertInvariant();
    }

    public clone(): Name {
        const cloned = {...this};
        
        //postcondition
        MethodFailedException.assertIsNotNullOrUndefined(cloned);
        cloned.assertInvariant();
        return cloned;
    }

    public asString(delimiter: string = this.delimiter): string {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(delimiter);
        
        const escapedComponents: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            escapedComponents.push(this.getComponent(i));
        }
        const result = escapedComponents.join(delimiter);
        
        //postcondition
        MethodFailedException.assertIsNotNullOrUndefined(result);
        this.assertInvariant();
        return result;
    }

    public toString(): string {
        return this.asDataString();
        return this.asDataString();
    }

    public asDataString(): string {
        const escapedComponents: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            const component = this.getComponent(i);
            const escapedComponent = component.replaceAll(
                this.delimiter, 
                ESCAPE_CHARACTER + this.delimiter
            );
            escapedComponents.push(escapedComponent);
        }
        const result = escapedComponents.join(this.delimiter);
        
        //postcondition
        MethodFailedException.assertIsNotNullOrUndefined(result);
        this.assertInvariant();
        return result;
    }

    public isEqual(other: Name): boolean {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(other);
        
        const currentLength = this.getNoComponents();
        const otherLength = other.getNoComponents();
        
        if (currentLength != otherLength) {
            return false;
        }
        
        for (let i = 0; i < currentLength; i++) {
            if (this.getComponent(i) != other.getComponent(i)) {
                return false;
            }
        }
        
        this.assertInvariant();
        return true;
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        
        this.assertInvariant();
        return hashCode;
    }

    public isEmpty(): boolean {
        const result = this.getNoComponents() == 0;
        //postcondtion
        MethodFailedException.assertCondition(
            result === (this.getNoComponents() === 0),
            "isEmpty result must match number of components"
        );
        this.assertInvariant();
        return result;
    }

    public getDelimiterCharacter(): string {
        const result = this.delimiter;

        // postcondition
        MethodFailedException.assertIsNotNullOrUndefined(result);
        return result;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        //precondition
        IllegalArgumentException.assertIsNotNullOrUndefined(other);
        
        const initialSize = this.getNoComponents();
        
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
        
        //postcondition
        MethodFailedException.assertCondition(
            this.getNoComponents() == initialSize + other.getNoComponents(),
            "Concatenation failed: incorrect number of components"
        );
        this.assertInvariant();
    }

    protected abstract isInitialized(): boolean;
    protected assertInvariant(): void {
        // Invariant 1: delimiter must not be null or undefined
        InvalidStateException.assertIsNotNullOrUndefined(
            this.delimiter,
            "Invariant violated: delimiter must not be null or undefined"
        );
        
        // Invariant 2: delimiter must not contain the escape character
        InvalidStateException.assertCondition(
            !this.delimiter.includes(ESCAPE_CHARACTER),
            "Invariant violated: delimiter must not contain the escape character"
        );

        // Skip component checks during construction
        if (!this.isInitialized()) {
            return;
        }

        // Invariant 3: number of components must be non-negative
        InvalidStateException.assertCondition(
            this.getNoComponents() >= 0,
            "Invariant violated: number of components must be non-negative"
        );
        
        // Invariant 4: all components must be non-null and defined
        for (let i = 0; i < this.getNoComponents(); i++) {
            InvalidStateException.assertIsNotNullOrUndefined(
                this.getComponent(i),
                `Invariant violated: component at index ${i} must not be null or undefined`
            );
        }
    }
}    
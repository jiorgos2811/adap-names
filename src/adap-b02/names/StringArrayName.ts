import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter) {
            this.delimiter = delimiter; 
        } 
        else {
            this.delimiter = DEFAULT_DELIMITER; 
        } 
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        const escapedComponents: string[] = [];
    
        for (const component of this.components) {
            //Replace instances of the delimiter in the component with the escape character + delimiter
            const escapedComponent = component.replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter);
            escapedComponents.push(escapedComponent);
        }
        const result = escapedComponents.join(this.delimiter);
    
        return result;
    }

    public isEmpty(): boolean {
        return this.components.length == 0;
    public getDelimiterCharacter(): string {
        throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
            
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }

}
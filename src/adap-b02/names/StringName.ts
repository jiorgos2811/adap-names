import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        this.name = other;
        this.length = other.length;
        if (delimiter) {
            this.delimiter = delimiter; 
        } 
        else {
            this.delimiter = DEFAULT_DELIMITER; 
        } 
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        return this.name.length == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        if (this.name) {
            return this.name.split(this.delimiter).length;
        } else {
            return 0;
        }
    }

    public getComponent(x: number): string {
        const components = this.name.split(this.delimiter);
        if (x >= 0 && x < components.length) {
            return components[x];
        }
        else throw new Error("Index out of bounds");
    }

    public setComponent(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (n >= 0 && n < components.length) {
            components[n] = c;
            this.name = components.join(this.delimiter);
            this.length = this.name.length;
        }
        else throw new Error("Index out of bounds");
    }

    public insert(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (n >= 0 && n <= components.length) {
            components.splice(n, 0, c);
            this.name = components.join(this.delimiter);
            this.length = this.name.length;
        } else {
            throw new Error("Index out of bounds");
        }
    }

    public append(c: string): void {
        this.name += this.delimiter + c;
        this.length += c.length;
    }

    public remove(n: number): void {
        const components = this.name.split(this.delimiter);
        if (n >= 0 && n < components.length) {
            components.splice(n, 1); // Remove the specified component
            this.name = components.join(this.delimiter); // Rejoin components into the name
            this.length = this.name.length; // Update the length
        } else {
            throw new Error("Index out of bounds");
        }
    }

    public concat(other: Name): void {
        throw new Error("needs implementation");
    }

}
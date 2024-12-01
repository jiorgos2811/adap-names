import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super();
        this.name = other;
        this.length = this.name.split(this.delimiter).length;
        this.name = other;
        this.length = this.name.split(this.delimiter).length;
    }

    getNoComponents(): number {
        if (this.name) {
            return this.name.split(this.delimiter).length;
        } else {
            return 0;
        }
    }

    getComponent(i: number): string {
        const components = this.name.split(this.delimiter);
        if (i >= 0 && i < components.length) {
            return components[i];
        }
        else throw new Error("Index out of bounds");
    getNoComponents(): number {
        if (this.name) {
            return this.name.split(this.delimiter).length;
        } else {
            return 0;
        }
    }

    getComponent(i: number): string {
        const components = this.name.split(this.delimiter);
        if (i >= 0 && i < components.length) {
            return components[i];
        }
        else throw new Error("Index out of bounds");
    }

    setComponent(i: number, c: string) {
        const components = this.name.split(this.delimiter);
        if (i >= 0 && i < components.length) {
            components[i] = c;
            this.name = components.join(this.delimiter);
        }
        else throw new Error("Index out of bounds");
    }

    insert(i: number, c: string) {
        const components = this.name.split(this.delimiter);
        if (i >= 0 && i <= components.length) {
            components.splice(i, 0, c);
            this.name = components.join(this.delimiter);
            this.length += 1;
        } else {
            throw new Error("Index out of bounds");
        }
    }

    append(c: string) {
        this.name += this.delimiter + c;
        this.length += 1;
    }

    remove(i: number) {
        const components = this.name.split(this.delimiter);
        if (i >= 0 && i < components.length) {
            components.splice(i, 1); 
            this.name = components.join(this.delimiter); 
            this.length -= 1; 
        } else {
            throw new Error("Index out of bounds");
        }
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }

}
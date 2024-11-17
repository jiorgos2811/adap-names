import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super();
        this.name = source;
        this.noComponents = this.name.split(this.delimiter).length;
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
            this.noComponents += 1;
        } else {
            throw new Error("Index out of bounds");
        }
    }

    append(c: string) {
        this.name += this.delimiter + c;
        this.noComponents += 1;
    }

    remove(i: number) {
        const components = this.name.split(this.delimiter);
        if (i >= 0 && i < components.length) {
            components.splice(i, 1); 
            this.name = components.join(this.delimiter); 
            this.noComponents -= 1; 
        } else {
            throw new Error("Index out of bounds");
        }
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }

}
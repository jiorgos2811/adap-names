import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter) {
            this.delimiter = delimiter; 
        } 
        else {
            this.delimiter = DEFAULT_DELIMITER; 
        } 
        if (delimiter) {
            this.delimiter = delimiter; 
        } 
        else {
            this.delimiter = DEFAULT_DELIMITER; 
        } 
    }

    public asString(delimiter: string = this.delimiter): string {
        const escapedComponents: string[] = [];
    
        for (let i = 0; i < this.getNoComponents(); i++) {
            escapedComponents.push(this.getComponent(i));
        }
        const result = escapedComponents.join(this.delimiter);
    
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        const escapedComponents: string[] = [];
    
        for (let i = 0; i < this.getNoComponents(); i++) {
            //Replace instances of the delimiter in the component with the escape character + delimiter
            const escapedComponent = this.getComponent(i).replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter);
            escapedComponents.push(escapedComponent);
        }
        const result = escapedComponents.join(this.delimiter);
    
        return result;
    }

    public isEqual(other: Name): boolean {
        const currentLength = this.getNoComponents();
        const otherLength = other.getNoComponents();
        if (currentLength != otherLength){
            return false;
        }
        for (let i = 0; i < currentLength; i++) {
            if (this.getComponent(i) != other.getComponent(i)) {
                return false;
            }
        }
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
        return hashCode;
    }

    public clone(): Name {
        return {...this};
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i)); // Add other to this
        }
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i)); // Add other to this
        }
    }

}
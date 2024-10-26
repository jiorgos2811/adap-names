export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter) {
            this.delimiter = delimiter; 
        } 
        else {
            this.delimiter = this.DEFAULT_DELIMITER; 
        } 
    }

    /** Returns human-readable representation of Name instance */
    // @methodtype conversion-method 
    public asNameString(delimiter: string = this.delimiter): string {
        let finalString: string = "";

        for (let i = 0; i < this.getNoComponents(); i++) {
            if (i == 0) {
                finalString = this.getComponent(0);
            }
            else {
                finalString += delimiter + this.getComponent(i);
            }
        }
        return finalString;
    }

    // @methodtype get-method 
    public getComponent(i: number): string {
        return this.components[i];
    }

    // @methodtype set-method 
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

     /** Returns number of components in Name instance */
     // @methodtype get-method 
     public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype command-method 
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method 
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method 
    public remove(i: number): void {
        this.components.splice(i, 1);
    }

}
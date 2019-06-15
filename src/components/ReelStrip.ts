export class ReelStrip {
    private readonly symbols: string[];
    private readonly stripLength: number;
    private stripPosition: number = 0;

    constructor(symbols: string[]) {
        this.symbols = symbols;
        this.stripLength = symbols.length;
    }

    public getSymbol(position: number): string {
        return this.symbols[position % this.stripLength];
    }

    public getNextSymbol(): string {
        this.stripPosition = ++this.stripPosition % this.stripLength;

        return this.symbols[this.stripPosition];
    }

}

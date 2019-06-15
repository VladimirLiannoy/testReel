interface IListeners {
    [propName: string]: Function[]
}

export class Messaging {
    private readonly listeners: IListeners;

    constructor() {
        this.listeners = {};
    }

    public fireEvent(eventName: string) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((callback: Function) => callback());
        }
    }

    public onEvent(eventName: string, callback: Function): void {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(callback);
    }
}

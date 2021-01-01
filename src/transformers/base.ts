export abstract class Base {
    private _dom: any;
    get Dom() { return this._dom; }
    set Dom(value: any) { this._dom = value; }
    
    abstract transform(data: any): any; 
    
    public constructor() {}
};

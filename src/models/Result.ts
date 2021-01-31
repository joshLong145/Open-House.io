export class ResultValue {
    private _name: string = '';
    public get Name() { return this._name; }
    public set Name(value: string) {this._name = value;}

    private _price: string = '';
    public get Price(): string { return this._price; }
    public set Price(value: string) { this._price = value; }

    private _url: string = '';
    public get Url(): string { return this._url; }
    public set Url(value: string) { this._url = value; }
}

export class Result {
    private _id: string;
    public get Id(): string { return this._id; }

    private _status: number = 0;
    public get Status(): number { return this._status; }
    public set Status(value: number) { this._status = value; }

    private _values: ResultValue[] = []
    public get Values(): ResultValue[] { return this._values; } 
    public constructor() {
        this._id = "1";
    }
}

export class RentalDataValue {
    private _name: string = '';
    public get Name() { return this._name; }
    public set Name(value: string) {this._name = value;}

    private _price: number = 0;
    public get Price(): number { return this._price; }
    public set Price(value: number) { this._price = value; }

    private _url: string = '';
    public get Url(): string { return this._url; }
    public set Url(value: string) { this._url = value; }

    public toString(): string {
        return `${this._name} ${this._url} ${this._price}`;
    }
}

export class Result<T> {
    private _id: string;
    public get Id(): string { return this._id; }

    private _status: number = 0;
    public get Status(): number { return this._status; }
    public set Status(value: number) { this._status = value; }

    private _values: T[] = []
    public get Values(): T[] { return this._values; } 
    
    public constructor() {
        this._id = "1";
    }

    public toString(): string {
        var sb = `${this._id}, ${this._status},`;
        for (const value of this._values)
        {
            sb += ` ${(value as any).toString()}`;
        }

        return sb;
    }
}

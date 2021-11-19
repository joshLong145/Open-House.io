import { Base } from "../transformers/base";

export class BaseTransformModel {
    private _data: any;
    get Data() { return this._data; }
    
    private _dataParseLimit: number;
    get DataParseLimit() { return this._dataParseLimit; }
    
    private _dataParseResult?: any; // TODO: Create abstract base for data parse result
    get DataParseResult() { return this._dataParseLimit; }
    set DataParseResult(value: any) { this._dataParseResult = value; }
    
    private _cookie: string;
    get Cookie(): string { return this._cookie; }
    
    private _price: number;
    get Price(): number { return this._price; }

    private _transform: Base | undefined;
    public get Transform() { return this._transform; }
    public set Transform(value: any) { this._transform = value; }

    public constructor(data: any, limit: number, cookie: string, price: number) {
        this._data = data;
        this._dataParseLimit = limit;
        this._cookie = cookie;
        this._price = price;
    }
}

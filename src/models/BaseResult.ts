class Result<T> {
  private _name: string;
  public get Name(): string { return this. _name; }

  public _id: string;
  public get Id(): string { return this._id; }

  private _value: T;

  public get Value(): T { return this._value; }


  public constructor(name: string, value: any) {
    this._name = name;
    this._value = value;
    this._id = "1";
  }
}

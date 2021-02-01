import {Db, MongoClient} from 'mongodb';

export class PersistanceManager {
    private _db: Db | undefined;
    private _client: MongoClient | undefined;

    constructor() {
        console.log('Presistance Managet initialized Configuring Database connection');

    }

    connect(): void {
        MongoClient.connect(this.ConstructURI()).then((client: MongoClient) => {
            this._db = client.db(process.env.DB_NAME);
        }).catch(err => {
            console.error(err);
        });
    }
    private ConstructURI(): string {
        return `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
    }

    get DB(): Db | undefined {
        return this._db;
    }
}
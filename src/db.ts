import {Db, MongoClient} from 'mongodb';
import { injectable } from "inversify";
import { IConnect } from './interfaces/IConnect';


@injectable()
export class PersistanceManager implements IConnect {
    private _db: Db | undefined;
    private _client: MongoClient | undefined;

    constructor() {
        console.log('Presistance Manager');
        setTimeout(() => this.connect(), 6000);
    }

    async connect() {
        console.log('initialized Configuring Database connection');
        try {
            this._client = await MongoClient.connect(this.ConstructURI());
            this._db = this._client.db(process.env.DB_NAME);
            this._db.command({ping: 1}); // ping collection to make sure it is up
        } catch(err) {
            console.error(err);
        }
    }
    private ConstructURI(): string {
        const uri: string = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
        
        return uri;
    }

    get DB(): Db | undefined {
        return this._db;
    }
}
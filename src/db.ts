import {Db, MongoClient} from 'mongodb';


export class PersistanceManager {
    private _db: Db | undefined;
    private _client: MongoClient | undefined;

    constructor() {
        console.log('Presistance Manager');

    }

    async connect() {
        console.log('initialized Configuring Database connection');
        try {
            const client: MongoClient = await MongoClient.connect(this.ConstructURI());
            this._db = client.db(process.env.DB_NAME);
            this._db.command({ping: 1}); // ping collection to make sure it is up
        } catch(err) {
            console.error(err);
        }
    }
    private ConstructURI(): string {
        const uri: string = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
        return uri;
    }

    get DB(): Db | undefined {
        return this._db;
    }
}
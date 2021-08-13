import {Db, MongoClient} from 'mongodb';
import { injectable } from "inversify";
import { IConnect } from './interfaces/IConnect';


@injectable()
export class PersistanceManager implements IConnect {
    private static _db: Db | undefined;
    private static _client: MongoClient | undefined;

    constructor() {
        console.log('Presistance Manager');
        setTimeout(this.connect, 10000);
    }

    async connect() {

        console.log('initialized Configuring Database connection');
        var connectionRetry = async () => {
            try {
                if (PersistanceManager._client?.isConnected()) {
                    return;
                }
    
                PersistanceManager._client = await MongoClient.connect(
                    PersistanceManager.ConstructURI(), {
                        reconnectTries: 10,
                        native_parser:true, 
                        authSource:'admin',
                        useUnifiedTopology: true
                    }
                );
                PersistanceManager._db = PersistanceManager._client.db(process.env.DB_NAME);
                PersistanceManager._db.command({ping: 1}); // ping collection to make sure it is up
            } catch(err) {
                console.error(err);
                setTimeout(connectionRetry, 1000);
            }
        };

        try {
            connectionRetry();
        } catch(e) {
            console.error(e);
        }
    }
    private static ConstructURI(): string {
        const uri: string 
            = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        
        return uri;
    }

    get DB(): Db | undefined {
        return PersistanceManager._db;
    }
}
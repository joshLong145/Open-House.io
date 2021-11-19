import {AggregationCursor, Collection, Db, MongoClient} from 'mongodb';
import { inject, injectable } from "inversify";
import { IConnect } from '../interfaces/IConnect';
import SERVICE_IDENTIFIERS from '../identities/identities';
import { ConsoleLoggerWrapper } from '../logging/ConsoleLoggerWrapper';


@injectable()
export class PersistanceManager implements IConnect {
    private static _db: Db | undefined;
    private static _client: MongoClient | undefined;
    private _logger: ConsoleLoggerWrapper;
    constructor(@inject(SERVICE_IDENTIFIERS.LOGGER) logger: ConsoleLoggerWrapper) {
        this._logger = logger;
        this._logger.Log.info('Establishing database connection, waiting 1000ms');
        setTimeout(this.connect, 1000, this);
    }

    public connect = () => {
        this._logger.Log.info(`Connecting to database on: ${process.env.DB_HOST}`);
        this._logger.Log.info(`Attempting connection for ${process.env.DB_NAME} `);
        var connectionRetry = async (scope: this) => {
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
                this._logger.Log.info(`Connection established for: ${process.env.DB_HOST}`);
            } catch(err) {
                console.error(err);
                setTimeout(connectionRetry, 1000);
            }
        };

        try {
            connectionRetry(this);
        } catch(e) {
            console.error(e);
        }
    }

    public storeAsync<T>(collection: Collection | undefined, data: Array<T>): void {
        this._logger.Log.info(`Storing data to the following persistence endpoint: ${process.env.DB_NAME} `);
        collection && data.forEach((item: T) => {
            if (typeof(item) !== 'object')
            {
                this._logger.Log.error("Cannot store non object: ", data);
                return;
            }
            collection?.find({'_name': (item as any).Name}).toArray().then((docs: any) => {
                docs?.length < 1 && collection.insertOne(item);
            });
        });
    }

    public generateCursorForAveraging(collection: Collection, param: string): AggregationCursor | undefined {
        try {
            return collection?.aggregate([
                {
                    $addFields: {
                        results: {
                        $regexFindAll: { 
                            input: "$_name", 
                            regex: `/${param}/g`
                            },
                        }
                    }
                },
                {
                    $group: {
                        _id:null,
                        avg: { $avg:"$_price" },
                        count: {$sum: 1}
                    }
            }]);
        } catch (e: any) {
            console.error("Error while Querying average", e);
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
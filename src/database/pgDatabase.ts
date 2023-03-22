import { Client, Pool } from 'pg';
import dotenv from 'dotenv'
dotenv.config();

export default class PgDatabase {
    private username: string;
    private password: string;
    private database: string;
    private host: string;
    private dbClient : Pool;  
    private port : number;

    constructor(username: string,password: string,database: string , host : string, port : number) {
        this.username = username;
        this.password = password;
        this.database = database;
        this.host = host;
        this.port = port;
        this.init();
    }

    private init(): void {
        const pool = new Pool({
            port: this.port,
            user: this.username,
            host: this.host,
            database: this.database,
            password: this.password
          });
          this.dbClient = pool;
          this.dbClient.connect((err, client, release) => {
            if (err) {
              console.error('Error connecting to the database', err.stack);
            } else {
              console.log('Successfully connected to the database');
              release();
            }
          });
          this.dbClient.on('error', (err: any) => {
            console.error('Unexpected error on database client', err)
            // process.exit(-1)
            throw Error('Unexpected error on database client'+err);
          })
          
    }
    public async executeWithErrorHandling(query: string, params?: Array<any>){
        let res
            await this.dbClient.query('BEGIN')
            try {
                res = await this.dbClient.query(query, params)
                await this.dbClient.query('COMMIT')
            } catch (err) {
                await this.dbClient.query('ROLLBACK')
                throw Error('Unexpected error on database client'+err);
            }
        
        return res
    }
  


}

//  -----------------------DATABASE-----------------------------
// should maybe have a factory for this singleton instance
const port = Number(process.env.REACTPORTDB);
const user= String(process.env.REACTUSERNAME);
const host = String(process.env.REACTHOST);
const database= String(process.env.REACTDATABASE);
const password= String(process.env.REACTPASSWORD);
console.log(port, host, database, password,user );
export const db = new PgDatabase(user,password,database,host,port);



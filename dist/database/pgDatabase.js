"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
class PgDatabase {
    constructor(username, password, database, host) {
        this.username = username;
        this.password = password;
        this.database = database;
        this.host = host;
        this.init();
    }
    init() {
        const pool = new pg_1.Pool({
            port: 5432,
            user: this.username,
            host: this.host,
            database: this.database,
            password: this.password
        });
        this.dbClient = pool;
        this.dbClient.on('connect', (err) => {
            console.log('sucessfully initialized database');
        });
        this.dbClient.on('error', (err) => {
            console.error('Unexpected error on database client', err);
            // process.exit(-1)
            throw Error('Unexpected error on database client' + err);
        });
    }
    executeWithErrorHandling(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield this.dbClient.query('BEGIN');
            try {
                res = yield this.dbClient.query(query, params);
                yield this.dbClient.query('COMMIT');
            }
            catch (err) {
                yield this.dbClient.query('ROLLBACK');
                throw Error('Unexpected error on database client' + err);
            }
            return res;
        });
    }
}
exports.default = PgDatabase;
//  -----------------------DATABASE-----------------------------
// should maybe have a factory for this singleton instance
exports.db = new PgDatabase('postgres', 'achanger', 'reactAuth', 'localhost');
//# sourceMappingURL=pgDatabase.js.map
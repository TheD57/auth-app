"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() { }
    info(logText) {
        console.log(new Date() + 'info:::::' + logText);
    }
    debug(logText) {
        console.log(new Date() + 'debug:::::' + logText);
    }
    error(err, logText = '') {
        console.log(new Date() + 'error:::::' + err + logText);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Loggeur.js.map
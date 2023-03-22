export class Logger {

    constructor(){}

    public info(logText: string): void {
        console.log(new Date()+'info:::::'+logText);
    }

    public debug(logText: string): void {
        console.log(new Date()+'debug:::::'+logText);
    }

    public error(err : any ,logText: string = ''): void {
        console.log(new Date()+'error:::::'+err+logText);
    }
}

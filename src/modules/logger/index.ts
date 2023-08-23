export class Logger implements ILogger {
    private readonly prefix = 'Better WorkFlowy';
    private readonly prefixStyles = 'background: rgb(75, 173, 223); color: #fff';

    public log(message: string) {
        console.log(`%c ${this.prefix} %c ${message}`, this.prefixStyles, '');
    }

    public error(message: string) {
        console.error(`%c ${this.prefix} %c ${message}`, this.prefixStyles, '');
    }
}

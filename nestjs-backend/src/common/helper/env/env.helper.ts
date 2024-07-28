export class EnvHelper {

    static isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }
}
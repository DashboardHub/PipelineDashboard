export class Config {
    production: boolean;
    web: string;
    api: string;
    version: string;

    firebase: {
        apiKey: string,
        authDomain: string,
        databaseURL: string,
        projectId: string,
        storageBucket: string,
        messagingSenderId: string,
    };
}

export class Config {
    production: boolean;
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

import environments from './environments';

const port = process.env.PORT || 3000;

environments.listen(port, (err: Error) => {
    if (err) {
        return console.log(err) // tslint:disable-line
    }

    return console.log(`server is listening on ${port}`); // tslint:disable-line
});

export = environments;

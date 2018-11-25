import { from, Observable } from 'rxjs';

import { Environment } from '../db/models/Environment';

export class EnvironmentService {

    private attributesPublic: string[] = ['id', 'name', 'description', 'logo', 'type', 'url', 'pings', 'views'];

    public findAllPrivate(ownerId: string): Observable<Environment[]> {
        return from(Environment.findAll<Environment>({ where: { ownerId } }));
    }

    public findAllPublic(): Observable<Environment[]> {
        return from(Environment
            .findAll<Environment>({
                attributes: this.attributesPublic,
                where: { isPrivate: false },
            }),
        );
    }

    public findOnePrivate(id: string, ownerId: string): Observable<Environment | null> {
        return from(Environment.findOne<Environment>({ where: { id, ownerId } }));
    }

    public findOnePublic(id: string): Observable<Environment | null> {
        return from(Environment
                .findOne<Environment>({
                    attributes: this.attributesPublic,
                    where: { id },
                }),
        );
    }
}

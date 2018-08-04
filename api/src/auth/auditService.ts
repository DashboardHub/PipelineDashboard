import { Request } from 'express';
import Auditlog from '../db/models/auditlog';

interface IAudit {
    details: string;
    namespace: 'auth';
    type: 'registration' | 'login';
    userId: string | undefined;
}

export class AuditService {

    public create(req: Request, data: IAudit) {
        return Auditlog.create({
            client: `${req.headers['X-Forwarded-For'] || req.headers['x-forwarded-for']} ${req.headers['user-agent']}`,
            details: data.details,
            namespace: data.namespace,
            type: data.type,
            userId: data.userId || 'unknown',
        });
    }
}

export default new AuditService();

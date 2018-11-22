import { Table, Column, Model, Sequelize, Length, IsIn, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
    tableName: 'auditlogs'
})
export class AuditLog extends Model<AuditLog> {

    @Column({
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    })
    id?: string;

    @Column
    userId?: string;

    @IsIn([['auth']])
    @Column
    namespace?: string;

    @IsIn([['login', 'registration']])
    @Column
    type?: string;

    @Length({ min: 3, max: 255 })
    @Column
    details?: string;

    @Length({ min: 3, max: 255 })
    @Column
    client?: string;

    @CreatedAt
    @Column
    creationDate: Date = new Date();

    @UpdatedAt
    @Column
    updatedOn: Date = new Date();
}

export default AuditLog;

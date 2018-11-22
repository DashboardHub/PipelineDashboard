import { Table, Column, Model, Sequelize, Length, Scopes, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import User from "./user";

@Scopes({
    full: {
        include: [() => User]
    },
})
@Table({
    tableName: 'environments',
})
export class Environment extends Model<Environment> {

    @Column({
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    })
    id?: string;

    @Length({min: 3, max: 32})
    @Column
    name?: string;

    @Length({ min: 3, max: 1024 })
    @Column
    description?: string;

    @CreatedAt
    @Column
    creationDate: Date = new Date();

    @UpdatedAt
    @Column
    updatedOn: Date = new Date();

    @ForeignKey(() => User)
    @Column
    ownerId?: string;

    @BelongsTo(() => User)
    owner?: User;
}

export default Environment;

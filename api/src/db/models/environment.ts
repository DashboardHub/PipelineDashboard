import { Table, Column, Model, Sequelize, Length, Scopes, ForeignKey, BelongsTo } from 'sequelize-typescript';
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

    // @CreatedAt
    // @Column
    // createdAt: Date = new Date();
    //
    // @UpdatedAt
    // @Column
    // updatedAt: Date = new Date();

    @ForeignKey(() => User)
    @Column
    ownerId?: string;

    @BelongsTo(() => User)
    owner?: User;
}

export default Environment;

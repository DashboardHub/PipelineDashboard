import { Column, CreatedAt, HasMany, IsEmail, Length, Model, Sequelize, Table, UpdatedAt } from 'sequelize-typescript';

import { Environment } from './Environment';

@Table({
    tableName: 'users',
})
export class User extends Model<User> {

    @CreatedAt
    @Column
    public creationDate?: Date;

    @Length({ min: 3, max: 32 })
    @IsEmail
    @Column
    public email?: string;

    @HasMany(() => Environment)
    public environments?: Environment[];

    @Length({ min: 5, max: 64 })
    @Column
    public hash?: string;

    @Column({
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    })
    public id?: string;

    @UpdatedAt
    @Column
    public updatedOn?: Date;
}

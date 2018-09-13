import { Table, Column, Model, Sequelize, Length, IsEmail, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import Environment from "./environment";

@Table({
    tableName: 'users'
})
export class User extends Model<User> {

    @Column({
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    })
    id?: string;

    @Length({ min: 3, max: 32 })
    @IsEmail
    @Column
    email?: string;

    @Length({ min: 5, max: 64 })
    @Column
    hash?: string;

    @CreatedAt
    @Column
    creationDate: Date = new Date();

    @UpdatedAt
    @Column
    updatedOn: Date = new Date();

    @HasMany(() => Environment)
    environments?: Environment[];
}

export default User;

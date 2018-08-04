import { Table, Column, Model, Sequelize, Length, IsEmail } from 'sequelize-typescript';

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

    // @CreatedAt
    // @Column
    // createdAt: Date = new Date();
    //
    // @UpdatedAt
    // @Column
    // updatedAt: Date = new Date();
}

export default User;

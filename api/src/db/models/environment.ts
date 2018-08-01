import {Table, Column, Model, Sequelize, Length} from 'sequelize-typescript';

@Table({
    tableName: 'environments'
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
}

export default Environment;

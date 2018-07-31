import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Environment extends Model<Environment> {

    @Column
    name: string = '';

    // @CreatedAt
    // @Column
    // createdAt: Date = new Date();
    //
    // @UpdatedAt
    // @Column
    // updatedAt: Date = new Date();

}

export default Environment;

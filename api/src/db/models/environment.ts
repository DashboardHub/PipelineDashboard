import {
    BelongsTo, Column, CreatedAt, ForeignKey, Is, IsUrl, Length, Model, Sequelize, Table, UpdatedAt,
} from 'sequelize-typescript';

import { User } from './user';

@Table({
    tableName: 'environments',
})
export class Environment extends Model<Environment> {

    @CreatedAt
    @Column
    public creationDate?: Date;

    @Length({ min: 3, max: 1024 })
    @Column
    public description?: string;

    @Column({
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    })
    public id?: string;

    @Column
    public isPrivate?: boolean;

    @Is('https', (value: string) => {
        if (!/^https/.test(value)) {
            throw new Error(`"${value}" is not over "https".`);
        }
    })
    @IsUrl
    @Column
    public logo?: string;

    @Length({ min: 3, max: 32 })
    @Column
    public name?: string;

    @BelongsTo(() => User)
    public owner?: User;

    @ForeignKey(() => User)
    @Column
    public ownerId?: string;

    @Column
    public pings?: number;

    @Is('type', (value: string) => {
        if (!['build', 'deploy', 'build-deploy'].includes(value)) {
            throw new Error(`"${value}" is not a environment type.`);
        }
    })
    @Column
    public type?: string;

    @UpdatedAt
    @Column
    public updatedOn?: Date;

    @IsUrl
    @Column
    public url?: string;

    @Column
    public views?: number;
}

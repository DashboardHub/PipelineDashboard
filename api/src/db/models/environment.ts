import { Table, Column, Model, Sequelize, Length, Scopes, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, IsUrl, Is } from 'sequelize-typescript';
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

    @Is('type', (value: string) => {
        if (!['build', 'deploy', 'build-deploy'].includes(value)) {
            throw new Error(`"${value}" is not a environment type.`);
        }
    })
    @Column
    type?: string;

    @Column
    isPrivate?: boolean;

    @Length({min: 3, max: 32})
    @Column
    name?: string;

    @Length({ min: 3, max: 1024 })
    @Column
    description?: string;

    @IsUrl
    @Column
    url?: string;

    @Is('https', (value: string) => {
        if (value.substr(0, 5) !== 'https') {
            throw new Error(`"${value}" is not over "https".`);
        }
    })
    @IsUrl
    @Column
    logo?: string;

    @Column
    pings?: number;

    @Column
    views?: number;

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

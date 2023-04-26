import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type:'int',
    })
    id: number;

    @Column({
        type:"varchar",
    })
    username:string;

    @Column({
        type:"varchar",
    })
    password:string;
};

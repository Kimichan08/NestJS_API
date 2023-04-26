import { CategoryEntity } from "src/category/entity/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export  class ProductEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id:number;

    @Column({
        type: 'varchar',
    })
    name:string;

    @Column({
        type: 'float',
    })
    price:number;

    @Column({
        type:'varchar',
    })
    image: string;

    @Column({
        type:'varchar',
    })
    description:string;

    @ManyToOne(
        ()=> CategoryEntity,
        (category)=> category.products
    )
    category: CategoryEntity;
};

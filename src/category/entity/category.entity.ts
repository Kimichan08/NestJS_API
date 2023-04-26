import { ProductEntity } from "src/product/entity/product.entity";
import {Entity,PrimaryGeneratedColumn,Column, OneToMany} from "typeorm"; 

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn({ // dinh danh kieu du lieu
        type: 'int', // dinh nghia kieu dl
    })
    id: number;

    @Column({
        type: 'varchar',
    })
    name:string;

    @OneToMany(
        ()=> ProductEntity,
        (product)=>product.category
    )
    products: ProductEntity;
};

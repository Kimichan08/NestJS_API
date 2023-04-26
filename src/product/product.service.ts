import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ){}

    async getAll(): Promise<ProductEntity[]>{
        return await this.productRepository.find();
    }

    async getByID(id: number): Promise<ProductEntity[]>{
        return await this.productRepository.findBy({id});
    }

    async create(id: number,product: CreateProductDTO): Promise<ProductEntity>{
       const category = await this.categoryRepository.findOneBy({id});

       const newProduct = this.productRepository.create({
        ...product,
        category,
       });

       return this.productRepository.save(newProduct);
    }

    async update(categoryId: number,id:number,product:CreateProductDTO): Promise<UpdateResult>{
        const category = await this.categoryRepository.findOneBy({id:categoryId});

        const newProduct = this.productRepository.create({
            ...product,
            category,
        });

        return this.productRepository.update(id,newProduct);
    }

    async delete(id:number): Promise<DeleteResult>{
        return this.productRepository.delete(id);
    }
}

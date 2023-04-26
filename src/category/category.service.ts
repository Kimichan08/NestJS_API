import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)// theo doi cap nhat thay doi du lieu
        private readonly categoryRepository: Repository<CategoryEntity>,// bo tu truy cap 
    ) {}

    async getAll(): Promise<CategoryEntity[]>{
        return await this.categoryRepository.find();
    } 

    async getByID(id: number): Promise<CategoryEntity[]>{
        return await this.categoryRepository.findBy({id});
    }

    async create(newCategory: CreateCategoryDTO): Promise<CategoryEntity>{
        return await this.categoryRepository.save(newCategory);
    } 
    
    async update(id:number, category: CreateCategoryDTO): Promise<UpdateResult>{
        return await this.categoryRepository.update(id,category);
    }

    async delete(id:number): Promise<DeleteResult>{
        return await this.categoryRepository.delete(id);
    }
}

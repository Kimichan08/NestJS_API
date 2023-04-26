import { CategoryEntity } from './entity/category.entity';
import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<CategoryEntity[]>{
    return await this.categoryService.getAll();
  }

  @Get(':id')
  async getByID(@Param('id') id: number): Promise<CategoryEntity[]>{
    return await this.categoryService.getByID(id);
  }

  @Post()
  async create(@Body() data: CreateCategoryDTO): Promise<CategoryEntity>{
    return await this.categoryService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id:number, @Body() data:CreateCategoryDTO): Promise<UpdateResult>{
    return await this.categoryService.update(id,data);
  }

  @Delete(':id')
  async delete(@Param('id') id:number): Promise<DeleteResult>{
    return await this.categoryService.delete(id);
  }
}

import { ProductEntity } from 'src/product/entity/product.entity';
import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    forwardRef(()=> CategoryModule)],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}

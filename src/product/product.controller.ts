import { ProductEntity } from 'src/product/entity/product.entity';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors,ParseFilePipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<ProductEntity[]>{
    return await this.productService.getAll();
  }

  @Get(':id')
  async getByID(@Param('id') id: number): Promise<ProductEntity[]>{
    return await this.productService.getByID(id);
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('image',{
      storage: diskStorage({
        destination: './src/public',
        filename(req,file,callback){
          let filename = Date.now() + file.originalname;
          filename = filename.replaceAll(' ','_');
          let fullpath = 'http://' + req.get('host') + '/public' + filename;
          callback(null,filename);
        },
      }),
    }),
  )
  async create(@Param('id') id: number,
  @UploadedFile(
    new ParseFilePipe({
      fileIsRequired: true,
    }),
  ) 
  image: Express.Multer.File,
  @Body() data:CreateProductDTO
  ): Promise<ProductEntity>{
    data.image = image.filename;
    return await this.productService.create(id,data);
  }

  @Put(':id/:categoryId')
  @UseInterceptors(
    FileInterceptor('image',{
      storage: diskStorage({
        destination: './src/public',
        filename(req, file, callback) {
          const dateNow = Date.now();
          const fileName = dateNow + file.originalname;
          callback(null, fileName);
        },
      }),
    })
  )
  async update(
    @Param('categoryId') categoryId:number, 
    @Param('id') id:number,
    @UploadedFile() image: Express.Multer.File,
    @Body() data:CreateProductDTO): Promise<UpdateResult>{
      const currentData = await this.productService.getByID(id);
      let fileName = currentData[0].image;
      if (image) {
        fileName = image.filename;
      }
      data.image = fileName;
    return await this.productService.update(categoryId,id,data);
  }

  @Delete(':id')
  async delete(@Param('id') id:number){
    return await this.productService.delete(id);
  }
}

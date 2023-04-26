import { IsNotEmpty, IsString, MinLength, IsNumber, IsNumberString } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty({message:'Please provide a product name'})
    @IsString({message:'Please enter a valid product name'})
    @MinLength(2,{message: 'At least 2 characters'})
    name: string;

    @IsNotEmpty({message:'Please provide a price'})
    @IsNumberString()
    price:number;

    image:string;

    @IsString({message:'Please enter a valid description'})
    description:string;
};

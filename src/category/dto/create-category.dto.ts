import { IsString,IsNotEmpty, MinLength,MaxLength } from "class-validator";

export class CreateCategoryDTO {
    @IsString({message:"Please enter a valid category name"})
    @IsNotEmpty({message:"Please provide a category name"})
    @MinLength(2,{message:'At Least 2 characters'})
    @MaxLength(100,{message:'At max 100 characters'})
    name: string;
};

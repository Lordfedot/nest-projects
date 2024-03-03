import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger'


export class BookDto {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  @MinLength(3, { message: 'Title is too short.' })
  @MaxLength(32, { message: 'Title is too long.' })
  title: string;

  @IsString({ message: 'Author must be a string.' })
  @IsNotEmpty({ message: 'Author is required.' })
  @MinLength(3, { message: 'Author is too short.' })
  @MaxLength(32, { message: 'Author is too long.' })
  author: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  publishedYear: number;
}
export class UpdateBookDto extends PartialType(BookDto) {}


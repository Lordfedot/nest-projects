import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

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

export class UpdateBookDto {
  @IsString({ message: 'Title must be a string.' })
  @MinLength(3, { message: 'Title is too short.' })
  @MaxLength(32, { message: 'Title is too long.' })
  @IsOptional()
  @IsNotEmpty({ message: 'Title is required.' })
  title?: string;

  @IsString({ message: 'Author must be a string.' })
  @MinLength(3, { message: 'Author is too short.' })
  @MaxLength(32, { message: 'Author is too long.' })
  @IsOptional()
  @IsNotEmpty({ message: 'Title is required.' })
  author?: string;

  @IsNumber()
  @IsOptional()
  @Min(1900)
  @Max(new Date().getFullYear())
  publishedYear?: number;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookServices } from './services';
import { BookDto, UpdateBookDto } from './schema';

@Controller('books')
export class BookController {
  constructor(private readonly bookServices: BookServices) {}

  @Get()
  async getAllBooks() {
    const data = await this.bookServices.getAllBooks();
    return { message: 'Success', data };
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    const data = await this.bookServices.getBook(id);
    return { message: 'Success', data };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createBook(@Body() body: BookDto) {
    const data = await this.bookServices.createBook(body);
    return { message: 'Success', data };
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    const result = await this.bookServices.deleteBook(id);
    return { message: `Success, book with id ${id} deleted`, result };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateBook(@Param('id') id: string, @Body() body: UpdateBookDto) {
    const result = await this.bookServices.updateBook(id, body);
    return { message: 'Success', result };
  }
}

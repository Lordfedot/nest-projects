import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { BookServices } from './services';
import { BookDto, UpdateBookDto } from './schema';
import { RequestWithUserId } from 'src/interfaces';
import { AuthGuard } from 'src/auth/guard';

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
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createBook(@Body() body: BookDto, @Request() req: RequestWithUserId) {
    const userId = req.userId;
    const data = await this.bookServices.createBook(body, userId);
    return { message: 'Success', data };
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string, @Request() req: RequestWithUserId) {
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

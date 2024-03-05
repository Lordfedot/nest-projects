import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { BookServices } from './services';
import { BookDto, UpdateBookDto } from './schema';
import { RequestWithUser } from 'src/interfaces';
import { AuthGuard } from 'src/auth/guard';

@Controller('books')
export class BookController {
  constructor(private readonly bookServices: BookServices) {}

  @Get()
  async getAllBooks(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const data = await this.bookServices.getAllBooks(page, limit);
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
  async createBook(@Body() body: BookDto, @Request() req: RequestWithUser) {
    const user = req.user;
    const data = await this.bookServices.createBook(body, user);
    return { message: 'Success', data };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteBook(@Param('id') id: string, @Request() req: RequestWithUser) {
    const user = req.user;
    const result = await this.bookServices.deleteBook(id, user);
    return { message: `Success, book with id ${id} deleted`, result };
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateBook(
    @Param('id') id: string,
    @Body() body: UpdateBookDto,
    @Request() req: RequestWithUser,
  ) {
    const user = req.user;
    const result = await this.bookServices.updateBook(id, body, user);
    return { message: 'Success', result };
  }
}

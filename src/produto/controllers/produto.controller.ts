import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';

@Controller('/produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findAllByNome(nome);
  }

  @Get('/marca/:marca')
  @HttpCode(HttpStatus.OK)
  findAllByMarca(@Param('marca') marca: string): Promise<Produto[]> {
    return this.produtoService.findAllByMarca(marca);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findAllByDescicao(@Param('descricao') descricao: string): Promise<Produto[]> {
    return this.produtoService.findAllByDescicao(descricao);
  }

  @Get('/preco/preco')
  @HttpCode(HttpStatus.OK)
  findAllByPreco(
    @Query('min', ParseFloatPipe) min: number,
    @Query('max', ParseFloatPipe) max: number,
  ) {
    return this.produtoService.findAllByPreco(min, max);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number) {
    return this.produtoService.delete(id);
  }
}

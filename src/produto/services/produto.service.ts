import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../entities/produto.entity';
import { Between, ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
    });

    if (!produto)
      throw new HttpException('Produto nao encontrado', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findAllByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async findAllByMarca(marca: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        marca: ILike(`%${marca}%`),
      },
    });
  }

  async findAllByDescicao(descricao: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
    });
  }

  async findAllByPreco(min: number, max: number): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        preco: Between(min, max),
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}

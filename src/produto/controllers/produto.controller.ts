import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller("/produtos")
export class ProdutoController {

    constructor(
        private readonly produtoService: ProdutoService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @Get("/:id") //? os dois pontos (:) significa que é uma variável de caminho
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }

    @Get("/produto/:produto") //? os dois pontos (:) significa que é uma variável de caminho
    @HttpCode(HttpStatus.OK)
    findAllByProduto(@Param("produto") produto: string): Promise<Produto[]> {
        return this.produtoService.findAllByProduto(produto);
    }

    @Get('preco-menor/:preco')
    findByPrecoMenor(@Param('preco') preco: string): Promise<Produto[]> {
        return this.produtoService.findByPrecoMenor(Number(preco));
    }

    @Get('preco-maior/:preco')
    findByPrecoMaior(@Param('preco') preco: string): Promise<Produto[]> {
        return this.produtoService.findByPrecoMaior(Number(preco));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.produtoService.delete(id);
    }


}
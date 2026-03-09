import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";



@Controller("/produto")
export class ProdutoController{

    constructor(
        private readonly produtoService: ProdutoController
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    @Get("/:id") //? os dois pontos (:) significa que é uma variável de caminho
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }

    @Get("/produto/:produto") //? os dois pontos (:) significa que é uma variável de caminho
    @HttpCode(HttpStatus.OK)
    findAllByProduto(@Param("produto") produto: string): Promise<Produto[]>{
        return this.produtoService.findAllByProduto(produto);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }


}
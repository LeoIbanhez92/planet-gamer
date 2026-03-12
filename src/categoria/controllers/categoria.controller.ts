import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/categorias")
export class CategoriaController {

    constructor(
        private readonly categoriaService: CategoriaService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get("/:id") //? os dois pontos (:) significa que é uma variável de caminho
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Get("/categoria/:categoria") //? os dois pontos (:) significa que é uma variável de caminho
    @HttpCode(HttpStatus.OK)
    findAllByCategoria(@Param("categoria") categoria: string): Promise<Categoria[]> {
        return this.categoriaService.findAllByCategoria(categoria);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.update(categoria);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.categoriaService.delete(id);
    }


}
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ) { }

    async findAll(): Promise<Categoria[]> {

        //? SELECT * FROM tb_tema
        return this.categoriaRepository.find({
            relations:{
                produto: true
            }
        });
    }

    //! CONSULTA POR ID

    async findById(id: number): Promise<Categoria> {
        //? SELEC * FROM TB_POSTAGENS WHERE ID = ? 
        const categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations:{
                produto: true
            }
        })

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    //! CONSULTA POR DESCRIÇÃO

    async findAllByCategoria (categoria: string): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            where: {
                categoria: ILike(`%${categoria}%`),
            },
            relations:{
                produto: true
            }
        })
    }

    async create(categoria: Categoria): Promise<Categoria> {
        //? INSERT INTO TB_POSTAGEM (TITULO, TEXTO) VALUES (?, ?) -> VALORES INFORMADO PELO USUARIO

        return await this.categoriaRepository.save(categoria);
    }


    async update(categoria: Categoria): Promise<Categoria> {
        //? UPDATE  TB_POSTAGEM SET TITULO = ?-> VALORES INFORMADO PELO USUARIO

        if (!categoria.id || categoria.id <= 0)
            throw new HttpException("O ID do tema é inválido", HttpStatus.BAD_REQUEST);
        await this.findById(categoria.id);

        return this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        //? DELETE TB_POSTAGEM FROM id = ?
        return this.categoriaRepository.delete(id);
    }


}
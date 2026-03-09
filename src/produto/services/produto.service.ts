import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        //private readonly categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Produto[]> {

        //? SELECT * FROM tb_postagem
        return this.produtoRepository.find({
            relations:{
                //categoria: true
            }
        });
    }

    //! CONSULTA POR ID

    async findById(id: number): Promise<Produto> {
        //? SELEC * FROM TB_POSTAGENS WHERE ID = ? 
        const produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations:{
                //categoria: true
            }
        });

        if(!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }

    //! CONSULTA POR TITULO

    async findAllByProduto(produto: string): Promise<Produto[]>{
        return this.produtoRepository.find({
            where: {
                produto: ILike(`%${produto}%`),
            },
            relations:{
                //categoria: true
            }
        });
    }

    async create(produto: Produto): Promise<Produto>{

        //await this.categoriaService.findById(produto.categotia.id); 

        //? INSERT INTO TB_POSTAGEM (TITULO, TEXTO) VALUES (?, ?) -> VALORES INFORMADO PELO USUARIO

        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto>{
        //? UPDATE  TB_POSTAGEM SET TITULO = ?-> VALORES INFORMADO PELO USUARIO

        if(!produto.id || produto.id <= 0)
            throw new HttpException("O ID do Produto é inválido", HttpStatus.BAD_REQUEST);

        //? CHECA SE A POSTAGEM EXISTE
        await this.findById(produto.id);

        //? CHECA SE O TEMA DA POSTAGEM EXISTE
        //await this.categoriaService.findById(produto.categoria.id);

        return this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise <DeleteResult>{
        await this.findById(id);

        //? DELETE TB_POSTAGEM FROM id = ?
        return this.produtoRepository.delete(id);
    }
    
}
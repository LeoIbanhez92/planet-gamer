import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value ?.trim())
    @IsNotEmpty()
    @Length(5, 30, {message: "O Nome do produto deve ter entre 5 e 30 caracteres" })
    @Column({length: 30, nullable: false})
    produto: string;

    @UpdateDateColumn()
    data: Date;

    @ManyToOne(()=> Categoria, (categoria)=> categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
}
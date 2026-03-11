import { Transform, TransformFnParams, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsUrl, Length, Min } from "class-validator";
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

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2}, {message: "O preço deve ser um número válido"})
    @Min(0, {message: "O preço não pode ser negativo"})
    @Column({type: "decimal", precision: 10, scale: 2, nullable: false})
    preco: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsUrl({}, {message: "A foto deve ser uma URL válida"})
    @Column({length: 255, nullable: false})
    foto: string

    @UpdateDateColumn()
    data: Date;

    @ManyToOne(()=> Categoria, (categoria)=> categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
}
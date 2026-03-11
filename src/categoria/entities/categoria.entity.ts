import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";


@Entity({name: "tb_categorias"})
export class Categoria{
    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams)=> value?.trim())
    @IsNotEmpty()
    @Length(5, 40, {message: "A categoria deve ter entre 5 e 40 caracteres" })
    @Column({ length: 40, nullable: false})
    categoria: string;

    @OneToMany(() => Produto, (produto) => produto.categoria )

    produto: Produto[];
    
}
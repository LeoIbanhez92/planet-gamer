import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
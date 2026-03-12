import { IsDateString, IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Transform, TransformFnParams } from "class-transformer"

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    usuario: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string

    @Column({ length: 5000 })
    foto: string

    @IsNotEmpty()
    @IsDateString({}, { message: "A data de nascimento deve ser uma data válida" })
    @Column({ type: "date", nullable: false })
    dataNascimento: Date



}
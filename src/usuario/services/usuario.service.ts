import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { Usuario } from '../entities/usuario.entity';
import { differenceInYears } from 'date-fns';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    // Não vai ter um endpoint na Controller para ser consumido, será usado apenas na autenticação
    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        //! VALIDAR IDADE

        const idade = differenceInYears(new Date(), usuario.dataNascimento);

        if (idade < 18) {
            throw new HttpException(
                "O usuário deve ter pelo menos 18 anos",
                HttpStatus.BAD_REQUEST
            );
        }

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);


        //? VALIDA A IDADE
        
        const idade = differenceInYears(new Date(), usuario.dataNascimento);

        if (idade < 18)
            throw new HttpException(
                "O usuário deve ter mais de 18 anos",
                HttpStatus.BAD_REQUEST
            );

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

        return await this.usuarioRepository.save(usuario);
    }
}
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ){}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll() {
    return await this.usuarioRepository.find({
      order: {
        votosTotais: 'desc'
      }
    });
  }

  async findUsuarioById(id: number) {
    return await this.usuarioRepository.findOneBy({id});
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async updateMaisVotosUsuario(id: number){

    return await this.usuarioRepository
    .createQueryBuilder()
    .update(Usuario)
    .set({
      votosTotais: () => "votosTotais + 1"
    })
    .where({id})
    .execute()
  }

  async updateMenosVotosUsuario(id: number){

    return await this.usuarioRepository
    .createQueryBuilder()
    .update(Usuario)
    .set({
      votosTotais: () => "votosTotais - 1"
    })
    .where({id})
    .execute()
  }
}

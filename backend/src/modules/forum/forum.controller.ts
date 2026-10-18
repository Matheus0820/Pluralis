import { Body, Controller, Get, Ip, Post, Query, Req } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CriarTopicoDto } from './dto/topico.dto';
import { CategoriaForum } from '@prisma/client';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get('topicos')
  async listarTopicos(@Query('categoria') categoria?: CategoriaForum) {
    return this.forumService.listarTopicos(categoria);
  }

  @Post('topicos')
  async criarTopico(
    @Body() dto: CriarTopicoDto,
    @Ip() ip: string,
    @Req() req: any,
  ) {
    const usuarioId = req.user?.id || 'docente-demo-pluralis-id';
    return this.forumService.criarTopico(dto, usuarioId, ip);
  }
}

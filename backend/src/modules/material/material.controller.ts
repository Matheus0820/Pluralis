import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { MaterialService } from './material.service';
import { AdaptarMaterialDto } from './dto/adaptar-material.dto';
import { CriarMaterialDto } from './dto/criar-material.dto';
import { AtualizarMaterialDto } from './dto/atualizar-material.dto';
import { TipoAdaptacao } from '@prisma/client';

@Controller('materiais')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  /**
   * RF02: Rota sensível com Rate Limiting estrito para proteção de custos e recursos.
   * Limite de 10 requisições por minuto por IP.
   */
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('adaptar')
  async adaptar(
    @Body() dto: AdaptarMaterialDto,
    @Ip() ip: string,
    @Req() req: any,
  ) {
    const usuarioId = req.user?.id;
    return this.materialService.gerarAdaptacao(dto, usuarioId, ip);
  }

  /**
   * RF04 & RF05: Criação do material após validação da revisão humana.
   */
  @Post()
  async criar(
    @Body() dto: CriarMaterialDto,
    @Ip() ip: string,
    @Req() req: any,
  ) {
    // Para simplificar o MVP em ambiente de desenvolvimento, utiliza o ID do usuário autenticado ou fallback demo
    const usuarioId = req.user?.id || 'docente-demo-pluralis-id';
    return this.materialService.criar(dto, usuarioId, ip);
  }

  /**
   * RF05: Consulta de materiais públicos compartilhados.
   */
  @Get('publicos')
  async listarPublicos(
    @Query('q') busca?: string,
    @Query('tipo') tipo?: TipoAdaptacao,
  ) {
    return this.materialService.listarPublicos(busca, tipo);
  }

  /**
   * Lista materiais do docente autenticado.
   */
  @Get('meus')
  async listarMeusMateriais(@Req() req: any) {
    const usuarioId = req.user?.id || 'docente-demo-pluralis-id';
    return this.materialService.listarPorUsuario(usuarioId);
  }

  /**
   * Detalhes de um material.
   */
  @Get(':id')
  async buscarPorId(@Param('id') id: string, @Req() req: any) {
    const usuarioId = req.user?.id;
    return this.materialService.buscarPorId(id, usuarioId);
  }

  /**
   * Atualização do material.
   */
  @Put(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() dto: AtualizarMaterialDto,
    @Ip() ip: string,
    @Req() req: any,
  ) {
    const usuarioId = req.user?.id || 'docente-demo-pluralis-id';
    return this.materialService.atualizar(id, dto, usuarioId, ip);
  }

  /**
   * Remoção de material.
   */
  @Delete(':id')
  async remover(
    @Param('id') id: string,
    @Ip() ip: string,
    @Req() req: any,
  ) {
    const usuarioId = req.user?.id || 'docente-demo-pluralis-id';
    return this.materialService.remover(id, usuarioId, ip);
  }

  /**
   * RF06: Envio de reporte de conteúdo inadequado ou sugestão de melhoria.
   */
  @Post(':id/reportar')
  async reportar(
    @Param('id') id: string,
    @Body('motivo') motivo: string,
    @Ip() ip: string,
    @Req() req: any,
  ) {
    const usuarioId = req.user?.id;
    return this.materialService.reportarInadequacao(id, motivo, usuarioId, ip);
  }
}

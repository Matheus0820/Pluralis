import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CapacitacaoService } from './capacitacao.service';

@Controller('capacitacao')
export class CapacitacaoController {
  constructor(private readonly capacitacaoService: CapacitacaoService) {}

  /**
   * RF01: Módulos de capacitação docente em educação inclusiva.
   */
  @Get('trilhas')
  async listarTrilhas() {
    return this.capacitacaoService.listarTrilhas();
  }

  /**
   * RF03: Biblioteca de Prompts prontos para uso.
   */
  @Get('prompts')
  async listarPrompts(@Query('categoria') categoria?: string) {
    return this.capacitacaoService.listarPrompts(categoria);
  }

  @Post('prompts')
  async cadastrarPrompt(
    @Body()
    body: {
      titulo: string;
      descricao: string;
      template_prompt: string;
      categoria?: string;
    },
  ) {
    return this.capacitacaoService.cadastrarPrompt(body);
  }
}

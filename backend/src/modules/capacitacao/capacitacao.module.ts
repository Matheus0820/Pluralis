import { Module } from '@nestjs/common';
import { CapacitacaoController } from './capacitacao.controller';
import { CapacitacaoService } from './capacitacao.service';

@Module({
  controllers: [CapacitacaoController],
  providers: [CapacitacaoService],
  exports: [CapacitacaoService],
})
export class CapacitacaoModule {}

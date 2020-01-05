import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/components/database';
import { Ticket } from '@/server/models/ticket';

import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [DatabaseModule.forFeature([() => Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}

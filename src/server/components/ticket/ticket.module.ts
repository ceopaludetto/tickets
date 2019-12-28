import { Module } from '@nestjs/common';

import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { DatabaseModule } from '@/server/components/database';

@Module({
  imports: [DatabaseModule.forFeature([() => Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}

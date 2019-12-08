import { Module } from '@nestjs/common';

import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { DatabaseModule } from '@/server/components/Database';
import { Label } from '@/server/components/Label';

@Module({
  imports: [DatabaseModule.forFeature([Ticket, Label])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}

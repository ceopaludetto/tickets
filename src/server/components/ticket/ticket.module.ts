import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Ticket, Label } from '@/server/models';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { LABEL, TICKET } from '@/server/utils/constants';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Ticket,
        schemaOptions: {
          timestamps: true,
          collection: TICKET,
        },
      },
      {
        typegooseClass: Label,
        schemaOptions: {
          timestamps: true,
          collection: LABEL,
        },
      },
    ]),
  ],
  providers: [TicketService, TicketResolver],
  exports: [TicketService],
})
export class TicketModule {}

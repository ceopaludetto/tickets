import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { TicketService } from './ticket.service';
import { TicketInput } from './ticket.dto';
import { FindOneParam } from '@/server/utils/common.dto';

@Controller('ticket')
export class TicketController {
  public constructor(private readonly ticketsService: TicketService) {}

  @Get('/')
  public async findAllTickets() {
    return this.ticketsService.findAll();
  }

  @Get('/:id')
  public async findOneTicket(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Post('/')
  public async createTicket(@Body() data: TicketInput) {
    return this.ticketsService.createOrUpdate(data);
  }

  @Put('/:id')
  public async updateTicket(@Body() data: TicketInput, @Param() { id }: FindOneParam) {
    return this.ticketsService.createOrUpdate(data, id);
  }

  @Delete('/:id')
  public async deleteTicket(@Param() { id }: FindOneParam) {
    return this.ticketsService.delete(id);
  }
}

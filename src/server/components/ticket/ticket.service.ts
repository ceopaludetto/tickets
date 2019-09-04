import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { Ticket, TicketInput } from '@/server/models';
import { ID } from '@/server/utils/common.dto';

export class TicketService {
  private ticketRepository: ModelType<Ticket>;

  public constructor(@InjectModel(Ticket) ticketRepo: ModelType<Ticket>) {
    this.ticketRepository = ticketRepo;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    try {
      const tickets = await this.ticketRepository
        .find()
        .skip(skip)
        .limit(take)
        .populate('usuario')
        .exec();
      return tickets;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: ID) {
    try {
      const ticket = await this.ticketRepository.findById(id).exec();
      if (!ticket) {
        throw new NotFoundException('Ticket não encontrado');
      }
      return ticket;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate(data: TicketInput, id?: ID) {
    if (!id) {
      try {
        const empresa = await this.ticketRepository.create(data);
        return empresa;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const empresa = await this.ticketRepository
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return empresa;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

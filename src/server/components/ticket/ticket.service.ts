import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { ApolloError, UserInputError } from 'apollo-server-express';

import { Ticket, TicketInput } from '@/server/models';
import { ID } from '@/server/utils/common.dto';

@Injectable()
export class TicketService {
  private ticketRepository: ModelType<Ticket>;

  public constructor(@InjectModel(Ticket) ticketRepo: ModelType<Ticket>) {
    this.ticketRepository = ticketRepo;
  }

  public async findAll(skip = 0, take = 100) {
    try {
      const tickets = await this.ticketRepository
        .find()
        .skip(skip)
        .limit(take)
        .populate('usuario')
        .exec();
      return tickets;
    } catch (err) {
      throw new ApolloError(err);
    }
  }

  public async findOne(id: ID) {
    try {
      const ticket = await this.ticketRepository.findById(id).exec();
      if (!ticket) {
        throw new UserInputError('Ticket não encontrado', {
          field: '_id',
        });
      }
      return ticket;
    } catch (err) {
      throw new ApolloError(err);
    }
  }

  public async createOrUpdate(data: TicketInput, id?: ID) {
    if (!id) {
      try {
        const empresa = await this.ticketRepository.create(data);
        return empresa;
      } catch (err) {
        throw new ApolloError(err);
      }
    }

    try {
      const empresa = await this.ticketRepository
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return empresa;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}

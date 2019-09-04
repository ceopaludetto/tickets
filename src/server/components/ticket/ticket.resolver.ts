import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

import { Ticket, TicketInput, TicketUpdateArgs } from '@/server/models';
import {
  CommonFindAllArgs,
  CommonFindOneArgs,
} from '@/server/utils/common.dto';
import { TicketService } from './ticket.service';
import { PUB_SUB, TICKET_ASYNC_ITERATOR } from '@/server/utils/constants';

@Resolver(() => Ticket)
export class TicketResolver {
  private ticketService: TicketService;

  private pubSub: PubSub;

  public constructor(
    ticketService: TicketService,
    @Inject(PUB_SUB) pubSub: PubSub
  ) {
    this.ticketService = ticketService;
    this.pubSub = pubSub;
  }

  @Query(() => [Ticket])
  public async findAllTickets(@Args() { skip, take }: CommonFindAllArgs) {
    const tickets = await this.ticketService.findAll(skip, take);
    return tickets;
  }

  @Query(() => Ticket)
  public async findTicket(@Args() { _id }: CommonFindOneArgs) {
    const ticket = await this.ticketService.findOne(_id);
    return ticket;
  }

  @Mutation(() => Ticket)
  public async addTicket(@Args('input') input: TicketInput) {
    const ticket = await this.ticketService.createOrUpdate(input);

    this.pubSub.publish(TICKET_ASYNC_ITERATOR, ticket);

    return ticket;
  }

  @Mutation(() => Ticket)
  public async updateTicket(@Args() { input, _id }: TicketUpdateArgs) {
    const ticket = await this.ticketService.createOrUpdate(input, _id);
    return ticket;
  }

  @Subscription(() => Ticket)
  public watchTickets() {
    return this.pubSub.asyncIterator(TICKET_ASYNC_ITERATOR);
  }
}

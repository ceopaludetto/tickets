import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { InjectModel, InjectSequelize, Sequelize } from '@/server/components/Database';
import { CreateOrUpdateTicketDto } from './ticket.dto';
import { Ticket } from './ticket.entity';
import { Label } from '@/server/components/Label';

@Injectable()
export class TicketService {
  public constructor(
    @InjectModel(Ticket) private readonly ticketsRepository: typeof Ticket,
    @InjectModel(Label) private readonly labelRepository: typeof Label,
    @InjectSequelize() private readonly sequelize: Sequelize
  ) {}

  public async findAll() {
    try {
      return this.ticketsRepository.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      return this.ticketsRepository.findByPk(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate({ label, ...rest }: CreateOrUpdateTicketDto, id?: string) {
    try {
      if (!id) {
        return this.sequelize.transaction(async t => {
          const ticket = await this.ticketsRepository.create(rest, { transaction: t });
          if (label.length) {
            await Promise.all(
              label.map(async l => this.labelRepository.create({ ...l, ticketID: ticket.id }, { transaction: t }))
            );
          }
          return ticket;
        });
      }

      return this.sequelize.transaction(async t => {
        const ticket = await this.ticketsRepository.findByPk(id, { transaction: t });
        if (!ticket) {
          throw new NotFoundException('Falha ao encontrar ticket');
        }

        if (label.length) {
          await this.labelRepository.destroy({ where: { ticketID: ticket.id }, transaction: t });
          const labels = await Promise.all(
            label.map(async l => this.labelRepository.create({ ...l, ticketID: ticket.id }, { transaction: t }))
          );
          ticket.labels = labels;
        }
        const updated = await ticket.update(rest, { transaction: t });
        return updated.reload({ transaction: t });
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async delete(id: string) {
    try {
      const ticket = await this.ticketsRepository.findByPk(id);
      if (!ticket) {
        throw new NotFoundException('Falha ao encontrar ticket');
      }
      await ticket.destroy();
      return ticket;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { InjectModel, InjectSequelize, Sequelize } from '@/server/components/database';
import { Rotulo } from '@/server/models/rotulo';
import { TicketInput, Ticket } from '@/server/models/ticket';

@Injectable()
export class TicketService {
  public constructor(
    @InjectModel(() => Rotulo) private readonly rotuloRepository: typeof Rotulo,
    @InjectModel(() => Ticket) private readonly ticketsRepository: typeof Ticket,
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

  public async createOrUpdate({ rotulos, ...rest }: TicketInput, id?: string) {
    try {
      if (!id) {
        return this.sequelize.transaction(async t => {
          const ticket = await this.ticketsRepository.create(rest, { transaction: t });
          if (rotulos && rotulos.length) {
            await Promise.all(
              rotulos.map(async r => this.rotuloRepository.create({ ...r, ticketID: ticket.id }, { transaction: t }))
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

        if (rotulos && rotulos.length) {
          await this.rotuloRepository.destroy({ where: { ticketID: ticket.id }, transaction: t });
          const rotulo = await Promise.all(
            rotulos.map(async r => this.rotuloRepository.create({ ...r, ticketID: ticket.id }, { transaction: t }))
          );
          ticket.rotulos = rotulo;
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

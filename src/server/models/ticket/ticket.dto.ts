import { LabelInputDTO } from '@/server/models/label/label.dto';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface TicketDTO extends BaseEntityDTO {
  nome?: string;
  descricao: string;
  labels?: LabelInputDTO[];
}

export interface TicketInputDTO {
  nome?: string;
  descricao?: string;
  labels?: LabelInputDTO[];
}

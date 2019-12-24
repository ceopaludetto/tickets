import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

import { F3DeskError } from '@/server/utils/exception.filter';

export class ApiError extends Error implements F3DeskError {
  public status: HttpStatus;

  public type: F3DeskError['type'] = 'Other';

  public context: any; // eslint-disable-line react/static-property-placement

  public constructor({ message, status = HttpStatus.BAD_REQUEST, type, context }: F3DeskError) {
    super(message);

    this.status = status;
    this.type = type;
    this.context = context;
  }
}

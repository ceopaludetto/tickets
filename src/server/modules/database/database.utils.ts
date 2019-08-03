import { Inject } from '@nestjs/common';

export const InjectRepository = <T>(entity: T) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Inject(((entity as any) as { name: string }).name.toUpperCase());

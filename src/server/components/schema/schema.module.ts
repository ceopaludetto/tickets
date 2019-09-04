import { Module } from '@nestjs/common';

import { SchemaProvider } from './schema.provider';

@Module({
  providers: [SchemaProvider],
  exports: [SchemaProvider],
})
export class SchemaModule {}

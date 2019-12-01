import { StringSchema, TestOptionsMessage } from 'yup';

declare module 'yup' {
  export interface StringSchema<T extends string | null | undefined = string> extends Schema<T> {
    length(limit: number | Ref, message?: StringLocale['length']): StringSchema<T>;
    min(limit: number | Ref, message?: StringLocale['min']): StringSchema<T>;
    max(limit: number | Ref, message?: StringLocale['max']): StringSchema<T>;
    matches(
      regex: RegExp,
      messageOrOptions?: StringLocale['matches'] | { message?: StringLocale['matches']; excludeEmptyString?: boolean }
    ): StringSchema<T>;
    email(message?: StringLocale['email']): StringSchema<T>;
    url(message?: StringLocale['url']): StringSchema<T>;
    ensure(): StringSchema<T>;
    trim(message?: StringLocale['trim']): StringSchema<T>;
    lowercase(message?: StringLocale['lowercase']): StringSchema<T>;
    uppercase(message?: StringLocale['uppercase']): StringSchema<T>;
    nullable(isNullable?: true): StringSchema<T | null>;
    nullable(isNullable: false): StringSchema<Exclude<T, null>>;
    nullable(isNullable?: boolean): StringSchema<T>;
    required(message?: TestOptionsMessage): StringSchema<Exclude<T, undefined>>;
    notRequired(): StringSchema<T | undefined>;
    cnpj(message?: TestOptionsMessage): StringSchema<T>;
    cpf(message?: TestOptionsMessage): StringSchema<T>;
  }
}

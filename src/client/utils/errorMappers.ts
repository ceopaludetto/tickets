import { isApolloError } from 'apollo-client';
import { ValidationError } from 'class-validator';

interface SetFieldErrorType<T> {
  setFieldError: (field: keyof T, error: string) => void;
}

interface ClassValidatorMapperOpts<T> extends SetFieldErrorType<T> {
  maps?: Partial<{ [P in keyof T]: string }>;
}

export function classValidatorMapper<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  { setFieldError, maps }: ClassValidatorMapperOpts<T>
) {
  if (isApolloError(err)) {
    if (err.networkError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const firstError = (err.networkError as any).result.errors[0];

      if (firstError && firstError.message) {
        if (firstError.message.message && Array.isArray(firstError.message.message)) {
          firstError.message.message.forEach((m: Omit<ValidationError, 'property'> & { property: keyof T }) => {
            const firstKey = Object.keys(m.constraints)[0];

            setFieldError(
              maps && maps[m.property] ? (maps[m.property] as keyof T) : (m.property as keyof T),
              m.constraints[firstKey]
            );
          });
        }
      }
    }
  }
}

export function fieldLevelErrorMapper<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  { setFieldError }: SetFieldErrorType<T>
) {
  if (isApolloError(err)) {
    if (err.graphQLErrors) {
      const firstError = err.graphQLErrors[0];

      if (firstError && firstError.extensions) {
        const { field } = firstError.extensions.exception;

        setFieldError(field, firstError.message);
      }
    }
  }
}

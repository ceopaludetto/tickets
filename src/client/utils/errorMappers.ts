import { isApolloError } from 'apollo-client';
import { ValidationError } from 'class-validator';

interface SetFieldErrorType {
  setFieldError: (field: string, error: string) => void;
}

interface ClassValidatorMapperOpts extends SetFieldErrorType {
  maps?: { [key: string]: string };
}

export function classValidatorMapper(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  { setFieldError, maps = {} }: ClassValidatorMapperOpts
) {
  if (isApolloError(err)) {
    if (err.networkError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const firstError = (err.networkError as any).result.errors[0];

      if (firstError && firstError.message) {
        if (
          firstError.message.message &&
          Array.isArray(firstError.message.message)
        ) {
          firstError.message.message.forEach((m: ValidationError) => {
            const firstKey = Object.keys(m.constraints)[0];

            setFieldError(
              maps[m.property] ? maps[m.property] : m.property,
              m.constraints[firstKey]
            );
          });
        }
      }
    }
  }
}

export function fieldLevelErrorMapper(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  { setFieldError }: SetFieldErrorType
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

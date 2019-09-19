import React from 'react';
import { FieldProps, Field } from 'formik';

import { Calendar, CalendarProps } from '@/client/components/form';

interface FormikCalendarProps extends CalendarProps {
  setFieldValue: (name: string, value: Date) => void;
  setFieldTouched: (name: string) => void;
}

export function FormikCalendar({
  name,
  setFieldValue,
  setFieldTouched,
  ...rest
}: FormikCalendarProps) {
  return (
    <Field name={name}>
      {({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        field: { value, ...fieldProps },
        form: { touched, errors },
      }: FieldProps) => (
        <Calendar
          {...fieldProps}
          {...rest}
          errors={
            touched[fieldProps.name] && errors[fieldProps.name]
              ? errors[fieldProps.name]
              : undefined
          }
          onChange={date => setFieldValue(fieldProps.name, date)}
          onBlur={() => setFieldTouched(fieldProps.name)}
        />
      )}
    </Field>
  );
}

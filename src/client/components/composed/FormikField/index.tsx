import React from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { FilledInput, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { Field, FieldProps } from 'formik';

export type FormikFieldProps = Omit<TextFieldProps, 'name'> & MaskedInputProps & { name: string };

interface TextMaskCustomProps extends MaskedInputProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

export function FormikField({
  name,
  label,
  mask,
  id,
  helperText,
  InputProps,
  margin,
  placeholderChar = '_',
  showMask = false,
  guide = true,
  disabled,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant = 'filled',
  ...props
}: FormikFieldProps) {
  function TextMaskCustom({ inputRef, ...other }: TextMaskCustomProps) {
    return (
      <MaskedInput
        {...other}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={(ref: any) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={mask}
        guide={guide}
        placeholderChar={placeholderChar}
        showMask={showMask}
      />
    );
  }

  return (
    <Field
      name={name}
      render={({ field, form }: FieldProps) => (
        <FormControl margin={margin} variant={variant} error={!!(form.touched[field.name] && form.errors[field.name])}>
          <>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <FilledInput
              id={id}
              {...field}
              {...props}
              {...InputProps}
              disabled={form.isSubmitting || disabled}
              inputComponent={mask ? (TextMaskCustom as any) : undefined} // eslint-disable-line @typescript-eslint/no-explicit-any
            />
            {((form.touched[field.name] && form.errors[field.name]) || helperText) && (
              <FormHelperText>{form.errors[field.name] || helperText}</FormHelperText>
            )}
          </>
        </FormControl>
      )}
    />
  );
}

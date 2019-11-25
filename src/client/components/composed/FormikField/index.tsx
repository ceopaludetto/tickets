import React, { useCallback } from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { FilledInput, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { useField, useFormikContext } from 'formik';

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
  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const TextMaskCustom = useCallback(
    ({ inputRef, ...other }: TextMaskCustomProps) => (
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
    ),
    [mask, guide, placeholderChar, showMask]
  );

  return (
    <FormControl margin={margin} variant={variant} error={!!(meta.touched && !!meta.error)}>
      <>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <FilledInput
          id={id}
          {...field}
          {...props}
          {...InputProps}
          disabled={isSubmitting || disabled}
          inputComponent={mask ? (TextMaskCustom as any) : undefined} // eslint-disable-line @typescript-eslint/no-explicit-any
        />
        {((meta.touched && !!meta.error) || !!helperText) && (
          <FormHelperText>{meta.error || helperText}</FormHelperText>
        )}
      </>
    </FormControl>
  );
}

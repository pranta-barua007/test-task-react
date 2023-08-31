import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import Input, { type FormInputProps } from "@/app/ui/Input";

type IRHTFormInputProps = {
  name: string;
} & FormInputProps;

const RHFormInput = ({ name, ...other }: IRHTFormInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <Input {...field} errorMessage={error?.message} {...other} />
      )}
    />
  );
};

export default RHFormInput;

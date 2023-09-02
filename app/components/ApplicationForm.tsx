"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  applicationFormSchema,
  type IApplicationFormSchema,
} from "@/app/lib/validationSchema";

import Button from "../ui/Button";
import Input from "../ui/Input";

import { cn } from "../utils/cn";
import { Sector } from "../types/types";
import GroupSelect from "../ui/select/GroupSelect";

type IApplicationForm = {
  initialSectors: Sector[]
}

const ApplicationForm = ({ initialSectors }: IApplicationForm) => {
  const methods = useForm<IApplicationFormSchema>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: ({
      fullName: '',
      sectors: [],
      consent: false
    })
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
    setValue, 
    getValues
  } = methods;

  const onSubmit: SubmitHandler<IApplicationFormSchema> = (data) =>
    console.log(data);

    
  return (
    <form className="w-full h-auto" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        errorMessage={errors.fullName?.message}
        {...register("fullName")}
      />
      <GroupSelect 
        multiple
        options={initialSectors}
        value={getValues('sectors')}
        onChange={(v) => setValue('sectors', v as any, {shouldValidate: true})}
      />
      <div className="flex">
        <input
          type="checkbox"
          className="checked:bg-blue-500 mr-2"
          {...register("consent")}
        />
        <p className={cn(errors.consent ? "text-rose-500" : "text-black")}>
          Agree to terms
        </p>
      </div>
      {JSON.stringify(errors
        )}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ApplicationForm;

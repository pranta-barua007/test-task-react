"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  applicationFormSchema,
  type IApplicationFormSchema,
} from "@/app/lib/validationSchema";

import RHFormInput from "./RHFInput";
import Button from "../ui/Button";
import { cn } from "../lib/cn";

const ApplicationForm = () => {
  const methods = useForm<IApplicationFormSchema>({
    resolver: zodResolver(applicationFormSchema),
  });

  const { reset, handleSubmit, register, formState: {errors} } = methods;

  const onSubmit: SubmitHandler<IApplicationFormSchema> = (data) =>
    console.log(data);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFormInput name="name" label="Name" type="text" />
        <div className="flex">
          <input
            type="checkbox"
            className="checked:bg-blue-500 mr-2"
            {...register("consent")}
          />
          <p className={cn(errors.consent ? "text-rose-500" : "text-black")}>Agree to terms</p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default ApplicationForm;

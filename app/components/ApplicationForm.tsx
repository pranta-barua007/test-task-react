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

const ApplicationForm = () => {
  const methods = useForm<IApplicationFormSchema>({
    resolver: zodResolver(applicationFormSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IApplicationFormSchema> = (data) =>
    console.log(data);
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        errorMessage={errors.fullName?.message}
        {...register("fullName")}
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
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ApplicationForm;

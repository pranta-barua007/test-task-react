"use client";

import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  applicationFormSchema,
  type IApplicationFormSchema,
} from "@/app/lib/validationSchema";

import Button from "../ui/Button";
import Input from "../ui/Input";
import GroupSelect from "./GroupSelect/GroupSelect";

import { cn } from "../utils/cn";
import { type Sector } from "../types/types";
import axios from "axios";

type IApplicationForm = {
  initialSectors: Sector[];
  asyncDefaultValues?: IApplicationFormSchema;
  applicationId?: string;
};

const ApplicationForm = ({
  initialSectors,
  asyncDefaultValues,
  applicationId,
}: IApplicationForm) => {
  const router = useRouter();
  const methods = useForm<IApplicationFormSchema>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: asyncDefaultValues
      ? asyncDefaultValues
      : {
          fullName: "",
          sectors: [],
          consent: false,
        },
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = methods;

  const onSubmit: SubmitHandler<IApplicationFormSchema> = async (data) => {
    const axiosAction: Promise<any> =
      asyncDefaultValues && applicationId
        ? axios.patch(`/api/submissions/${applicationId}`, data)
        : axios.post("/api/submissions", data);

    try {
      const saveApplicationReq = axiosAction;
      const result = (await saveApplicationReq).data;
      
      if (result.success) {
        reset();
        router.push(`/search/${result.data.id}`);
      }
    } catch (err) {
      alert("Something went wrong, Try again!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          errorMessage={errors.fullName?.message}
          {...register("fullName")}
        />
        <GroupSelect
          multiple
          options={initialSectors}
          value={getValues("sectors")}
          onChange={(v) =>
            setValue("sectors", v as any, { shouldValidate: true })
          }
          label="Select Desiered Sectors"
          errorMessage={errors.sectors?.message}
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
        <Button disabled={isSubmitting} type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default ApplicationForm;

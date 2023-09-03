"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";

import Input from "../ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const seacrhScema = z.object({
  applicationId: z.string().min(24, { message: "Must be 24 characters" }),
});

type ISearchSchema = z.infer<typeof seacrhScema>;

type ISearchForm = {
  defaultValue?: string;
};

function SearchForm({ defaultValue }: ISearchForm) {
  const router = useRouter();

  const methods = useForm<ISearchSchema>({
    resolver: zodResolver(seacrhScema),
    defaultValues: {
      applicationId: defaultValue ? defaultValue : "",
    },
  });

  const { handleSubmit, register, formState: {errors} } = methods;

  const onSubmit: SubmitHandler<ISearchSchema> = async (data) => {
    router.push(`/search/${data.applicationId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="search" label="Seach" {...register("applicationId")} errorMessage={errors.applicationId?.message} />
    </form>
  );
}

export default SearchForm;
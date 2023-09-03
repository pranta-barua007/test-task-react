import {notFound} from "next/navigation"
import SearchForm from "@/app/components/SearchForm";
import ApplicationForm from "@/app/components/ApplicationForm";
import { Sector } from "@/app/types/types";

type ISearchById = {
  params: {
    applicationId: string;
  };
};

async function SearchById({ params }: ISearchById) {
  let initialSectors: Sector[] = [];

  const req = await fetch(
    `${process.env.ORIGIN_URL}/api/submissions/${params.applicationId}`,
    {cache: 'no-store'}
  );
  
  const data = await req.json();

  if(data.error) {
   notFound()
  }

  try {
    const req = await fetch(`${process.env.ORIGIN_URL}/api/sectors/base`);
    const data = (await req.json()) as Sector[];

    if (data.length > 0) {
      initialSectors = data;
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="w-[400px] xl:w-4/12 rounded-md">
          <SearchForm defaultValue={params.applicationId} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between p-10 xl:p-18 gap-8">
        <div className="w-[400px] xl:w-4/12 bg-white p-14 xl:p-20 rounded-md">
          <h2 className="text-3xl font-bold text-center mb-8">
            Application Form
          </h2>
          <p className="text-center mb-8 text-slate-400">
            Update your credentials
          </p>
          <ApplicationForm
            initialSectors={initialSectors}
            asyncDefaultValues={data}
            applicationId={params.applicationId}
          />
        </div>
      </div>
    </>
  );
}

export default SearchById;

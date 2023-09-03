import ApplicationForm from "../components/ApplicationForm";
import { Sector } from "../types/types";

export default async function Home() {
  let initialSectors: Sector[] = [];

  try {
    const req = await fetch(`${process.env.ORIGIN_URL}/api/sectors/base`);
    const data = await req.json() as Sector[];
  
    if(data.length > 0) {
      initialSectors = data
    }
  }catch(err) {
    console.error(err)
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-between p-20 xl:p-24 gap-8">
        <div className="w-[400px] xl:w-4/12 bg-white p-14 xl:p-20 rounded-md">
          <h2 className="text-3xl font-bold text-center mb-8">Application Form</h2>
          <p className="text-center mb-8 text-slate-400">Please enter your name and pick the Sectors you are currently involved in.</p>
          <ApplicationForm initialSectors={initialSectors}/>
        </div>
      </div>
    </main>
  )
}

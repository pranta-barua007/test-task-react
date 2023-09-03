import ApplicationForm from "../components/ApplicationForm";
import { Sector } from "../types/types";

export default async function Home() {
  let initialSectors: Sector[] = [];

  try {
    const req = await fetch('http://localhost:3000/api/sectors/base');
    const data = await req.json() as Sector[];
  
    if(data.length > 0) {
      initialSectors = data
    }
  }catch(err) {
    console.error(err)
  }

  return (
    <main className="">
      <div className="flex flex-col items-center justify-between p-24 gap-8">
        <div className="w-4/12 bg-white p-20 rounded-md">
          <h2 className="text-3xl font-bold text-center mb-8">Application Form</h2>
          <ApplicationForm initialSectors={initialSectors}/>
        </div>
      </div>
    </main>
  )
}

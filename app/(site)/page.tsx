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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ApplicationForm initialSectors={initialSectors}/>
    </main>
  )
}

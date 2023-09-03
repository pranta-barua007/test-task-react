import SearchForm from '@/app/components/SearchForm'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div className="w-[400px] xl:w-4/12 rounded-md">
        <SearchForm />
      </div>
      <p className='text-3xl text-red-700'>Not Found! Please provide correct application Id</p>
    </div>
  )
}
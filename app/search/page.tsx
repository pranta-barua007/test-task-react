import SearchForm from "../components/SearchForm";

function Search() {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div className="w-[400px] xl:w-4/12 rounded-md">
        <SearchForm />
      </div>
    </div>
  );
}

export default Search;

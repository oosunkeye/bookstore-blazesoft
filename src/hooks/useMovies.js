import useFetchUrl from "./useFetchUrl";
import book from "../bookData";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=d0f5f2e135336200362af8a1a73acb17";

// console.log(book);

const useMovies = () => {
  const res = useFetchUrl(book);
  console.log(res);
  return res[0] !== null ? res[0].results : res;
};

export default useMovies;

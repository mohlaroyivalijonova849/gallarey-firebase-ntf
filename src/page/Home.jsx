import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 10;

function Home() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setErrorMsg("");
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg("Error fetching images. Try again later.");
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  };

  return (
    <div className="container w-full mx-auto flex flex-col items-center justify-center pt-4">
      <form
        role="form"
        className="flex rounded-full search-input"
        onSubmit={handleSearch}
      >
        <div className="join">
          <div>
            <div>
              <input
                className="input input-bordered join-item w-[500px]"
                placeholder="Search"
                ref={searchInput}
              />
            </div>
          </div>
          <div className="indicator">
            <button className="btn join-item">Search</button>
          </div>
        </div>
      </form>
      <div className="flex flex-wrap items-center justify-center gap-x-6">
        {images.map((image) => {
          return (
            <Card
              image={image}
              key={image.id}
              imageId={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              desc={image.description}
              approved={image?.topic_submissions?.wallpapers?.status}
              likes={image.likes}
              downloadURL={image?.links?.download}
              slug={image?.slug}
              avatar={image?.user?.profile_image?.medium}
              username={image?.user?.name}
            />
          );
        })}
      </div>
      <div className="align-elements justify-between mb-10 mt-8">
        <div className="join">
          {page > 1 && (
            <button
              className="join-item btn btn-outline"
              onClick={() => setPage(page - 1)}
            >
              previous
            </button>
          )}
          {page < totalPages && (
            <button
              className="join-item btn btn-outline"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

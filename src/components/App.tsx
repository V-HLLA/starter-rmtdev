import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useDebounce, useJobSearchResults } from "../lib/hooks";
import { Toaster } from "react-hot-toast";

function App() {
  //state
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 300);
  const { jobItems, isLoading } = useJobSearchResults(debouncedValue);
  const [currentPage, setCurrentPage] = useState(1);

  // derived / computed state
  const jobItemsSliced =
    jobItems?.slice(currentPage * 7 - 7, currentPage * 7) || [];
  const displayedCount = jobItemsSliced?.length || 0;
  const resultsCount = jobItems?.length || 0;
  const totalNumberOfPages = resultsCount / 7;

  // event handlers / actions
  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      if (currentPage === 1) {
        return;
      } else {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount
              resultsCount={resultsCount}
              displayedCount={displayedCount}
            />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls
            onClick={handleChangePage}
            Page={currentPage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position={"top-right"} />
    </>
  );
}

export default App;

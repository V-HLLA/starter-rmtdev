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
import { useDebounce, useJobsItems } from "../lib/hooks";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 300);
  const {
    jobItemsSliced: jobItems,
    isLoading,
    resultsCount,
    displayedCount,
  } = useJobsItems(debouncedValue);

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

          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;

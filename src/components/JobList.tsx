import { useActiveID } from "../lib/hooks";
import { TJobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type TJoblistProps = {
  jobItems: TJobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: TJoblistProps) {
  const activeID = useActiveID();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeID}
          />
        ))}
    </ul>
  );
}

export default JobList;

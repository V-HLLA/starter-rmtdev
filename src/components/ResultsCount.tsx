type TresultsCount = {
  resultsCount: number;
  displayedCount: number;
};

export default function ResultsCount({
  resultsCount,
  displayedCount,
}: TresultsCount) {
  return (
    <p className="count">{`${displayedCount} out of ${resultsCount} total results`}</p>
  );
}

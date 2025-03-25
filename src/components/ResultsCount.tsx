type TresultsCount = {
  resultsCount: number;
  displayedCount: number;
};

export default function ResultsCount({
  resultsCount,
  displayedCount,
}: TresultsCount) {
  return (
    <p className="count">
      <span className="u-bold">{displayedCount}</span> out of{" "}
      <span className="u-bold">{resultsCount}</span> total results
    </p>
  );
}

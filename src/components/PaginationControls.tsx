import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type TPaginationCrontrolsProps = {
  onClick: (direction: "next" | "previous") => void;
  Page: number;
  totalNumberOfPages: number;
};

export default function PaginationControls({
  onClick,
  Page,
  totalNumberOfPages,
}: TPaginationCrontrolsProps) {
  return (
    <section className="pagination">
      {Page >= 2 ? (
        <button
          onClick={(e) => {
            onClick("previous"), e.currentTarget.blur();
          }}
          className="pagination__button"
        >
          <ArrowLeftIcon />
          Page {Page - 1}
        </button>
      ) : null}
      {Page < totalNumberOfPages && (
        <button
          onClick={(e) => {
            onClick("next"), e.currentTarget.blur();
          }}
          className="pagination__button pagination__button--next"
        >
          <ArrowRightIcon />
          Page {Page + 1}
        </button>
      )}
    </section>
  );
}

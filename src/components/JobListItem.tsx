import BookmarkIcon from "./BookmarkIcon";

type TJobItem = {
  badgeLetters: string;
  title: string;
  company: string;
  id: number;
  daysAgo: number;
  relevanceScore: number;
};

type TJobListItemProps = {
  jobItem: TJobItem;
};

export default function JobListItem({ jobItem }: TJobListItemProps) {
  return (
    <li className="job-item">
      <a className="job-item__link">
        <div className="job-item__badge">{jobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem.title}</h3>
          <p className="job-item__company">{jobItem.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}

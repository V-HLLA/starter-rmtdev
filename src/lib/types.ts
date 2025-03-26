export type TJobItem = {
  badgeLetters: string;
  title: string;
  company: string;
  id: number;
  daysAgo: number;
  relevanceScore: number;
};
export type TJobItemExpanded = TJobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
};

export type TJobItemApiResponse = {
  public: boolean;
  jobItem: TJobItemExpanded;
};

export type TJobListApiResponse = TJobItemApiResponse & {
  sorted: boolean;
  jobItems: TJobItem[];
};

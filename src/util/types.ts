export type ArticleProps = {
  title: string;
  content: string;
  version: number;
  newest: boolean;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
};

export type Articles = {
  title: string;
  content: string;
  version: number;
  newest: boolean;
};

export type Page = {
  startPage: number;
  endPage: number;
  prev: false;
  next: false;
  total: number;
};

export type Faqs = { 
    createDate: number,
    id: string,
    article: Articles
};

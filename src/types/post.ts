export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author?: string;
  tags?: string[];
  contentHtml: string;
}

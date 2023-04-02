export interface PostData {
  slug: string;
  title: string;
  date: string;
  author?: string;
  tags?: string[];
  contentHtml: string;
}

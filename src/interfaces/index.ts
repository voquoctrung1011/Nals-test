interface IBlogType {
  id: string;
  createdAt: string;
  title: string;
  content: string;
  image: string;
}

interface IParam {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: string;
}

interface IRoute {
  auth: string[];
  component: any;
  path: string;
}

export type { IBlogType, IParam, IRoute };

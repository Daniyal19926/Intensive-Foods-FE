export interface Food {
  _id: string;
  name: string;
  category: Category;
  numberInStock: number;
  price: number;
  isFavoured?: boolean;
}
export interface Category {
  _id: string;
  name: string;
}

export interface Id {
  _id: string;
}

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

export interface TextColumn {
  path: string;
  label: string;
}
export interface ContentColumn<T> {
  key: string;
  content(item: T): JSX.Element;
}

export type Column<T> = TextColumn | ContentColumn<T>;

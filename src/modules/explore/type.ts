export interface CollectionItems {
  label: string;
  level: string;
  shortCode: string;
}

export interface Collection {
  ident: string;
  name: string;
  name_cn: string;
  slug: string;
  items: CollectionItems[];
}

export interface CollectionMenu {
  ident: string;
  name: string;
  name_cn: string;
  items: string[];
  items_info: {
    ident: string;
    name: string;
    name_cn: string;
    slug: string;
  }[];
}

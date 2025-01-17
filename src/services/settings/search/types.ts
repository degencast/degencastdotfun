export interface SearchResult {
  platform: string;
  displayName: string;
  address: string;
  avatar?: string;
  bio?: string;
  description?: string;
  identity?: string;
  header?: string;
  links?: {
    [key: string]: {
      links: string;
    };
  };
}

export interface SearchError {
  platform: string;
  identity?: string;
  error: string;
}

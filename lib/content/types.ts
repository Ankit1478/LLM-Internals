// Shared types for content

export interface Article {
  module: number;
  slug: string;
  title: string;
  description: string;
  readTime: number;
  content: string;
  previousTopic?: { module: number; slug: string; title: string };
  nextTopic?: { module: number; slug: string; title: string };
}

export interface Topic {
  title: string;
  slug: string;
}

export interface SubModule {
  title: string;
  topics: Topic[];
}

export interface Module {
  module: number;
  title: string;
  topics?: Topic[];
  subModules?: SubModule[];
}

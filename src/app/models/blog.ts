export interface Blog {
    idBlog?: number;
    titleBlog: string;
    subtitleBlog?: string;
    subtitleBlog02?: string;
    subtitleBlog03?: string;
    subtitleBlog04?: string;
    subtitleBlog05?: string;
    catBlog: string;
    bodyBlog: string;
    bodyBlog02: string;
    bodyBlog03: string;
    bodyBlog04: string;
    bodyBlog05: string;
    image: string;
    imageBlog: string;
    thumbnail?: string;  // Add this line
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    // Add any other properties you use
  }
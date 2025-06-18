export interface Blog {
    idBlog?: number;
    titleBlog: string;
    subtitleBlog?: string;
    catBlog: string;
    bodyBlog: string;
    image: string;
    imageBlog: string;
    thumbnail?: string;  // Add this line
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    // Add any other properties you use
  }
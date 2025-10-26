export interface Prompt {
  _id: string;
  prompt: string;
  imageUrl: string;
  category?: string;
  tags: string[];
  likes: number;
  views: number;
  userId?: {
    _id: string;
    name: string;
    image: string;
  };
  isTrending: boolean;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  credits: number;
  createdAt: string;
}

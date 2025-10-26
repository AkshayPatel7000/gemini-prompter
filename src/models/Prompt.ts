import { ObjectId } from 'mongodb';

export interface GeneratedPrompt {
  _id?: ObjectId;
  userId: string;
  prompt: string;
  originalImageUrl: string;
  imageBase64?: string;
  metadata: {
    style?: string;
    quality?: string;
    category?: string;
  };
  creditsUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCredits {
  _id?: ObjectId;
  userId: string;
  credits: number;
  totalUsed: number;
  lastUpdated: Date;
}

export interface UserApiKey {
  _id?: ObjectId;
  userId: string;
  geminiApiKey: string;
  isActive: boolean;
  createdAt: Date;
  lastUsed?: Date;
}

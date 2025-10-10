
export interface Location {
  id: string;
  name: string;
  address: string;
}

export interface Review {
  id: string;
  locationId: string;
  author: string;
  authorImageUrl: string;
  rating: number;
  text: string;
  date: string;
  response?: {
    text: string;
    date: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Responder' | 'Viewer';
  avatarUrl: string;
}

export interface TrendData {
  name: string;
  reviews: number;
}

export interface RatingDistribution {
  stars: string;
  count: number;
}

export interface SentimentData {
  name: 'Positive' | 'Neutral' | 'Negative';
  value: number;
}

export interface Keyword {
  text: string;
  value: number;
}

export enum Plan {
  Free = 'Free',
  Starter = 'Starter',
  Professional = 'Professional',
  Business = 'Business',
}

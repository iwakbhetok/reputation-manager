
import type { Location, Review, User, TrendData, RatingDistribution, SentimentData, Keyword } from './types';

export const mockLocations: Location[] = [
  { id: 'loc1', name: 'Artisan Coffee Downtown', address: '123 Main St, Anytown, USA' },
  { id: 'loc2', name: 'The Daily Grind', address: '456 Oak Ave, Anytown, USA' },
  { id: 'loc3', name: 'Sunset Brews', address: '789 Pine Ln, Anytown, USA' },
];

export const mockReviews: Review[] = [
  {
    id: 'rev1',
    locationId: 'loc1',
    author: 'Alice Johnson',
    authorImageUrl: 'https://picsum.photos/seed/alice/40/40',
    rating: 5,
    text: 'Absolutely love the vibe and the coffee here! The staff is incredibly friendly and the espresso is top-notch. A great place to work or catch up with friends. The price is reasonable too!',
    date: '2024-07-20T10:00:00Z',
    response: {
      text: 'Thank you for the kind words, Alice! We are so happy you enjoyed your visit.',
      date: '2024-07-20T12:30:00Z',
    },
  },
  {
    id: 'rev2',
    locationId: 'loc1',
    author: 'Bob Williams',
    authorImageUrl: 'https://picsum.photos/seed/bob/40/40',
    rating: 4,
    text: 'Great coffee and pastries. The place can get a bit crowded during peak hours, which slows down the service, but the quality is worth the wait. The staff always does their best.',
    date: '2024-07-19T14:20:00Z',
  },
  {
    id: 'rev3',
    locationId: 'loc2',
    author: 'Charlie Brown',
    authorImageUrl: 'https://picsum.photos/seed/charlie/40/40',
    rating: 2,
    text: 'My latte was lukewarm and the barista seemed disinterested. Disappointed with the service today, it used to be much better. The price felt too high for the quality I received.',
    date: '2024-07-18T09:05:00Z',
  },
  {
    id: 'rev4',
    locationId: 'loc1',
    author: 'Diana Miller',
    authorImageUrl: 'https://picsum.photos/seed/diana/40/40',
    rating: 5,
    text: 'The cold brew is the best in town! The staff is always welcoming and the atmosphere is perfect for concentrating. I highly recommend this place for any coffee lover.',
    date: '2024-07-17T16:45:00Z',
     response: {
      text: 'Thanks Diana! So glad you love our cold brew. See you soon!',
      date: '2024-07-17T18:00:00Z',
    },
  },
  {
    id: 'rev5',
    locationId: 'loc3',
    author: 'Ethan Davis',
    authorImageUrl: 'https://picsum.photos/seed/ethan/40/40',
    rating: 3,
    text: 'It was okay. The coffee was decent but nothing special. The location is convenient but the seating is a bit uncomfortable for long stays. An average experience overall.',
    date: '2024-07-16T11:00:00Z',
  },
   {
    id: 'rev6',
    locationId: 'loc2',
    author: 'Fiona Garcia',
    authorImageUrl: 'https://picsum.photos/seed/fiona/40/40',
    rating: 5,
    text: 'A hidden gem! The staff are passionate about coffee and it shows. Excellent flat white and a cozy corner to read a book. Will be back for sure!',
    date: '2024-07-20T18:00:00Z',
  },
];

export const mockUsers: User[] = [
  { id: 'user1', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Admin', avatarUrl: 'https://picsum.photos/seed/jane/40/40' },
  { id: 'user2', name: 'John Smith', email: 'john.smith@example.com', role: 'Responder', avatarUrl: 'https://picsum.photos/seed/john/40/40' },
  { id: 'user3', name: 'Sam Wilson', email: 'sam.wilson@example.com', role: 'Viewer', avatarUrl: 'https://picsum.photos/seed/sam/40/40' },
];

export const mockTrendData: TrendData[] = [
  { name: 'Jan', reviews: 12 },
  { name: 'Feb', reviews: 19 },
  { name: 'Mar', reviews: 25 },
  { name: 'Apr', reviews: 22 },
  { name: 'May', reviews: 31 },
  { name: 'Jun', reviews: 28 },
  { name: 'Jul', reviews: 35 },
];

export const mockRatingDistribution: RatingDistribution[] = [
  { stars: '5 Stars', count: 152 },
  { stars: '4 Stars', count: 78 },
  { stars: '3 Stars', count: 31 },
  { stars: '2 Stars', count: 12 },
  { stars: '1 Star', count: 5 },
];

export const mockSentimentData: SentimentData[] = [
    { name: 'Positive', value: 230 },
    { name: 'Neutral', value: 31 },
    { name: 'Negative', value: 17 },
];

export const mockKeywords: Keyword[] = [
    { text: 'staff', value: 89 },
    { text: 'coffee', value: 120 },
    { text: 'price', value: 45 },
    { text: 'service', value: 65 },
    { text: 'atmosphere', value: 72 },
    { text: 'wait', value: 33 },
    { text: 'pastries', value: 28 },
];

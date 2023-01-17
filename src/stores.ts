import { writable } from 'svelte/store';

export const FeedbackStore = writable([
  {
    id: '1',
    rating: 8,
    text: 'best thing ever!',
  },
  {
    id: '2',
    rating: 9,
    text: 'bestest thing eveer!',
  },
]);

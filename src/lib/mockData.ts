export interface Prompt {
  id: string;
  title: string;
  prompt: string;
  imageUrl: string;
  likes: number;
  views: number;
  tags: string[];
  category: string;
  createdAt: string;
  author: string;
}

export const mockPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Cyberpunk City',
    prompt:
      'A neon-lit cyberpunk cityscape at night with flying cars, holographic advertisements, towering skyscrapers with glowing windows, rain-slicked streets reflecting the vibrant lights, in ultra-detailed 8k resolution with cinematic lighting',
    imageUrl:
      'https://images.unsplash.com/photo-1732631486925-8f7e9924f993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY3liZXJwdW5rJTIwY2l0eXxlbnwxfHx8fDE3NjEzNzk4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 1234,
    views: 5678,
    tags: ['cyberpunk', 'city', 'neon', 'futuristic'],
    category: 'Sci-Fi',
    createdAt: '2025-10-20',
    author: 'AIArtist42',
  },
  {
    id: '2',
    title: 'Fantasy Dragon',
    prompt:
      'Majestic dragon perched on a mountain peak, scales shimmering in golden sunset light, wings spread wide against dramatic cloudy sky, fantasy art style, highly detailed, epic composition',
    imageUrl:
      'https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHJhZ29uJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2MTM3OTgzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 892,
    views: 3421,
    tags: ['fantasy', 'dragon', 'mountains', 'sunset'],
    category: 'Fantasy',
    createdAt: '2025-10-21',
    author: 'DragonMaster',
  },
  {
    id: '3',
    title: 'Abstract Colors',
    prompt:
      'Vibrant abstract art with flowing liquid colors, iridescent gradients from purple to teal to orange, smooth swirls and organic shapes, modern digital art, 4k wallpaper quality',
    imageUrl:
      'https://images.unsplash.com/photo-1699568542323-ff98aca8ea6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwYXJ0fGVufDF8fHx8MTc2MTM1NTk4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 2341,
    views: 8923,
    tags: ['abstract', 'colorful', 'gradient', 'modern'],
    category: 'Abstract',
    createdAt: '2025-10-22',
    author: 'ColorWizard',
  },
  {
    id: '4',
    title: 'Mountain Sunset',
    prompt:
      'Breathtaking mountain landscape at golden hour, snow-capped peaks bathed in warm sunset light, alpine meadow with wildflowers in foreground, crystal clear lake reflecting the scene, photorealistic style',
    imageUrl:
      'https://images.unsplash.com/photo-1643559247329-7254c71646f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjEzNzk4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 1567,
    views: 6234,
    tags: ['landscape', 'mountains', 'sunset', 'nature'],
    category: 'Nature',
    createdAt: '2025-10-23',
    author: 'NatureLover',
  },
  {
    id: '5',
    title: 'Space Nebula',
    prompt:
      'Stunning space nebula with swirling cosmic clouds in deep purples and blues, scattered stars twinkling throughout, distant galaxies visible, captured by deep space telescope, ultra high resolution',
    imageUrl:
      'https://images.unsplash.com/photo-1504812333783-63b845853c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMG5lYnVsYSUyMGdhbGF4eXxlbnwxfHx8fDE3NjEzMjc3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 3421,
    views: 12456,
    tags: ['space', 'nebula', 'galaxy', 'cosmic'],
    category: 'Space',
    createdAt: '2025-10-24',
    author: 'CosmicExplorer',
  },
  {
    id: '6',
    title: 'Tropical Paradise',
    prompt:
      'Pristine tropical beach with crystal clear turquoise water, white sand, palm trees swaying in the breeze, small wooden boat in the water, sunny day with few fluffy clouds, vacation paradise vibes',
    imageUrl:
      'https://images.unsplash.com/photo-1702743599501-a821d0b38b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzYxMzYxNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 987,
    views: 4321,
    tags: ['beach', 'tropical', 'paradise', 'vacation'],
    category: 'Nature',
    createdAt: '2025-10-25',
    author: 'BeachVibes',
  },
];

export const categories = [
  'All',
  'Sci-Fi',
  'Fantasy',
  'Abstract',
  'Nature',
  'Space',
  'Architecture',
  'Portrait',
  'Animals',
];

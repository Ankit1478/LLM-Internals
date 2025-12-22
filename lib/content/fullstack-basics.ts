import { Article } from './types';

export const fullstackBasics: Article = {
  module: 0,
  slug: 'fullstack-basics',
  title: 'Complete Basics of Full Stack',
  description: 'Master the fundamentals of full stack development',
  readTime: 5,
  previousTopic: { module: 0, slug: 'quick-start', title: 'Quick Start Guide' },
  nextTopic: { module: 2, slug: 'basic-concepts', title: 'Basic Concepts' },
  content: `# Complete Basics of Full Stack

## Topics Covered

- HTML
- CSS
- JavaScript
- TypeScript
- React
- Next.js
- Node.js
- Express
- MongoDB
- MERN Stack
- Tailwind CSS
- Deployment (Vercel, AWS, DigitalOcean)
`,
};

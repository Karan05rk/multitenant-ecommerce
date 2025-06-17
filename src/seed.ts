import { getPayload } from 'payload';
import config from '@payload-config';

interface Category {
  name: string;
  slug: string;
  color?: string;
  subcategories?: Array<{
    name: string;
    slug: string;
  }>;
}

const categories: Category[] = [
  {
    name: 'All',
    slug: 'all',
  },
  {
    name: 'Business & Money',
    slug: 'business-money',
    color: '#FFB347',
    subcategories: [
      { name: 'Accounting', slug: 'accounting' },
      { name: 'Entrepreneurship', slug: 'entrepreneurship' },
      { name: 'Gigs & Side Projects', slug: 'gigs-side-projects' },
      { name: 'Investing', slug: 'investing' },
      { name: 'Management & Leadership', slug: 'management-leadership' },
      { name: 'Marketing & Sales', slug: 'marketing-sales' },
      { name: 'Networking, Careers & Jobs', slug: 'networking-careers-jobs' },
      { name: 'Personal Finance', slug: 'personal-finance' },
      { name: 'Real Estate', slug: 'real-estate' },
    ],
  },
  {
    name: 'Software Development',
    slug: 'software-development',
    color: '#7EC8E3',
    subcategories: [
      { name: 'Web Development', slug: 'web-development' },
      { name: 'Mobile Development', slug: 'mobile-development' },
      { name: 'Game Development', slug: 'game-development' },
      { name: 'Programming Languages', slug: 'programming-languages' },
      { name: 'DevOps', slug: 'devops' },
    ],
  },
  {
    name: 'Writing & Publishing',
    slug: 'writing-publishing',
    color: '#D8B5FF',
    subcategories: [
      { name: 'Fiction', slug: 'fiction' },
      { name: 'Non-Fiction', slug: 'non-fiction' },
      { name: 'Blogging', slug: 'blogging' },
      { name: 'Copywriting', slug: 'copywriting' },
      { name: 'Self-Publishing', slug: 'self-publishing' },
    ],
  },
  {
    name: 'Other',
    slug: 'other',
  },
  {
    name: 'Education',
    slug: 'education',
    color: '#FFE066',
    subcategories: [
      { name: 'Online Courses', slug: 'online-courses' },
      { name: 'Tutoring', slug: 'tutoring' },
      { name: 'Test Preparation', slug: 'test-preparation' },
      { name: 'Language Learning', slug: 'language-learning' },
    ],
  },
  {
    name: 'Self Improvement',
    slug: 'self-improvement',
    color: '#96E6B3',
    subcategories: [
      { name: 'Productivity', slug: 'productivity' },
      { name: 'Personal Development', slug: 'personal-development' },
      { name: 'Mindfulness', slug: 'mindfulness' },
      { name: 'Career Growth', slug: 'career-growth' },
    ],
  },
  {
    name: 'Fitness & Health',
    slug: 'fitness-health',
    color: '#FF9AA2',
    subcategories: [
      { name: 'Workout Plans', slug: 'workout-plans' },
      { name: 'Nutrition', slug: 'nutrition' },
      { name: 'Mental Health', slug: 'mental-health' },
      { name: 'Yoga', slug: 'yoga' },
    ],
  },
  {
    name: 'Design',
    slug: 'design',
    color: '#B5B9FF',
    subcategories: [
      { name: 'UI/UX', slug: 'ui-ux' },
      { name: 'Graphic Design', slug: 'graphic-design' },
      { name: '3D Modeling', slug: '3d-modeling' },
      { name: 'Typography', slug: 'typography' },
    ],
  },
  {
    name: 'Drawing & Painting',
    slug: 'drawing-painting',
    color: '#FFCAB0',
    subcategories: [
      { name: 'Watercolor', slug: 'watercolor' },
      { name: 'Acrylic', slug: 'acrylic' },
      { name: 'Oil', slug: 'oil' },
      { name: 'Pastel', slug: 'pastel' },
      { name: 'Charcoal', slug: 'charcoal' },
    ],
  },
  {
    name: 'Music',
    slug: 'music',
    color: '#FFD700',
    subcategories: [
      { name: 'Songwriting', slug: 'songwriting' },
      { name: 'Music Production', slug: 'music-production' },
      { name: 'Music Theory', slug: 'music-theory' },
      { name: 'Music History', slug: 'music-history' },
    ],
  },
  {
    name: 'Photography',
    slug: 'photography',
    color: '#FF6B6B',
    subcategories: [
      { name: 'Portrait', slug: 'portrait' },
      { name: 'Landscape', slug: 'landscape' },
      { name: 'Street Photography', slug: 'street-photography' },
      { name: 'Nature', slug: 'nature' },
      { name: 'Macro', slug: 'macro' },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  // Create admin tenant
  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: "admin",
    },
  });

  // Create admin user
  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "demo",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  for (const category of categories) {
    const parent = await payload.create({
      collection: 'categories',
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    if (category.subcategories) {
      for (const sub of category.subcategories) {
        await payload.create({
          collection: 'categories',
          data: {
            name: sub.name,
            slug: sub.slug,
            parent: parent.id,
          },
        });
      }
    }
  }
};

try {
  await seed();
  console.log('seeding complete successfully');
  process.exit(0);
} catch (error) {
  console.error('Error during seeding:', error);
  process.exit(1);
}
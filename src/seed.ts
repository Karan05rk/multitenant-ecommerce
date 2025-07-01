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
      { name: 'E-Commerce', slug: 'e-commerce' },
      { name: 'Investing', slug: 'investing' },
      { name: 'Marketing & Sales', slug: 'marketing-sales' },
      { name: 'Management & Leadership', slug: 'management-leadership' },
      { name: 'Freelancing & Gigs', slug: 'freelancing-gigs' },
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
      { name: 'Mobile Apps', slug: 'mobile-apps' },
      { name: 'Game Development', slug: 'game-development' },
      { name: 'AI & Machine Learning', slug: 'ai-ml' },
      { name: 'Data Science', slug: 'data-science' },
      { name: 'Cybersecurity', slug: 'cybersecurity' },
      { name: 'Cloud & DevOps', slug: 'cloud-devops' },
      { name: 'Programming Languages', slug: 'programming-languages' },
    ],
  },
  {
    name: 'Design & Creative',
    slug: 'design-creative',
    color: '#B5B9FF',
    subcategories: [
      { name: 'UI/UX', slug: 'ui-ux' },
      { name: 'Graphic Design', slug: 'graphic-design' },
      { name: '3D Modeling', slug: '3d-modeling' },
      { name: 'Animation', slug: 'animation' },
      { name: 'Typography', slug: 'typography' },
      { name: 'Illustration', slug: 'illustration' },
    ],
  },
  {
    name: 'Drawing & Painting',
    slug: 'drawing-painting',
    color: '#FFCAB0',
    subcategories: [
      { name: 'Watercolor', slug: 'watercolor' },
      { name: 'Acrylic', slug: 'acrylic' },
      { name: 'Oil Painting', slug: 'oil-painting' },
      { name: 'Pastel', slug: 'pastel' },
      { name: 'Charcoal & Ink', slug: 'charcoal-ink' },
      { name: 'Sketching', slug: 'sketching' },
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
      { name: 'Technical Writing', slug: 'technical-writing' },
      { name: 'Self-Publishing', slug: 'self-publishing' },
      { name: 'Poetry', slug: 'poetry' },
    ],
  },
  {
    name: 'Education',
    slug: 'education',
    color: '#FFE066',
    subcategories: [
      { name: 'Online Courses', slug: 'online-courses' },
      { name: 'Tutoring', slug: 'tutoring' },
      { name: 'Test Prep', slug: 'test-prep' },
      { name: 'Language Learning', slug: 'language-learning' },
      { name: 'Homeschooling', slug: 'homeschooling' },
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
      { name: 'Habits & Goals', slug: 'habits-goals' },
      { name: 'Confidence & Public Speaking', slug: 'confidence-speaking' },
    ],
  },
  {
    name: 'Health & Fitness',
    slug: 'health-fitness',
    color: '#FF9AA2',
    subcategories: [
      { name: 'Workout Plans', slug: 'workout-plans' },
      { name: 'Nutrition', slug: 'nutrition' },
      { name: 'Mental Health', slug: 'mental-health' },
      { name: 'Yoga & Pilates', slug: 'yoga-pilates' },
      { name: 'Bodybuilding', slug: 'bodybuilding' },
    ],
  },
  {
    name: 'Music & Audio',
    slug: 'music-audio',
    color: '#FFD700',
    subcategories: [
      { name: 'Songwriting', slug: 'songwriting' },
      { name: 'Music Production', slug: 'music-production' },
      { name: 'Music Theory', slug: 'music-theory' },
      { name: 'Instrument Lessons', slug: 'instrument-lessons' },
      { name: 'DJ & Mixing', slug: 'dj-mixing' },
    ],
  },
  {
    name: 'Photography & Video',
    slug: 'photography-video',
    color: '#FF6B6B',
    subcategories: [
      { name: 'Portrait', slug: 'portrait' },
      { name: 'Landscape', slug: 'landscape' },
      { name: 'Street', slug: 'street' },
      { name: 'Nature & Wildlife', slug: 'nature-wildlife' },
      { name: 'Macro', slug: 'macro' },
      { name: 'Video Editing', slug: 'video-editing' },
      { name: 'Filmmaking', slug: 'filmmaking' },
    ],
  },
  {
    name: 'Lifestyle & Hobbies',
    slug: 'lifestyle-hobbies',
    color: '#C9E4DE',
    subcategories: [
      { name: 'Gardening', slug: 'gardening' },
      { name: 'Cooking & Baking', slug: 'cooking-baking' },
      { name: 'Travel', slug: 'travel' },
      { name: 'DIY & Crafts', slug: 'diy-crafts' },
      { name: 'Pets', slug: 'pets' },
      { name: 'Collecting', slug: 'collecting' },
    ],
  },
  {
    name: 'Other',
    slug: 'other',
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  // Create admin tenant
  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "Karan's Tenant",
      slug: "karan",
      stripeAccountId: "tenant001",
    },
  });

  // Create User1's tenant
  const user1Tenant = await payload.create({
    collection: "tenants",
    data: {
      name: "User1's Tenant",
      slug: "user1",
      stripeAccountId: "tenant002",
      stripeDetailsSubmitted: true,
    },
  });

  // Create admin user
  await payload.create({
    collection: "users",
    data: {
      email: "karan05rk@gmail.com",
      password: "<RadhaKrishna$05>",
      roles: ["super-admin"],
      username: "Karan05rk",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  // Create user
  await payload.create({
    collection: "users",
    data: {
      email: "user1@demo.com",
      password: "password1",
      roles: ["user"],
      username: "user1",
      tenants: [
        {
          tenant: user1Tenant.id,
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
  console.log('Seeding complete successfully');
  process.exit(0);
} catch (error) {
  console.error('Error during seeding:', error);
  process.exit(1);
}
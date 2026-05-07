const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

// Mock data for the landing page
const landingData = {
  brands: [
    { brand: 'more Selecta', logo: '/images/logos/selecta.png', category: 'Premium Staples', class: 'bg-selecta' },
    { brand: 'more Choice', logo: '/images/logos/choice.png', category: 'Value Staples', class: 'bg-choice' },
    { brand: 'VOW 100%', logo: '/images/logos/vow.png', category: 'Cleaning Essentials', class: 'bg-vow' },
    { brand: 'FEASTERS', logo: '/images/logos/feasters.png', category: 'Fun Foods', class: 'bg-feasters' },
    { brand: 'PRARTHANA', logo: '/images/logos/prarthana.png', category: 'Prayer Essentials', class: 'bg-prarthana' },
    { brand: "Kitchen's Promise", logo: '/images/logos/kitchen.png', category: 'Ready To Eat', class: 'bg-kitchen' },
    { brand: 'more essentials', logo: '/images/logos/essentials.png', category: 'Daily Needs', class: 'bg-essentials' }
  ],
  testimonials: [
    {
      name: 'Karan Sharma',
      avatar: 'https://i.pravatar.cc/150?u=karan',
      rating: 5,
      text: "I've had a great experience shopping at more. The supermarkets are always clean, well-organized, and fully stocked with everything from fresh fruits and vegetables to grocery essentials. Their staff is courteous and helpful, and checkout is usually quick and efficient. more has become my go-to place for all my shopping needs."
    },
    {
      name: 'Deepali Ghosh',
      avatar: 'https://i.pravatar.cc/150?u=deepali',
      rating: 4,
      text: 'As a more+ diamond member, I can say that it is excellent! 5% more+ points cashback on all purchases adds real value. You get so many coupons, free subscriptions, and exclusive deals. To a frequent shopper like me, more with its more+ rewards membership is a great way to save more while getting premium perks.'
    },
    {
      name: 'K Eesvari',
      avatar: 'https://i.pravatar.cc/150?u=eesvari',
      rating: 5,
      text: 'The more app is a game-changer. It is easy to use, with a wide range of products and smooth checkout. I really like the slotted delivery option - it lets me choose a time that works for me, and deliveries are always on time. Managing my more+ points is quick and hassle-free. Great experience overall!'
    }
  ]
};

app.get('/api/landing-data', (req, res) => {
  res.json(landingData);
});

app.get('/', (req, res) => {
  res.send('More Retail Landing Page API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Page } from './src/models/Page.js';

dotenv.config();

async function verify() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({ slug: 'solutions' });

    console.log('\n✅ SOLUTIONS PAGE CMS VERIFICATION\n');
    console.log('='.repeat(60));

    // Solutions Cards
    console.log('\n📍 SOLUTION CARDS\n');
    console.log(`Total Cards: ${page.sections.solutions.cards.length}`);
    page.sections.solutions.cards.forEach((card, i) => {
      console.log(`${i + 1}. ${card.title}`);
    });

    // Integration Cards
    console.log('\n📍 INTEGRATION CARDS\n');
    console.log(`Total Cards: ${page.sections.integration.cards.length}`);
    page.sections.integration.cards.forEach((card, i) => {
      console.log(`${i + 1}. ${card.title} - ${card.points.length} points`);
    });

    console.log('\n' + '='.repeat(60) + '\n');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

verify();

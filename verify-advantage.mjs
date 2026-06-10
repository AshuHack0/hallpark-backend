import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Page } from './src/models/Page.js';

dotenv.config();

async function verify() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({ slug: 'business' });

    console.log('\n✅ ADVANTAGE SECTION VERIFICATION\n');
    console.log('='.repeat(60));

    const advantage = page.sections.advantage;
    console.log(`\nTotal Cards: ${advantage.length}\n`);
    advantage.forEach((item, i) => {
      console.log(`${i + 1}. ${item.title}`);
      console.log(`   ${item.description}\n`);
    });

    console.log('='.repeat(60) + '\n');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

verify();

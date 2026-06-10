import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Page } from './src/models/Page.js';

dotenv.config();

async function verify() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({ slug: 'business' });

    console.log('\n✅ BUSINESS PAGE CMS VERIFICATION\n');
    console.log('=' .repeat(60));

    // Who We Work With
    console.log('\n📍 WHO WE WORK WITH - Database Verification\n');
    console.log(`Total Partners: ${page.sections.whoWeWork.length}`);
    page.sections.whoWeWork.forEach((partner, index) => {
      console.log(`${index + 1}. ${partner.title} (${partner.benefits.length} benefits)`);
    });

    // Transform Parking
    console.log('\n📍 TRANSFORM PARKING - Database Verification\n');
    const tp = page.sections.transformParking;
    console.log(`Main Title: ${tp.title}`);
    console.log(`Parking Partner Perks: ${tp.parkingPartnerPerks.length}`);
    console.log(`Service Partner Perks: ${tp.servicePartnerPerks.length}`);
    console.log('\nParking Partner Perks:');
    tp.parkingPartnerPerks.forEach((perk, i) => {
      console.log(`  ${i + 1}. ${perk}`);
    });
    console.log('\nService Partner Perks:');
    tp.servicePartnerPerks.forEach((perk, i) => {
      console.log(`  ${i + 1}. ${perk}`);
    });

    console.log('\n' + '='.repeat(60) + '\n');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

verify();

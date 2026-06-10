import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Page } from './src/models/Page.js';

dotenv.config();

async function verify() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({ slug: 'business' });

    console.log('\n✅ PARTNERS SHOWCASE CMS VERIFICATION\n');
    console.log('='.repeat(60));

    const ps = page.sections.partnersShowcase;
    
    console.log('\n📍 MAIN SECTION\n');
    console.log(`Heading: ${ps.heading}`);
    console.log(`Heading Gradient: ${ps.headingGradient}`);
    console.log(`Stats: ${ps.stats.length} items`);
    console.log(`CTA Label: ${ps.ctaLabel}`);

    console.log('\n📍 PARTNERS CAROUSEL\n');
    console.log(`Heading: ${ps.partners.heading}`);
    console.log(`Row 1: ${ps.partners.row1.length} partners`);
    ps.partners.row1.forEach((p) => console.log(`  - ${p.name} (${p.industry})`));
    console.log(`Row 2: ${ps.partners.row2.length} partners`);
    ps.partners.row2.forEach((p) => console.log(`  - ${p.name} (${p.industry})`));

    console.log('\n📍 CTA SECTION\n');
    console.log(`Title: ${ps.ctaSection.title}`);
    console.log(`Description: ${ps.ctaSection.description.substring(0, 50)}...`);

    console.log('\n' + '='.repeat(60) + '\n');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

verify();

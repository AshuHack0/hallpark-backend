import mongoose from 'mongoose';

const mongoUri = 'mongodb://localhost:27017/halapark';

async function check() {
  try {
    await mongoose.connect(mongoUri);
    
    const db = mongoose.connection.db;
    const pages = await db.collection('pages').findOne({ slug: 'home' });
    
    if (!pages) {
      console.log('❌ Home page NOT found in MongoDB');
      process.exit(1);
    }
    
    console.log('✅ Home page found in MongoDB\n');
    const sections = pages.sections || {};
    const sectionNames = Object.keys(sections).sort();
    
    console.log('Sections present:');
    sectionNames.forEach((name, i) => {
      console.log(`  ${i + 1}. ${name}`);
    });
    
    console.log(`\nTotal: ${sectionNames.length} sections`);
    
    // Check for expected sections
    const expected = [
      'hero', 'whoWeAre', 'whyHalapark', 'aiPoweredParkingService',
      'howItWorksDemoSection', 'blackBanner', 'goodLookingServicesSection',
      'solutionIntegration', 'technologySection', 'clientsPartners',
      'globalMobilityNetworkSection', 'halaParkInAction'
    ];
    
    const missing = expected.filter(s => !sectionNames.includes(s));
    const extra = sectionNames.filter(s => !expected.includes(s));
    
    if (missing.length > 0) {
      console.log(`\n⚠️  Missing sections: ${missing.join(', ')}`);
    }
    if (extra.length > 0) {
      console.log(`\n⚠️  Extra sections: ${extra.join(', ')}`);
    }
    
    if (missing.length === 0 && extra.length === 0) {
      console.log('\n✅ All expected sections are present!');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

check();

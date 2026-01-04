// Attorney profile loader utility

export const loadAttorneyProfile = async (filename) => {
  try {
    const response = await fetch(`/profiles/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load profile: ${filename}`);
    }
    const profileData = await response.json();
    return profileData;
  } catch (error) {
    console.error(`Error loading attorney profile ${filename}:`, error);
    return null;
  }
};

export const loadAllAttorneyProfiles = async () => {
  try {
    // Load the index file to get list of all profile files
    const indexResponse = await fetch('/profiles/index.txt');
    if (!indexResponse.ok) {
      throw new Error('Failed to load attorney profiles index');
    }

    const indexText = await indexResponse.text();
    const profileFiles = indexText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line.endsWith('.txt'))
      .map(txtFile => txtFile.replace('.txt', '.json')); // Convert .txt to .json

    const attorneys = [];
    let id = 1;

    for (const filename of profileFiles) {
      const attorney = await loadAttorneyProfile(filename);
      if (attorney && attorney.name) {
        attorney.id = id++;
        // Create URL-friendly slug from name for routing
        attorney.slug = attorney.name
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .trim();

        attorneys.push(attorney);
      } else {
        console.warn(`Skipping profile ${filename}: missing name field`);
      }
    }

    return attorneys;
  } catch (error) {
    console.error('Error loading attorney profiles:', error);
    return [];
  }
};

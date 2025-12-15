// Attorney profile loader utility

export const parseAttorneyProfile = (profileText) => {
  const lines = profileText.split('\n');
  const attorney = {
    credentials: [],
    education: [],
    awards: [],
    courtAdmissions: [],
    barAdmissions: [],
    professionalOrganizations: [],
    publications: [],
    proBono: [],
    military: [],
    certifications: []
  };

  let currentSection = null;
  let bioLines = [];
  let personalBioLines = [];

  for (let line of lines) {
    line = line.trim();

    if (!line) continue;

    // Check for section headers (case-insensitive)
    const upperLine = line.toUpperCase();

    if (line.startsWith('name:')) {
      attorney.name = line.substring(5).trim();
      currentSection = null;
    } else if (line.startsWith('title:')) {
      attorney.title = line.substring(6).trim();
      currentSection = null;
    } else if (line.startsWith('practice areas:')) {
      const areasString = line.substring(15).trim();
      // Split by comma or newline, then clean up
      attorney.practiceAreas = areasString.split(/[,\n]/).map(area => area.trim()).filter(area => area);
      currentSection = null;
    } else if (line.startsWith('image:')) {
      attorney.image = line.substring(6).trim();
      currentSection = null;
    } else if (line.startsWith('personal photo:')) {
      attorney.personalPhoto = line.substring(15).trim();
      currentSection = null;
    } else if (line.startsWith('email:')) {
      attorney.email = line.substring(6).trim();
      currentSection = null;
    } else if (line.startsWith('phone:')) {
      attorney.phone = line.substring(6).trim();
      currentSection = null;
    } else if (line.startsWith('office:') || line.startsWith('offices:')) {
      const officeString = line.substring(line.indexOf(':') + 1).trim();
      // Split by comma or newline, then clean up
      attorney.offices = officeString.split(/[,\n]/).map(office => office.trim()).filter(office => office);
      currentSection = null;
    } else if (upperLine === 'EDUCATION') {
      currentSection = 'education';
    } else if (upperLine === 'AWARDS AND HONORS') {
      currentSection = 'awards';
    } else if (upperLine === 'COURT ADMISSIONS') {
      currentSection = 'courtAdmissions';
    } else if (upperLine === 'BAR ADMISSIONS') {
      currentSection = 'barAdmissions';
    } else if (upperLine === 'PROFESSIONAL ORGANIZATIONS') {
      currentSection = 'professionalOrganizations';
    } else if (upperLine === 'PUBLICATIONS') {
      currentSection = 'publications';
    } else if (upperLine === 'PRO BONO WORK') {
      currentSection = 'proBono';
    } else if (upperLine === 'MILITARY') {
      currentSection = 'military';
    } else if (upperLine === 'CERTIFICATIONS') {
      currentSection = 'certifications';
    } else if (line === 'credentials:') {
      currentSection = 'credentials';
    } else if (line.startsWith('bio:')) {
      currentSection = 'bio';
      bioLines.push(line.substring(4).trim());
    } else if (line.startsWith('personal bio:') || line === 'personal bio:') {
      currentSection = 'personal bio';
      if (line.startsWith('personal bio:')) {
        personalBioLines.push(line.substring(13).trim());
      }
    } else if (line === '---') {
      currentSection = 'metadata';
    } else if (currentSection === 'education' && !upperLine.startsWith('SPECIALIZATION')) {
      attorney.education.push(line);
    } else if (currentSection === 'awards') {
      attorney.awards.push(line);
    } else if (currentSection === 'courtAdmissions') {
      attorney.courtAdmissions.push(line);
    } else if (currentSection === 'barAdmissions') {
      attorney.barAdmissions.push(line);
    } else if (currentSection === 'professionalOrganizations') {
      attorney.professionalOrganizations.push(line);
    } else if (currentSection === 'publications') {
      attorney.publications.push(line);
    } else if (currentSection === 'proBono') {
      attorney.proBono.push(line);
    } else if (currentSection === 'military') {
      attorney.military.push(line);
    } else if (currentSection === 'certifications') {
      attorney.certifications.push(line);
    } else if (line.startsWith('- ') && currentSection === 'credentials') {
      attorney.credentials.push(line.substring(2).trim());
    } else if (currentSection === 'bio') {
      bioLines.push(line);
    } else if (currentSection === 'personal bio') {
      personalBioLines.push(line);
    }
  }

  if (bioLines.length > 0) {
    attorney.bio = bioLines.join('\n').trim();
  }

  if (personalBioLines.length > 0) {
    attorney.personalBio = personalBioLines.join('\n').trim();
  }

  return attorney;
};

export const loadAttorneyProfile = async (filename) => {
  try {
    const response = await fetch(`/profiles/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load profile: ${filename}`);
    }
    const profileText = await response.text();
    return parseAttorneyProfile(profileText);
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
      .filter(line => line && line.endsWith('.txt'));

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
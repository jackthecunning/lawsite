# Attorney Profiles System

This directory contains individual attorney profile files that are dynamically loaded by the website.

## Adding a New Attorney

To add a new attorney to the website:

### 1. Create Profile File
Create a new text file in the `/public/profiles/` directory with the attorney's name (use lowercase with hyphens):
- Example: `john-smith.txt`

### 2. Profile File Format
Use this exact format for each attorney profile:

```
name: [Full Name]
title: [Job Title]
specialization: [Practice Area]
image: images/attorneys/[image-filename.jpg]
email: [email@swartzcampbell.com]
phone: [(555) 123-4567]
office: [Philadelphia/Pittsburgh/New York/Mount Laurel/Baltimore/Cleveland]

credentials:
- [Credential 1]
- [Credential 2]
- [Credential 3]
- [Continue as needed]

bio: [Full biography paragraph. This should be a comprehensive description of the attorney's background, experience, and expertise. Write it as one continuous paragraph without line breaks.]
```

### 3. Example Profile File

```
name: John Smith
title: Senior Partner
specialization: Corporate Law & Mergers
image: images/attorneys/john-smith.jpg
email: jsmith@swartzcampbell.com
phone: (555) 123-4500
office: Philadelphia

credentials:
- J.D., Harvard Law School, 2000
- B.A., Economics, Yale University, 1997
- Licensed in Pennsylvania and New York
- Member, American Bar Association
- Board Certified in Corporate Law

bio: John Smith brings over 20 years of experience in corporate law and mergers & acquisitions to Swartz Campbell. He has successfully represented Fortune 500 companies in complex transactions worth over $2 billion. John's expertise includes corporate governance, securities regulations, and strategic business planning. Prior to joining the firm, he worked at several prestigious international law firms where he honed his skills in high-stakes negotiations and deal structuring.
```

### 4. Update Index File
Add the new profile filename to `/public/profiles/index.txt`:

```
michael-giblin.txt
kathleen-carson.txt
christina-murdoch.txt
john-smith.txt
```

### 5. Add Attorney Image
Place the attorney's photo in `/public/images/attorneys/` using the same filename referenced in the profile.

## File Naming Conventions

- **Profile files**: Use lowercase with hyphens (e.g., `john-smith.txt`)
- **Image files**: Match the image path in the profile (e.g., `john-smith.jpg`)
- **Consistent naming**: Keep filename consistent between profile and image

## Important Notes

- The website automatically generates URL-friendly slugs from attorney names
- Attorney profiles are loaded dynamically when the page loads
- Each attorney gets an individual detail page accessible via `/attorney/[slug]`
- The system includes fallback images for missing attorney photos
- All fields are required for proper display

## Supported Image Formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`

## Office Locations

Currently supported office locations:
- Philadelphia
- Pittsburgh
- New York
- Mount Laurel
- Baltimore
- Cleveland

Add new office locations as needed - the system will automatically include them in the filter options.
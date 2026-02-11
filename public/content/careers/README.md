# Careers Content Directory

This directory contains job listing data for the careers page.

## Files

### Job Listings
- `professional-liability.json` - Professional Liability Group position
- `general-liability.json` - General Liability Group position

### Configuration
- `job-urls.json` - Indeed application URLs for each job

## Job File Structure

Each job JSON file should contain:

```json
{
  "title": "Job Title",
  "slug": "job-slug",
  "location": "City, State ZIP",
  "jobType": "Full-time|Part-time|Contract",
  "salary": "$XX,XXX - $XX,XXX per year",
  "introduction": [
    "First intro paragraph",
    "Second intro paragraph"
  ],
  "description": "Job description paragraph",
  "idealCandidate": "Optional: Description of ideal candidate",
  "requirements": [
    "Requirement 1",
    "Requirement 2"
  ],
  "experience": [
    "Experience item 1",
    "Experience item 2"
  ],
  "responsibilities": [
    "Responsibility 1",
    "Responsibility 2"
  ],
  "benefits": [
    "Benefit 1",
    "Benefit 2"
  ],
  "workArrangement": "Work arrangement details",
  "eeoc": "Equal employment opportunity statement",
  "contactEmail": "email@example.com"
}
```

## Job URLs Configuration

The `job-urls.json` file maps job slugs to Indeed application URLs:

```json
{
  "defaultUrl": "https://www.indeed.com/cmp/Swartz-Campbell-LLC/jobs",
  "jobs": {
    "job-slug": "https://www.indeed.com/job/specific-job-id",
    "another-slug": ""
  }
}
```

If a job's URL is empty (`""`), the `defaultUrl` will be used.

## Adding New Jobs

1. Create a new JSON file with the job details
2. Add an entry to `job-urls.json` for the Indeed link
3. Update the Careers.jsx component to load the new job file

## Source

Job descriptions sourced from `tmp/Career Page (1).txt`

/**
 * Utility function to load attorney bio content from text files
 */

export const loadAttorneyBio = async (bioFile) => {
  try {
    const response = await fetch(bioFile);
    if (!response.ok) {
      throw new Error(`Failed to load bio file: ${response.statusText}`);
    }
    const bioText = await response.text();

    // Split the text into paragraphs (assuming paragraphs are separated by double newlines)
    const paragraphs = bioText
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0);

    return paragraphs;
  } catch (error) {
    console.error('Error loading bio:', error);
    return ['Bio content is temporarily unavailable.'];
  }
};
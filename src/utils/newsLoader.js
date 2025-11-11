export const loadNewsArticle = async (articleFile) => {
  try {
    const response = await fetch(`/news/${articleFile}`);
    if (!response.ok) {
      throw new Error(`Failed to load article: ${response.statusText}`);
    }
    const content = await response.text();

    // Split the content into paragraphs and filter out empty lines
    const paragraphs = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return paragraphs;
  } catch (error) {
    console.error('Error loading news article:', error);
    return ['Article content could not be loaded.'];
  }
};

export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
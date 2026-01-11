export const loadHistory = async () => {
  try {
    const response = await fetch('/content/history/history.json');
    if (!response.ok) {
      throw new Error(`Failed to load history: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading history:', error);
    return { title: '', subtitle: '', sections: [] };
  }
};

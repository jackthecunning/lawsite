const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const docxPath = path.join(__dirname, 'public', 'content', 'history', 'Our History (1).docx');
const outputPath = path.join(__dirname, 'public', 'content', 'history', 'history.json');

mammoth.extractRawText({ path: docxPath })
  .then(result => {
    const text = result.value;
    const paragraphs = text
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    // Convert to new format with title and content
    const sections = [];
    let currentTitle = null;

    for (const paragraph of paragraphs) {
      // Check if this is a title (ends with : or is short without ending punctuation)
      if (paragraph.endsWith(':') || (paragraph.length < 100 && !paragraph.endsWith('.'))) {
        currentTitle = paragraph.replace(/:$/, ''); // Remove trailing colon
      } else {
        sections.push({
          title: currentTitle,
          content: paragraph,
          // image field can be added manually later if needed
        });
        currentTitle = null;
      }
    }

    const jsonData = {
      sections: sections
    };

    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
    console.log(`✓ Successfully parsed ${sections.length} sections to ${outputPath}`);
  })
  .catch(err => {
    console.error('Error parsing docx:', err);
  });

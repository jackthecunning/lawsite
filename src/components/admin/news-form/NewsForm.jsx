import './NewsForm.css';

function NewsForm({ formData, onChange }) {
  return (
    <div className="form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => onChange('category', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => onChange('author', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => onChange('date', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Excerpt</label>
        <textarea
          rows="3"
          value={formData.excerpt}
          onChange={(e) => onChange('excerpt', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => onChange('featured', e.target.checked)}
          />
          {' '}Featured Article
        </label>
      </div>
    </div>
  );
}

export default NewsForm;

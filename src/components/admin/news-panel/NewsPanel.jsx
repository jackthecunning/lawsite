import { useState } from 'react';
import './NewsPanel.css';

function NewsPanel({ news, onEdit, onDelete, onExport }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [...new Set(news.map(n => n.category))];

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Manage News Articles</h2>
        <div className="panel-actions">
          <button className="btn-primary">+ Add Article</button>
          <button className="btn-secondary" onClick={onExport}>Export Data</button>
        </div>
      </div>

      <div className="panel-filters">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.category}</td>
                <td>{article.author}</td>
                <td>{new Date(article.date).toLocaleDateString()}</td>
                <td>{article.featured ? '⭐' : ''}</td>
                <td className="actions">
                  <button onClick={() => onEdit(article)} className="btn-edit">Edit</button>
                  <button onClick={() => onDelete(article)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsPanel;

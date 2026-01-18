import { useState, useEffect } from 'react';
import AttorneysPanel from '../../components/admin/attorneys-panel';
import NewsPanel from '../../components/admin/news-panel';
import SettingsPanel from '../../components/admin/settings-panel';
import OfficesPanel from '../../components/admin/offices-panel';
import PracticeAreasPanel from '../../components/admin/practice-areas-panel';
import ContentPanel from '../../components/admin/content-panel';
import EditModal from '../../components/admin/edit-modal';
import './Admin.css';

function Admin() {
  const [activeTab, setActiveTab] = useState('attorneys');
  const [activeSubPanel, setActiveSubPanel] = useState(null);
  const [attorneys, setAttorneys] = useState([]);
  const [news, setNews] = useState([]);
  const [offices, setOffices] = useState([]);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadAttorneys();
    loadNews();
    loadOffices();
    loadPracticeAreas();
  }, []);

  const loadAttorneys = async () => {
    try {
      const response = await fetch('/profiles/index.txt');
      const text = await response.text();
      const profileNames = text
        .split('\n')
        .filter(name => name.trim())
        .map(name => name.trim().replace(/\.txt$/, '')); // Remove .txt extension if present

      const attorneyData = await Promise.all(
        profileNames.map(async (name) => {
          try {
            const res = await fetch(`/profiles/${name}.json`);
            return await res.json();
          } catch (error) {
            console.error(`Error loading ${name}:`, error);
            return null;
          }
        })
      );

      setAttorneys(attorneyData.filter(a => a !== null));
    } catch (error) {
      console.error('Error loading attorneys:', error);
    }
  };

  const loadNews = async () => {
    try {
      const module = await import('../../data/newsData.js');
      setNews(module.newsArticles || []);
    } catch (error) {
      console.error('Error loading news:', error);
    }
  };

  const loadOffices = async () => {
    try {
      const module = await import('../../data/firmData.js');
      setOffices(module.offices || []);
    } catch (error) {
      console.error('Error loading offices:', error);
    }
  };

  const loadPracticeAreas = async () => {
    try {
      const module = await import('../../data/firmData.js');
      setPracticeAreas(module.services || []);
    } catch (error) {
      console.error('Error loading practice areas:', error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem({ ...item }); // Create a copy to avoid direct mutation
    setIsEditing(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name || item.title}?`)) {
      if (activeTab === 'attorneys') {
        const updatedAttorneys = attorneys.filter(a => a.name !== item.name);
        setAttorneys(updatedAttorneys);
        alert(`${item.name} has been removed from the list. Don't forget to export the updated data!`);
      } else if (activeSubPanel === 'offices') {
        const updatedOffices = offices.filter(o => o.id !== item.id);
        setOffices(updatedOffices);
        alert(`${item.name} office has been removed from the list. Don't forget to export the updated data!`);
      } else if (activeSubPanel === 'practice-areas') {
        const updatedAreas = practiceAreas.filter(p => p.id !== item.id);
        setPracticeAreas(updatedAreas);
        alert(`${item.title} has been removed from the list. Don't forget to export the updated data!`);
      } else {
        setNews(news.filter(n => n.id !== item.id));
        alert(`Article "${item.title}" has been removed from the list. Don't forget to export the updated data!`);
      }
    }
  };

  const handleSave = (updatedData) => {
    if (activeTab === 'attorneys') {
      const updatedAttorneys = attorneys.map(attorney =>
        attorney.name === selectedItem.name ? updatedData : attorney
      );
      setAttorneys(updatedAttorneys);

      // Download the updated profile JSON
      downloadAttorneyProfile(updatedData);

      alert(`${updatedData.name}'s profile has been updated! The JSON file has been downloaded. Replace the file in /public/profiles/ with this new version.`);
    } else if (activeSubPanel === 'offices') {
      const updatedOffices = offices.map(office =>
        office.id === selectedItem.id ? updatedData : office
      );
      setOffices(updatedOffices);
      alert('Office updated! Don\'t forget to export and update your firmData.js file.');
    } else if (activeSubPanel === 'practice-areas') {
      const updatedAreas = practiceAreas.map(area =>
        area.id === selectedItem.id ? updatedData : area
      );
      setPracticeAreas(updatedAreas);
      alert('Practice area updated! Don\'t forget to export and update your firmData.js file.');
    } else {
      const updatedNews = news.map(article =>
        article.id === selectedItem.id ? updatedData : article
      );
      setNews(updatedNews);
      alert('News article updated! Don\'t forget to export and update your data files.');
    }

    setIsEditing(false);
    setSelectedItem(null);
  };

  const downloadAttorneyProfile = (attorney) => {
    const fileName = attorney.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const dataStr = JSON.stringify(attorney, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedItem(null);
  };

  const handleExport = () => {
    let data, filename;

    if (activeSubPanel === 'offices') {
      data = offices;
      filename = 'offices';
    } else if (activeSubPanel === 'practice-areas') {
      data = practiceAreas;
      filename = 'practice-areas';
    } else if (activeTab === 'attorneys') {
      data = attorneys;
      filename = 'attorneys';
    } else {
      data = news;
      filename = 'news';
    }

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your law firm website content</p>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'attorneys' ? 'active' : ''}
          onClick={() => setActiveTab('attorneys')}
        >
          Attorneys ({attorneys.length})
        </button>
        <button
          className={activeTab === 'news' ? 'active' : ''}
          onClick={() => setActiveTab('news')}
        >
          News ({news.length})
        </button>
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'attorneys' && (
          <AttorneysPanel
            attorneys={attorneys}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onExport={handleExport}
          />
        )}
        {activeTab === 'news' && (
          <NewsPanel
            news={news}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onExport={handleExport}
          />
        )}
        {activeTab === 'settings' && (
          activeSubPanel === 'offices' ? (
            <OfficesPanel
              offices={offices}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onExport={handleExport}
              onBack={() => setActiveSubPanel(null)}
            />
          ) : activeSubPanel === 'practice-areas' ? (
            <PracticeAreasPanel
              practiceAreas={practiceAreas}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onExport={handleExport}
              onBack={() => setActiveSubPanel(null)}
            />
          ) : activeSubPanel === 'content' ? (
            <ContentPanel
              onBack={() => setActiveSubPanel(null)}
            />
          ) : (
            <SettingsPanel
              onEditOffices={() => setActiveSubPanel('offices')}
              onEditPracticeAreas={() => setActiveSubPanel('practice-areas')}
              onEditContent={() => setActiveSubPanel('content')}
            />
          )
        )}
      </div>

      {isEditing && selectedItem && (
        <EditModal
          item={selectedItem}
          type={activeSubPanel === 'offices' ? 'offices' : activeSubPanel === 'practice-areas' ? 'practice-areas' : activeTab}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Admin;

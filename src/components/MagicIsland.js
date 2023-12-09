import React, { useState, useEffect } from 'react';

const MagicIsland = ({ onSearch, tags, categories }) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    onSearch(searchInput);
  }, [searchInput, onSearch]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    console.log('Search term:', event.target.value);
    onSearch(event.target.value);
  };
  

  const handleTagChange = (event) => {
    const selectedTag = event.target.value;
    setSearchInput(selectedTag ? `tag:${selectedTag}` : ''); // Add a condition to handle the case where no tag is selected
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSearchInput(selectedCategory ? `category:${selectedCategory}` : ''); // Add a condition to handle the case where no category is selected
  };

  return (
    <div className="cattags" style={{ position: 'fixed', top: '', left: '1%', right: '1%', maxWidth: '600px', margin: '15px auto 0 auto', zIndex: '3', display: 'flex', placeSelf: 'center', outline: '1px solid #999', borderRadius: '3px', padding: '', color: '' }}>
      <label style={{ position: 'relative', width: '100%' }}>
        <input id="clearme" type="text" placeholder="Search:" onChange={handleSearchChange} value={searchInput} style={{ maxWidth: '80vw', background: '#222', marginRight: '10px' }} />
        <button className="cattags" type="reset" value="reset" onClick={() => setSearchInput('')} style={{ position: 'absolute', right: '0', top: '0', color: '#fff', padding: '10px', maxWidth: '60px' }}>Clear</button>
        <div  style={{ position: 'absolute', right: '100px', top: '10px', textAlign: 'center', fontSize: '10px', color: '#fff' }}>{searchInput && searchInput !== 'tag:' && searchInput !== 'category:' && '1'} result{searchInput && searchInput !== 'tag:' && searchInput !== 'category:' && 's'}</div>
      </label>

      <div className="tag-selector" style={{ marginTop: '10px' }}>
        <select className="cattags" onChange={handleTagChange} value={searchInput.startsWith('tag:') ? searchInput.replace('tag:', '') : ''}>
          <option value="">Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="category-selector" style={{ marginTop: '10px' }}>
        <select className="cattags" onChange={handleCategoryChange} value={searchInput.startsWith('category:') ? searchInput.replace('category:', '') : ''}>
          <option value="">Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MagicIsland;

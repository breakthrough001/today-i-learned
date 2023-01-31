import CATEGORIES from '../../categories';

const CategoryFilter = (props) => {
  return (
    <aside>
      <ul>
        <li className='category'>
          <button
            className='btn btn-all-categories'
            onClick={() => props.setCurrentCategory('all')}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className='category'>
            <button
              className='btn btn-category'
              style={{ backgroundColor: cat.color }}
              onClick={() => props.setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryFilter;
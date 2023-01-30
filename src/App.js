import { useEffect, useState } from 'react';
import supabase from './supabase';
import './style.css';

const initialFacts = [
  {
    id: 1,
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source:
      'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'society',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Lisbon is the capital of Portugal',
    source: 'https://en.wikipedia.org/wiki/Lisbon',
    category: 'society',
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  // 1. Define state variable
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from('facts').select('*'); // this we always want bc it is the api call to get the data so we store it in a variable

        if (currentCategory !== 'all') {
          query = query.eq('category', currentCategory);
        }

        const { data: facts, error } = await query.order('votesInteresting', {
          ascending: false,
        });
        console.log(facts);

        if (!error) setFacts(facts);
        else alert('There was a problem getting data');
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <div>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/* 2. Use state variable */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} />}
      </main>
    </div>
  );
}

function Loader() {
  return <p className='message'>Loading...</p>;
}

function Header(props) {
  const appTitle = 'Today I Learned';

  return (
    <header className='header'>
      <div className='logo'>
        <img src='logo.png' alt='logo' />
        <h1>{appTitle}</h1>
      </div>
      <button
        className=' btn btn-large btn-open'
        // 3. Update state variable
        onClick={() => props.setShowForm((currentState) => !currentState)}
      >
        {props.showForm ? 'Close' : 'Share a fact'}
      </button>
    </header>
  );
}

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewFactForm(props) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('http://example.com');
  const [category, setCategory] = useState('');
  const textLength = text.length;

  function handleSubmit(event) {
    // 1. Prevent browser reload
    event.preventDefault();
    console.log('text, source, category');

    // 2. Check if data is valid (text & source exist). If so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Create a new fact object (similar to those in the facts array)
      const newFact = {
        id: Math.round(Math.random() * 1000000),
        text: text, // can just write text shorthand bc that = text:text
        source, // this is the same as source: source
        category: category,
        votesInteresting: 24,
        votesMindblowing: 9,
        votesFalse: 4,
        createdIn: new Date().getFullYear(),
      };
      // 4. Add the new fact to the UI: add the fact to state
      props.setFacts((facts) => [newFact, ...facts]);
      // 5. Reset inputs field
      setText('');
      setSource('');
      setCategory('');
      // 6. Close the form
      props.setShowForm(false);
    }
  }

  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      {' '}
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type='text'
        placeholder='Trustworthy source...'
        onChange={(event) => setSource(event.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large'>Post</button>
    </form>
  );
}

function CategoryFilter(props) {
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
}

function FactList(props) {
  if (props.facts.length === 0) {
    return (
      <p className='message'>
        No facts for this category yet. Create the first one!
      </p>
    );
  }
  return (
    <section>
      <ul className='facts-list'>
        {props.facts.map(
          (
            fact // for each fact return the Fact component
          ) => (
            <Fact key={fact.id} factObj={fact} />
          )
        )}
      </ul>
      <p>There are {props.facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact(props) {
  console.log(props.factObj);
  return (
    <div>
      <li key={props.factObj.id} className='fact'>
        <p>
          {props.factObj.text}
          <a href={props.factObj.source} target='_black' className='source'>
            (Source)
          </a>
        </p>
        <span
          className='tag'
          style={{
            backgroundColor: CATEGORIES.find(
              (cat) => cat.name === props.factObj.category
            ).color,
          }}
        >
          {props.factObj.category}
        </span>
        <div className='vote-buttons'>
          <button>👍 {props.factObj.votesInteresting}</button>
          <button>🤯 {props.factObj.votesMindblowing}</button>
          <button>⛔️ {props.factObj.votesFalse}</button>
        </div>
      </li>
    </div>
  );
}

// function Counter() { Example of setstate
//   const [count, setCount] = useState(8);
//   return (
//     <div>
//       <span style={{ fontSize: '40px' }}>{count}</span>
//       <button className='btn btn-large' onClick={() => setCount((c) => c + 1)}>
//         +1
//       </button>
//     </div>
//   );
// }

export default App;

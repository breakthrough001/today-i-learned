import { useState } from 'react';
import supabase from '../../supabase';
import CATEGORIES from '../../categories';

const NewFactForm = (props) => {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(event) {
    // 1. Prevent browser reload
    event.preventDefault();
    console.log('text, source, category');

    // 2. Check if data is valid (text & source exist). If so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Create a new fact object (similar to those in the facts array)
      // const newFact = {
      //   id: Math.round(Math.random() * 1000000),
      //   text: text, // can just write text shorthand bc that = text:text
      //   source, // this is the same as source: source
      //   category: category,
      //   votesInteresting: 24,
      //   votesMindblowing: 9,
      //   votesFalse: 4,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. Upload fact to Supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // 4. Add the new fact to the UI: add the fact to state
      if (!error) props.setFacts((facts) => [newFact[0], ...facts]);
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
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type='text'
        placeholder='Trustworthy source...'
        onChange={(event) => setSource(event.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value=''>Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large' disabled={isUploading}>
        Post
      </button>
    </form>
  );
};

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

export default NewFactForm;

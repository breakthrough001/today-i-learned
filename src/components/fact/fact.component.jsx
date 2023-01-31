import CATEGORIES from '../../categories';
import supabase from '../../supabase';
import { useState } from 'react';

const Fact = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisuputed =
    props.factObj.votesInteresting + props.factObj.votesMindBlowing <
    props.factObj.votesFalse;

  console.log(props.factObj);

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: props.factObj[columnName] + 1 })
      .eq('id', props.factObj.id)
      .select();
    setIsUpdating(false);

    console.log(updatedFact);
    if (!error)
      props.setFacts((facts) =>
        facts.map((f) => (f.id === props.factObj.id ? updatedFact[0] : f))
      );
  }

  return (
    <div>
      <li key={props.factObj.id} className='fact'>
        <p>
          {isDisuputed ? (
            <span className='disputed'>[⛔️ DISPUTED]</span>
          ) : null}
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
          <button
            onClick={() => handleVote('votesInteresting')}
            disabled={isUpdating}
          >
            👍 {props.factObj.votesInteresting}
          </button>
          <button
            onClick={() => handleVote('votesMindBlowing')}
            disabled={isUpdating}
          >
            🤯 {props.factObj.votesMindBlowing}
          </button>
          <button
            onClick={() => handleVote('votesFalse')}
            disabled={isUpdating}
          >
            ⛔️ {props.factObj.votesFalse}
          </button>
        </div>
      </li>
    </div>
  );
};

export default Fact;

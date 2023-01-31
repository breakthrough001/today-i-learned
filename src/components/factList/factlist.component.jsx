import Fact from '../fact/fact.component';

const FactList = (props) => {
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
            <Fact key={fact.id} factObj={fact} setFacts={props.setFacts} />
          )
        )}
      </ul>
      <p>There are {props.facts.length} facts in the database. Add your own!</p>
    </section>
  );
};

export default FactList;

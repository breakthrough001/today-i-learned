const Header = (props) => {
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
};

export default Header;

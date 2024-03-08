import React from 'react';

const Problem = () => {
  return (
    <>
      {true && <h1>It is True</h1>}
      {false ? <h1>It is True</h1> : <h1>It is False</h1>}
      {true && (
      <>
        <h1>
          Fragments are important here
        </h1>
        <p>
          Why? Because its not your call to make :D
        </p>
      </>
      )}
    </>
  )
}

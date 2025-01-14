import React from 'react';

const ActorList = ({ actors }) => {
  return (
    <ul>
      {actors.map(actor => (
        <li key={actor.id}>{actor.name}</li>
      ))}
    </ul>
  );
};

export default ActorList;

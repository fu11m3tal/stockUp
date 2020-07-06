import React from 'react';

const ListEntry = ({ company }) => {
  return (
    <div>
      {list.map((company, index) => (
        <ListEntry 
         key={index}
         company={company}
        />
      ))}
    </div>
  )
}

export default ListEntry; 

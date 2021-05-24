import React from 'react';

const RepoLang = ({ repo }) => {
  return (
    <div className='badge badge-primary'>
      <h3>{<a href={repo.html_url}>{repo.name}</a>}</h3>
      <ul>
        <li>Language: {repo.language}</li>
      </ul>
    </div>
  );
};

export default RepoLang;

import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo }) => {
  return (
    <div className='badge badge-primary'>
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
      <ul>
        <li>Language: {repo.language}</li>
      </ul>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;

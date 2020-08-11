import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo }) => {
  return (
    <div className='badge badge-primary'>
      <ul>
        <li>
          <h3>
            <a href={repo.html_url}> {repo.name}</a>
          </h3>
          <li>
            {repoLanguage && <Fragment>Language: {repo.language}</Fragment>}
          </li>
        </li>
      </ul>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;

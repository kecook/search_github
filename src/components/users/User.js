import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos.js';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const {
    getUser,
    loading,
    user,
    repos,
    getUserRepos,
    getAllRepos,
  } = githubContext;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    company,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      hireable:{''}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          />

          <h1>{name}</h1>
          {location && (
            <Fragment>
              <p>Location: {location}</p>
            </Fragment>
          )}
        </div>
        <div className='bio'>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit GitHub Profile
          </a>
          <ul>
            <li>{login && <Fragment>Username: {login}</Fragment>}</li>

            <li>{company && <Fragment>Company: {company}</Fragment>}</li>

            <li>{blog && <Fragment>Website: {blog}</Fragment>}</li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-scuba'>Public Gists: {public_gists}</div>
      </div>
      <div className='card text-center'>
        <h3>Latest Public Repos:</h3>
        <Repos repos={repos} />
      </div>
      <div className='card text-center'>
        <h3>Languages used:</h3>
        {/* <getAllRepos getAllRepos={getAllRepos} /> */}
      </div>
    </Fragment>
  );
};

export default User;

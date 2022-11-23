import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card } from '../../components';

import GitHubApi from '../../api/github';
import MockedUserDetails from '../../api/mocked-user-details.json';
import MockedUserRepositories from '../../api/mocked-user-repositories.json';

import './UserDetails.css';

export const UserDetails = ({ ...props }) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [startFrom, setStartFrom] = useState(0);

  const quantityOfDisplayedRepos = () => startFrom + 5;

  function reposToDisplay() {
    // Fixed pagination by 10 repos
    const endsAt = quantityOfDisplayedRepos();

    return repositories.slice(startFrom, endsAt);
  }

  const userDate = new Date(user.created_at);
  const userFullDate = `${userDate.getMonth()}/${userDate.getDate()}/${userDate.getFullYear()}`;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data: userDetails } = await GitHubApi.fetchUserDetails(username);

        setUser(userDetails);
      } catch (error) {
        // Unfortunately, I discovered that I cant do more than 60 requests, otherwise
        // the requests from my IP address, would be blocked, so, I created this way to mock the results
        const reachedApiLimit = error.response.data.message.includes('rate limit');

        if (reachedApiLimit) {
          setUser(MockedUserDetails);
        } else {
          window.alert('An unexpected error ocurred!');
          navigate('/');
        }
      }
    }

    const fetchUserRepositories = async () => {
      try {
        const { data: userRepositories } = await GitHubApi.fetchUserRepos(username);

        setRepositories(userRepositories);
      } catch (error) {
        // Unfortunately, I discovered that I cant do more than 60 requests, otherwise
        // the requests from my IP address, would be blocked, so, I created this way to mock the results
        const reachedApiLimit = error.response.data.message.includes('rate limit');

        if (reachedApiLimit) {
          setRepositories(MockedUserRepositories);
        } else {
          window.alert('An unexpected error ocurred!');
          navigate('/');
        }
      }
    }

    fetchUserDetails();
    fetchUserRepositories();
  });

  return (
    <div className="user-details">
      <div className="user-details__profile">
        <Card
          key={user.id}
          style={{ marginBottom: 16 }}
        >
          <img
            className="user-details__user-avatar"
            src={user.avatar_url}
            width="64"
            height="64"
            alt="avatar"
          />

          <span className='user-details__user-info'>
            <strong>#ID: {user.id}</strong>
            <label><strong>Username:</strong> {user.login}</label>
            <label><strong>Profile URL:</strong> {user.html_url}</label>
            <label><strong>Bio:</strong> {user.bio}</label>
            <label><strong>Created at:</strong> {userFullDate}</label>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener nofollow noreferrer external"
            >
              Click here to acces this user profile
            </a>
          </span>
        </Card>
      </div>

      <div className="user-details__repositories">
        <strong>Repositories</strong>

        {reposToDisplay().map((repo) => (
          <div className='user-details__repo-cards'>
            <Card
              key={repo.id}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <strong>#ID: {repo.id}</strong>
                <label><strong>Name:</strong> {repo.name}</label>
                <label><strong>Description:</strong> {repo.description}</label>
                <label><strong>Stacks:</strong> {repo.language}</label>
                <label><strong>Repository URL: </strong>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener nofollow noreferrer external"
                  >
                    {repo.html_url}
                  </a>
                </label>
              </div>
            </Card>
          </div>
        ))}

        <div style={{ marginTop: 16 }}>
          <Button
            variant="primary"
            label="Previous"
            onClick={() => setStartFrom(startFrom - 5)}
            style={{ marginRight: 18 }}
            disabled={startFrom === 0}
          />

          <label>
            Displaying <strong>{quantityOfDisplayedRepos()}</strong> from <strong>{repositories.length}</strong>.
          </label>

          <Button
            variant="secondary"
            label="Next"
            onClick={() => setStartFrom(startFrom + 5)}
            style={{ marginLeft: 18 }}
            disabled={startFrom + 5 === repositories.length}
          />
        </div>
      </div>
    </div>
  );
};

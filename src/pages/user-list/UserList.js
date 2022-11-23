import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, Card } from '../../components';

import GitHubApi from '../../api/github';
import MockedResponse from '../../api/mocked-users.json';

import './UserList.css';

export const UserList = ({ ...props }) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [searchParams, _] = useSearchParams();
  const since = useRef(null);

  const quantityOfDisplayedUsers = () => startFrom + 10;

  function usersToDisplay() {
    // Fixed pagination by 10 users
    const endsAt = quantityOfDisplayedUsers();

    return users.slice(startFrom, endsAt);
  }

  const hasUsers = () => Boolean(users) && users.length > 0;

  useEffect(() => {
    since.current = searchParams.get('since');

    const fetchUsers = async () => {
      try {
        const { data: { users: usersFound } } = await GitHubApi.fetchUsers(since.current);

        setUsers(usersFound);
      } catch (error) {
        // Unfortunately, I discovered that I cant do more than 60 requests, otherwise
        // the requests from my IP address, would be blocked, so, I created this way to mock the results
        const reachedApiLimit = error.response.data.message.includes('rate limit')

        if (reachedApiLimit) {
          setUsers(MockedResponse.users);
        } else {
          window.alert('An unexpected error ocurred!');
          navigate('/');
        }
      }
    }

    fetchUsers();
  });

  return (
    <div className="user-list">
      <strong>TIP: Click on card to go to user details page</strong>

      <div className="user-list__cards-container">
        {hasUsers && usersToDisplay().map((user) => (
          <Card
            key={user.id}
            style={{ marginBottom: 16 }}
            onClick={() => navigate(`/user/${user.login}`)}
          >
            <img
              className="user-list__user-avatar"
              src={user.avatar_url}
              width="64"
              height="64"
              alt="avatar"
            />

            <span className='user-list__user-info'>
              <strong>#ID: {user.id}</strong>
              <strong>Username: {user.login}</strong>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener nofollow noreferrer external"
              >
                Click here to acces this user profile
              </a>
            </span>
          </Card>
        ))}
      </div>

      <div className='user-list__options'>
        <Button
          variant="primary"
          label="Previous"
          onClick={() => setStartFrom(startFrom - 10)}
          disabled={startFrom === 0}
        />

        <label>
          Displaying <strong>{quantityOfDisplayedUsers()}</strong> from <strong>{users.length}</strong>.
        </label>

        <Button
          variant="secondary"
          label="Next"
          onClick={() => setStartFrom(startFrom + 10)}
          disabled={startFrom + 10 === users.length}
        />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Button, Input } from '../../components';

import './Home.css';

export const Home = ({ ...props }) => {
  const navigate = useNavigate();
  const [since, setSince] = useState(0);
  const [username, setUsername] = useState('');

  const usernameIsValid = () => typeof username === 'string' && username !== '';

  return (
    <div className='home'>
      <div className='home__inputs-container'>
        <div>
          <label className='home__input-label'>Desired ID:</label>
          <Input
            style={{ marginBottom: 16, width: '100%' }}
            placeholder={"Enter since from what user ID you want to list"}
            onChange={({ target }) => setSince(target.value)}
            type="number"
          />
        </div>

        <div>
          <label className='home__input-label'>Username:</label>
          <Input
            style={{ width: '100%' }}
            placeholder={"Enter the desired github username"}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
      </div>

      <div className='home__options-container'>
        <Button
          label="Users list"
          variant="primary"
          onClick={() => navigate({ pathname: 'users', search: `?since=${since ?? ''}`})}
        />

        <Button
          label="Desired user details"
          variant="secondary"
          disabled={!usernameIsValid()}
          onClick={() => navigate(`/user/${username}`)}
        />
      </div>
    </div>
  );
};

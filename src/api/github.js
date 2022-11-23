import axios from 'axios';

const baseApiUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'api';

export default {
  fetchUsers(sinceFromId = '') {
    return axios.get(`${baseApiUrl}/users`, { params: { since: sinceFromId } })
  },
  fetchUserDetails(username) {
    return axios.get(`${baseApiUrl}/users/${username}/details`);
  },
  fetchUserRepos(username) {
    return axios.get(`${baseApiUrl}/users/${username}/repos`);
  },
};

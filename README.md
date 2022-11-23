# Overview

This project was built with react and react navigation

## Instalation

- In the project directory, with NodeJS (v14+) you can run `npm install`, to install te project, then to start the application, you must run `npm start`.

- Then it will be available in your [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Front-end Endpoints

- **[GET] (Users Lists) /users**
  - Return a paginted list of GitHub users, optionally, you can provide a query param **since** with an ID, and the listed users would have an ID greather than the sent one.
- **[GET] (User Details) /users/:username/details**
  - Render a page containing the details and the repositories of the github user given in the URL param.

## Notations

- I solve all the proposed problems, but I would love to have more time to make a prettiest and better front-end, including a responsive design for mobile. Jest to develop unit tests. And also add TypeScript to this project.

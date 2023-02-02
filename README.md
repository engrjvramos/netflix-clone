# Netflix Clone

## Table of contents

- [Netflix Clone](#netflix-clone)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Summary](#summary)
    - [Links](#links)
    - [Screenshot](#screenshot)
  - [Details](#details)
    - [Project purpose and goal](#project-purpose-and-goal)
    - [Built with](#built-with)
    - [Future improvements](#future-improvements)
  - [Getting started](#getting-started)
    - [Installing](#installing)
    - [Paying with test card](#paying-with-test-card)
  - [Contributing](#contributing)
  - [Author](#author)

## Overview

### Summary

A lightweight version of Netflix built with NextJS, TypeScript, Firebase and TailwindCSS that allows users to sign up and login, view movie details and trailers, select and purchase plans, and cancel or update membership. Integrated with Stripe for handling user payments, TMDB API for movie data, and YouTube for trailer videos.

### Links

- Original Website: [Netflix](https://www.netflix.com/)
- Solution URL: [GitHub](https://github.com/engrjvramos/netflix-clone)
- Live Site URL: [Vercel](https://engrjvramos-netflix.vercel.app)

### Screenshot

![](./public/home.png)

## Details

### Project purpose and goal

The main purpose of this project is to create a netflix clone to demonstrate the usage of Firebase for the backend database and authentication, and Stripe for handling user payments, cancelling or updating membership. My goal is to build this project using NextJS + Typescript in order to practice myself further with the framework.

### Built with

- [NextJS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [MaterialUI](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)
- [Recoil](https://recoiljs.org/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [react-player](https://www.npmjs.com/package/react-player)
- Mobile-first workflow

### Future improvements

- [ ] Improve the thumbnail UI wherein movie details will show once the user hovers on a specific thumbnail.
- [ ] Include episode lists into the modal component for tv shows.
- [ ] Add a search functionality.
- [ ] Add a Movies and TV Series tab.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Clone the repository and run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn run dev
```

### Paying with test card

To simulate a successful payment, use the given test card:

- Number: 4242424242424242
- CVC: Any 3 digits
- Date: Any future date

For more info, please visit https://stripe.com/docs/testing

## Contributing

Please feel free to send pull request if you want to contribute!

## Author

- [engrjvramos](https://engrjvramos.github.io)

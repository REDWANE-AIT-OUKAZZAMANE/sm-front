# Social Media Wall Project - Frontend

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Testing](#testing)
- [Usage](#usage)
- [Environment Variables](#environment-variables)

## Introduction

<img src="./src/assets/LOGO.svg" align="right"
     alt="Smwall logo" width="140" height="140">

Welcome to the Social Media Wall project! This is a frontend application that allows you to create an interactive and engaging experience for users during events, conferences, and online gatherings. The Social Media Wall aggregates and displays real-time user-generated content from various social media platforms such as Facebook, Twitter, Instagram, and Youtube.

## Features

- Real-time aggregation and display of user-generated content
- Dynamic and attractive presentation of content on a central screen
- interface personalization with branding options
- Support for animations, fluid transitions
- Real-time user interaction through posting and sharing on social media
- Content moderation and filtering for a safe and appropriate display

## Technologies Used

This project utilizes the following technologies:

- [ReactJs](https://reactjs.org/): A JavaScript library for building interactive user interfaces.
- [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript, adding type-checking capabilities.

- [Vite JS](https://vitejs.dev/): A fast build tool for frontend development with on-demand compilation.
- [React Async States](https://incepter.github.io/react-async-states/): A powerful library for managing asynchronous states.
- [Tailwind CSS](https://tailwindcss.com/): A flexible CSS framework with utility classes for quick and efficient styling.
- [Ant Design](https://ant.design/): A library of responsive and aesthetically pleasing UI components.
- [Vitest](https://vitest.dev/): Blazing Fast Unit Test Framework A Vite-native unit test framework.
- ...

## Getting Started

Follow these steps to get started with the Social Media Wall project:

### Installation

1. Clone the repository:

```bash
git clone https://github.com/REDWANE-AIT-OUKAZZAMANE/sm-front.git
```

2. Install dependencies:

```bash
pnpm install
```

### Testing

The frontend application is tested using unit tests an integration tests

to run tests use the following command:

```bash
pnpm run test
```

### Usage

1. Make sure you also have the backend server up and running to ensure the frontend can fetch real-time posts from social media networks.

To run the application locally, use the following command:

```bash
pnpm run dev
```

The application will be available at http://localhost:3000/. You can now start interacting with the Social Media Wall frontend.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
VITE_APP_URL=http://localhost:8080
```

This variable configures the backend API URL that the frontend will communicate with.
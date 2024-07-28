
# GrabMatch - Backend API

## Overview

This repository contains the backend API for the GrabMatch project, built using the NestJS framework. The API manages user authentication, data storage, and search functionalities, supporting the GrabMatch application's core features.

## Tech Stack

- **[NestJS](https://nestjs.com/)**: Backend framework.
- **[Postgres](https://www.postgresql.org/)**: Main database.
- **[Elasticsearch](https://www.elastic.co/)**: Database for storing and searching travel destinations.
- **[JWT](https://www.npmjs.com/package/@nestjs/jwt)**: For user authentication and authorization.
- **[Google Sign-In](https://www.npmjs.com/package/google-auth-library)**: For user login via Google accounts.
- **[Swagger](https://www.npmjs.com/package/@nestjs/swagger)**: For API documentation and testing.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/grab-match/be-api.git
    cd grabmatch-backend-api
    ```

2. **Install dependencies:**
    ```bash
    pnpm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the root directory following the `.env.example` template.

4. **Run database seeding:**
    ```bash
    npm run typeorm seed:run
    ```

5. **Start the application:**
    ```bash
    npm run start:dev
    ```

## API Documentation

The API is documented using Swagger. To view the API documentation:

1. **Run the application:**
    ```bash
    npm run start:dev
    ```

2. **Open your browser and navigate to:**
    ```
    http://localhost:3000/docs
    ```

## Features

### User Authentication
- **JWT**: Secure authentication using JSON Web Tokens.
- **Google Sign-In**: Login via Google accounts for ease of access.

### Data Management
- **Postgres**: Manages user data, preferences, and other relational data.
- **Elasticsearch**: Stores and searches travel destinations efficiently.

# Grab Match LangChain Repository

## Overview

This repository contains the source code for the Grab Match project, which leverages advanced AI models to generate travel destinations and match users based on their preferences. The project also includes a chat recommendation feature tailored for Indonesian language users.

## Tech Stack

### [NestJS Framework](https://nestjs.com/)
- **Purpose**: Serves as the backend framework for the project.
- **Functionality**: Provides a robust structure for developing the application's APIs and services.

### [LangChain with Llama3 Model](https://www.npmjs.com/package/langchain)
- **Purpose**: Generates travel destinations and calculates user match percentages.
- **Model**: Deployed Llama3 model.
- **Functionality**: The LangChain framework is used to integrate the Llama3 model for generating personalized travel recommendations and computing compatibility between users.

### [@google/generative-ai: Gemini](https://www.npmjs.com/package/@google/generative-ai)
- **Purpose**: Generates chat recommendations.
- **Language**: Indonesian.
- **Functionality**: Utilizes the Gemini model from Google's Generative AI suite to create conversational suggestions and interactions in Indonesian.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/grab-match/langchain-recommender.git
    cd grab-match-langchain
    ```

2. **Install dependencies:**
    ```bash
    pnpm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the root directory.
    - Add the necessary API keys and configuration settings for LangChain and Google Generative AI.

4. **Run the application:**
    ```bash
    npm run start:dev
    ```

## Usage

### Generating Travel Destinations and User Matches
- The Llama3 model, integrated with LangChain, processes user input to suggest suitable travel destinations.
- It also calculates the match percentage between users based on their preferences.

### Chat Recommendation Generator
- The Gemini model provides chat recommendations in Indonesian, enhancing user interaction with localized suggestions.

---

Feel free to customize the content further to match your project's specifics.
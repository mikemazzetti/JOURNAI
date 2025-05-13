# JOURNAI, a React-based journaling app using AI to provide unique and tailored prompts to the user

- Built a full-stack Journal application with React, Tailwind CSS, and Express.js, allowing users make and save journal entries
- Implemented CORS middleware, environment variable configuration via dotenv, and error handling for API responses
- Integrated Express.js server with a RESTful endpoint that interfaces with ChatGPT API to give tailored prompts to the user


## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd journal-app-vite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add AI model API key (only chatGPT functionality ATM):
```
OPENAI_API_KEY= # Put your ChatGPT API key here
```

4. Start the development servers:

In one terminal (for the back-end):
```bash
npm run server
```

In another terminal (for the front-end):
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` (or port shown in terminal if different.)

## Running/Testing

- `npm run dev` - Start the frontend development server
- `npm run server` - Start the backend server
- `npm run build` - Build for production

## License

MIT LICENSE

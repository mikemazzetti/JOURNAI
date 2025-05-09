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

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Start the development servers:

In one terminal (for the backend):
```bash
npm run server
```

In another terminal (for the frontend):
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Development

- `npm run dev` - Start the frontend development server
- `npm run server` - Start the backend server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

MIT 

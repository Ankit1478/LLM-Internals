import { Article } from './types';

export const vercelAiSdk: Article = {
  module: 2,
  slug: 'vercel-ai-sdk',
  title: 'Vercel AI SDK',
  description: 'Build streaming AI apps with React and Next.js',
  readTime: 7,
  content: `# Vercel AI SDK (Streaming-First)

## What is Vercel AI SDK?

**Vercel AI SDK** = The easiest way to build AI apps with **React/Next.js**.

It's designed for **streaming** - you see AI responses word by word, not waiting for the full response.

\`\`\`mermaid
flowchart LR
    A[User Types] --> B[API Call]
    B --> C[Stream Response]
    C --> D[Word by Word Display]
\`\`\`

**Key idea:** Real-time streaming + React hooks = Beautiful AI UIs!

## Why Vercel AI SDK?

| Traditional | Vercel AI SDK |
|------------|---------------|
| Wait for full response | Stream word by word |
| Complex state management | Simple hooks |
| Manual API handling | Built-in providers |
| Slow user experience | Fast, responsive UI |

## Core Concepts

### 1. useChat Hook

The main hook for chat interfaces.

\`\`\`typescript
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {/* Display messages */}
      {messages.map(m => (
        <div key={m.id}>
          {m.role}: {m.content}
        </div>
      ))}

      {/* Input form */}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
\`\`\`

### 2. useCompletion Hook

For text completion (not chat).

\`\`\`typescript
import { useCompletion } from 'ai/react';

export default function Completion() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button>Complete</button>
      </form>
      <p>{completion}</p>
    </div>
  );
}
\`\`\`

### 3. streamText (Server-side)

Stream responses from the server.

\`\`\`typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4'),
    messages
  });

  return result.toDataStreamResponse();
}
\`\`\`

## Complete Chat App Example

### 1. API Route (app/api/chat/route.ts)

\`\`\`typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4'),
    system: 'You are a helpful assistant.',
    messages
  });

  return result.toDataStreamResponse();
}
\`\`\`

### 2. Chat Component (app/page.tsx)

\`\`\`typescript
'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>

      {/* Messages */}
      <div className="space-y-4 mb-4">
        {messages.map(m => (
          <div
            key={m.id}
            className={\`p-3 rounded \${
              m.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
            }\`}
          >
            <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong>
            <p>{m.content}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
\`\`\`

## Tool Calling (Function Calling)

AI can call functions/tools you define.

\`\`\`mermaid
flowchart LR
    A[User: Weather in Tokyo?] --> B[AI decides to use tool]
    B --> C[Call getWeather tool]
    C --> D[Get result]
    D --> E[AI responds with data]
\`\`\`

### Server-side Tools

\`\`\`typescript
import { streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4'),
    messages,
    tools: {
      getWeather: tool({
        description: 'Get weather for a city',
        parameters: z.object({
          city: z.string().describe('The city name')
        }),
        execute: async ({ city }) => {
          // Call weather API
          return { temp: 22, condition: 'Sunny' };
        }
      }),
      calculate: tool({
        description: 'Calculate a math expression',
        parameters: z.object({
          expression: z.string()
        }),
        execute: async ({ expression }) => {
          return { result: eval(expression) };
        }
      })
    }
  });

  return result.toDataStreamResponse();
}
\`\`\`

## Streaming UI Components

Show different UI based on what's streaming.

\`\`\`typescript
'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? (
            <UserMessage content={m.content} />
          ) : (
            <AIMessage content={m.content} />
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button>Send</button>
      </form>
    </div>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="bg-blue-100 p-3 rounded-lg ml-auto max-w-[80%]">
      {content}
    </div>
  );
}

function AIMessage({ content }: { content: string }) {
  return (
    <div className="bg-gray-100 p-3 rounded-lg mr-auto max-w-[80%]">
      {content}
    </div>
  );
}
\`\`\`

## Multiple AI Providers

Easily switch between providers.

\`\`\`typescript
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

// OpenAI
streamText({ model: openai('gpt-4'), messages });

// Anthropic Claude
streamText({ model: anthropic('claude-3-opus'), messages });

// Google Gemini
streamText({ model: google('gemini-pro'), messages });
\`\`\`

## Useful Hook Options

\`\`\`typescript
const {
  messages,      // Chat history
  input,         // Current input
  setInput,      // Set input manually
  handleInputChange,
  handleSubmit,
  isLoading,     // Is AI responding?
  error,         // Any errors
  reload,        // Retry last message
  stop,          // Stop streaming
  setMessages    // Set messages manually
} = useChat({
  api: '/api/chat',           // Custom API endpoint
  initialMessages: [],         // Start with messages
  onFinish: (message) => {},   // When response done
  onError: (error) => {}       // Handle errors
});
\`\`\`

## AI Agents with Vercel AI SDK

Build agents with tool loops.

\`\`\`typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4'),
    messages,
    tools: {
      search: tool({
        description: 'Search the web',
        parameters: z.object({ query: z.string() }),
        execute: async ({ query }) => searchWeb(query)
      }),
      calculate: tool({
        description: 'Do math',
        parameters: z.object({ expr: z.string() }),
        execute: async ({ expr }) => calculate(expr)
      })
    },
    maxSteps: 5  // Allow up to 5 tool calls
  });

  return result.toDataStreamResponse();
}
\`\`\`

## generateText vs streamText

| Function | Use Case |
|----------|----------|
| \`streamText\` | Chat UIs, real-time display |
| \`generateText\` | Background tasks, no streaming needed |

\`\`\`typescript
// Streaming (for UI)
const result = streamText({
  model: openai('gpt-4'),
  prompt: 'Hello'
});

// Non-streaming (for background)
const { text } = await generateText({
  model: openai('gpt-4'),
  prompt: 'Hello'
});
\`\`\`

## Error Handling

\`\`\`typescript
'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, error, reload } = useChat();

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }

  return (
    // ... chat UI
  );
}
\`\`\`

## When to Use Vercel AI SDK

\`\`\`mermaid
flowchart TD
    A[Building AI App] --> B{Using React/Next.js?}
    B -->|Yes| C{Need streaming?}
    B -->|No| D[Use other SDK]
    C -->|Yes| E[Use Vercel AI SDK ✓]
    C -->|No| F[Can still use it!]
\`\`\`

| Use Vercel AI SDK | Consider Others |
|-------------------|-----------------|
| React/Next.js apps | Python backends |
| Streaming UIs | Non-streaming tasks |
| Chat interfaces | Complex agent logic |
| Quick prototypes | Enterprise systems |

## Vercel AI SDK vs Others

| Feature | Vercel AI SDK | LangChain.js |
|---------|--------------|--------------|
| Focus | UI/Streaming | Chains/Agents |
| Framework | React/Next.js | Any JS |
| Learning | Easy | Medium |
| Best for | Chat UIs | Complex logic |

## Quick Start Template

\`\`\`typescript
// 1. Install
// npm install ai @ai-sdk/openai

// 2. API Route (app/api/chat/route.ts)
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai('gpt-4'),
    messages
  });
  return result.toDataStreamResponse();
}

// 3. Component (app/page.tsx)
'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map(m => <div key={m.id}>{m.role}: {m.content}</div>)}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button>Send</button>
      </form>
    </div>
  );
}
\`\`\`

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **useChat** | Hook for chat UI |
| **streamText** | Server-side streaming |
| **tools** | Function calling |
| **isLoading** | Check if AI is responding |
| **toDataStreamResponse** | Return streaming response |

\`\`\`mermaid
flowchart LR
    A[useChat Hook] --> B[API Route]
    B --> C[streamText]
    C --> D[AI Provider]
    D --> E[Streaming Response]
    E --> A
\`\`\`

**Vercel AI SDK makes building streaming AI chat apps incredibly simple with React!**
`,
  previousTopic: { module: 2, slug: 'crewai', title: 'CrewAI (Role-Based)' },
  nextTopic: { module: 2, slug: 'durable-execution', title: 'Durable Execution' },
};

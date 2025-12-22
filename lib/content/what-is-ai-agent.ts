import { Article } from './types';

export const whatIsAiAgent: Article = {
  module: 2,
  slug: 'what-is-ai-agent',
  title: 'What is an AI Agent?',
  description: 'Understanding AI Agents with simple real-life examples and diagrams',
  readTime: 6,
  content: `# What is an AI Agent?

## Simple Definition

An **AI Agent** is a program that can:
1. **See** - Observe its environment
2. **Think** - Decide what to do
3. **Act** - Take action to achieve a goal

> Think of it like a smart assistant that doesn't just answer questions, but actually DOES things for you.

## Real-Life Example: Food Delivery App

Imagine you're hungry and order food through an app.

\`\`\`mermaid
flowchart LR
    A[You: Order Pizza] --> B[Agent: Receives Order]
    B --> C[Agent: Finds Restaurant]
    C --> D[Agent: Assigns Driver]
    D --> E[Agent: Tracks Delivery]
    E --> F[Pizza Delivered!]
\`\`\`

The **delivery system** is like an AI Agent:
- **Sees**: Your order, restaurant locations, available drivers
- **Thinks**: Which restaurant? Which driver is closest?
- **Acts**: Places order, assigns driver, sends updates

## Agent vs Normal Program

| Normal Program | AI Agent |
|----------------|----------|
| Follow fixed rules | Makes decisions |
| One task only | Multiple steps |
| No memory | Remembers context |
| You control everything | Works independently |

### Example: Calculator vs Agent

**Calculator (Normal Program):**
\`\`\`
Input: 2 + 2
Output: 4
Done.
\`\`\`

**AI Agent (Smart Assistant):**
\`\`\`
You: "Book me a cheap flight to Delhi next week"
Agent:
  1. Searches flight websites
  2. Compares prices
  3. Checks your calendar
  4. Books the best option
  5. Sends confirmation
\`\`\`

## The Agent Loop

Every AI Agent follows this simple loop:

\`\`\`mermaid
flowchart TD
    A[Perceive] --> B[Think]
    B --> C[Act]
    C --> D{Goal Done?}
    D -->|No| A
    D -->|Yes| E[Stop]
\`\`\`

### Real Example: Thermostat Agent

\`\`\`mermaid
flowchart TD
    A[Read Temperature: 30°C] --> B[Think: Too hot!]
    B --> C[Act: Turn ON AC]
    C --> D[Read Temperature: 25°C]
    D --> E[Think: Perfect!]
    E --> F[Act: Keep AC running]
    F --> G[Read Temperature: 22°C]
    G --> H[Think: Getting cold]
    H --> I[Act: Turn OFF AC]
\`\`\`

## Components of an AI Agent

\`\`\`mermaid
flowchart TB
    subgraph Agent
        A[Sensors] --> B[Brain/LLM]
        B --> C[Tools]
        B --> D[Memory]
    end

    E[Environment] --> A
    C --> E
\`\`\`

| Component | What it does | Example |
|-----------|--------------|---------|
| **Sensors** | Gets information | Camera, API, User input |
| **Brain** | Makes decisions | GPT-4, Claude, Gemini |
| **Tools** | Takes actions | Send email, Search web, Write code |
| **Memory** | Remembers things | Past conversations, User preferences |

## Real-World AI Agents

### 1. Customer Support Agent

\`\`\`mermaid
flowchart TD
    A[Customer Message] --> B[AI Agent]
    B --> C{Check Order}
    C --> D[Status: Delayed]
    D --> E[Action: Refund]
    E --> F[Resolved]
\`\`\`

**How it works:**
- Customer says: "My order is late"
- Agent checks order database
- Finds issue: Stuck in warehouse
- Takes action: Issues refund + escalates
- Customer happy!

### 2. Code Assistant Agent

\`\`\`mermaid
flowchart TD
    A[Developer Request] --> B[Read Context]
    B --> C[Search Codebase]
    C --> D[Generate Code]
    D --> E[Test Code]
    E --> F[Return Result]
\`\`\`

**Example: GitHub Copilot**
- Developer: "Write login function"
- Agent reads your file context
- Checks existing code patterns
- Writes matching code
- Tests for errors
- Returns working code

### 3. Personal Finance Agent

\`\`\`mermaid
flowchart TD
    A[User Goal] --> B[Finance Agent]
    B --> C[Analyze Spending]
    C --> D[Create Budget]
    D --> E[Auto Save]
    E --> F[Send Report]
\`\`\`

**Example:**
- You: "Save for vacation"
- Agent analyzes your spending habits
- Creates a budget plan
- Auto-transfers money to savings
- Sends weekly progress report

## Why Agents are Powerful

**Without Agent:**
\`\`\`
You: "What's the weather?"
AI: "I can't check real-time weather"
\`\`\`

**With Agent:**
\`\`\`
You: "What's the weather?"
Agent:
  → Uses Weather API tool
  → Gets data for your location
  → "It's 28°C and sunny in Mumbai!"
\`\`\`

## Simple Code Example

\`\`\`python|javascript
# Pseudo-code for a simple agent

class SimpleAgent:
    def __init__(self):
        self.memory = []
        self.tools = [search_web, send_email, get_weather]

    def run(self, user_request):
        # 1. PERCEIVE - understand the request
        task = self.understand(user_request)

        # 2. THINK - decide what to do
        plan = self.make_plan(task)

        # 3. ACT - execute the plan
        for step in plan:
            result = self.execute(step)
            self.memory.append(result)

        return self.format_response()

# Usage
agent = SimpleAgent()
agent.run("Book a table for 2 at Italian restaurant tonight")
|||
// Pseudo-code for a simple agent

class SimpleAgent {
  constructor() {
    this.memory = [];
    this.tools = [searchWeb, sendEmail, getWeather];
  }

  run(userRequest) {
    // 1. PERCEIVE - understand the request
    const task = this.understand(userRequest);

    // 2. THINK - decide what to do
    const plan = this.makePlan(task);

    // 3. ACT - execute the plan
    for (const step of plan) {
      const result = this.execute(step);
      this.memory.push(result);
    }

    return this.formatResponse();
  }
}

// Usage
const agent = new SimpleAgent();
agent.run("Book a table for 2 at Italian restaurant tonight");
\`\`\`

## Key Takeaways

- **Agent = See + Think + Act** in a loop
- Agents use **tools** to interact with the world
- Agents have **memory** to remember context
- Agents work **autonomously** towards a goal
- The **brain** (LLM) makes decisions

## What's Next?

In the next lesson, we'll learn the difference between:
- **Prompts** (single question-answer)
- **Workflows** (fixed sequence of steps)
- **Agents** (dynamic decision-making)

This will help you understand WHEN to use agents!
`,
  nextTopic: { module: 2, slug: 'agent-vs-prompt-vs-workflow', title: 'Agent vs Prompt vs Workflow' },
};

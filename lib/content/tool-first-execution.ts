import { Article } from './types';

export const toolFirstExecution: Article = {
  module: 2,
  slug: 'tool-first-execution',
  title: 'Tool-First Execution Pattern',
  description: 'Let tools do the work - agents should orchestrate, not guess',
  readTime: 5,
  content: `# Tool-First Execution Pattern

## What is Tool-First?

**Tool-First** = Always use tools to get real data instead of guessing or making up answers.

\`\`\`mermaid
flowchart LR
    subgraph Bad[❌ LLM-First]
        A[Question] --> B[LLM Guesses]
        B --> C[Often Wrong]
    end

    subgraph Good[✅ Tool-First]
        D[Question] --> E[Use Tool]
        E --> F[Real Data]
        F --> G[Accurate Answer]
    end
\`\`\`

**The Rule:** If a tool can answer it, use the tool. Don't let the LLM guess!

## Why Tool-First Matters

| Approach | Example: "What's the weather in Mumbai?" |
|----------|------------------------------------------|
| **LLM-First** | "It's probably hot and humid" (guess!) |
| **Tool-First** | Calls weather API → "32°C, 75% humidity" (fact!) |

**Problems with LLM guessing:**
- Outdated information (training cutoff)
- Hallucinations (makes things up)
- No real-time data access
- Can't perform actual actions

## The Core Philosophy

### LLMs are Brains, Not Hands

Think of an LLM like a smart person locked in a room with no internet, no phone, and only books from 2 years ago. They can:
- **Think** and reason
- **Decide** what to do
- **Explain** concepts
- **Format** information nicely

But they **cannot**:
- Check today's stock price
- Send an email
- Look up current weather
- Query your database

**Tools are the hands** that let the brain interact with the real world.

### The Trust Hierarchy

\`\`\`mermaid
flowchart TD
    A[Tool Data] -->|Most Trusted| B[Real-time, Verified]
    C[Retrieved Docs] -->|Medium Trust| D[From your database]
    E[LLM Knowledge] -->|Least Trusted| F[May be outdated/wrong]
\`\`\`

| Source | Trust Level | Example |
|--------|-------------|---------|
| **Tool output** | Highest | API response, DB query |
| **Retrieved context** | Medium | RAG documents |
| **LLM memory** | Lowest | Training knowledge |

**Rule:** Always prefer higher trust sources when available.

### Why LLMs Hallucinate Facts

LLMs don't "know" facts - they predict likely text. When asked "What's Apple's stock price?", the LLM generates a plausible-sounding number, not the real one.

\`\`\`
User: What's Apple stock price?
LLM (guessing): "Apple is currently trading at $178.50"
Reality: Could be $165 or $195 - LLM has no idea!
\`\`\`

**Tool-First prevents this** by fetching real data before responding.

## The Pattern

\`\`\`mermaid
flowchart TD
    A[User Question] --> B{Can a tool answer this?}
    B -->|Yes| C[Call the Tool]
    B -->|No| D[Use LLM Knowledge]
    C --> E[Get Real Data]
    E --> F[LLM Formats Response]
    D --> F
    F --> G[Answer User]
\`\`\`

**Key Insight:** LLM's job is to DECIDE which tool to use and FORMAT the response - not to ANSWER factual questions.

## Code Example

\`\`\`python|javascript
class ToolFirstAgent:
    def __init__(self):
        self.tools = {
            "weather": get_weather,
            "search": search_web,
            "calculate": calculator,
            "stock_price": get_stock_price
        }

    def answer(self, question):
        # Step 1: Decide if tool is needed
        tool_decision = self.llm.generate(f"""
            Question: {question}
            Available tools: {list(self.tools.keys())}

            Should I use a tool? If yes, which one?
            Reply: TOOL: tool_name or NO_TOOL
        """)

        if "TOOL:" in tool_decision:
            # Step 2: Tool-First - Get real data
            tool_name = tool_decision.split("TOOL:")[1].strip()
            params = self.extract_params(question, tool_name)
            real_data = self.tools[tool_name](**params)

            # Step 3: Format response with real data
            return self.llm.generate(f"""
                Question: {question}
                Data from {tool_name}: {real_data}
                Give a helpful response using this data.
            """)
        else:
            # Only use LLM for non-factual questions
            return self.llm.generate(question)
|||
class ToolFirstAgent {
    constructor() {
        this.tools = {
            weather: getWeather,
            search: searchWeb,
            calculate: calculator,
            stockPrice: getStockPrice
        };
    }

    async answer(question) {
        // Step 1: Decide if tool is needed
        const toolDecision = await this.llm.generate(\`
            Question: \${question}
            Available tools: \${Object.keys(this.tools)}

            Should I use a tool? If yes, which one?
            Reply: TOOL: tool_name or NO_TOOL
        \`);

        if (toolDecision.includes("TOOL:")) {
            // Step 2: Tool-First - Get real data
            const toolName = toolDecision.split("TOOL:")[1].trim();
            const params = this.extractParams(question, toolName);
            const realData = await this.tools[toolName](params);

            // Step 3: Format response with real data
            return await this.llm.generate(\`
                Question: \${question}
                Data from \${toolName}: \${JSON.stringify(realData)}
                Give a helpful response using this data.
            \`);
        } else {
            // Only use LLM for non-factual questions
            return await this.llm.generate(question);
        }
    }
}
\`\`\`

## When to Use Tools vs LLM

| Question Type | Use Tool? | Example |
|---------------|-----------|---------|
| Real-time data | ✅ Yes | Weather, stock prices, news |
| Calculations | ✅ Yes | Math, conversions |
| Database queries | ✅ Yes | User data, orders |
| Actions | ✅ Yes | Send email, book ticket |
| Opinions | ❌ No | "Is Python good?" |
| Explanations | ❌ No | "What is recursion?" |
| Creative | ❌ No | "Write a poem" |

## Tool-First Checklist

\`\`\`mermaid
flowchart TD
    A[Before Answering] --> B{Is it factual/real-time?}
    B -->|Yes| C{Do I have a tool for it?}
    C -->|Yes| D[USE THE TOOL!]
    C -->|No| E[Tell user you can't verify]
    B -->|No| F[LLM can answer directly]
\`\`\`

## Common Mistakes

### Mistake 1: Tool as Afterthought

\`\`\`
❌ Wrong: LLM answers first, then maybe checks
✅ Right: Check tool first, then format answer
\`\`\`

### Mistake 2: Over-relying on LLM Knowledge

\`\`\`
User: "What's the latest news about Tesla?"
❌ Wrong: LLM talks about old news from training
✅ Right: Use search tool → Get today's news → Format response
\`\`\`

### Mistake 3: Not Defining Clear Tool Boundaries

Define exactly what each tool does:

| Tool | Input | Output | When to Use |
|------|-------|--------|-------------|
| \`weather\` | city name | temp, humidity | Weather questions |
| \`calculator\` | math expression | result | Any calculation |
| \`search\` | query | web results | Current events |

## Real-World Example

**Task:** "Should I carry an umbrella today in Delhi?"

\`\`\`mermaid
flowchart LR
    A[Question] --> B[Need weather data]
    B --> C[Call weather tool]
    C --> D[Rain: 80% chance]
    D --> E[LLM formats: Yes, carry umbrella!]
\`\`\`

Without Tool-First, LLM might say "Delhi is generally hot" - useless!

## Key Takeaways

| Principle | Description |
|-----------|-------------|
| **Tools for facts** | Real-time data, calculations, actions |
| **LLM for thinking** | Deciding, reasoning, formatting |
| **Never guess** | If unsure, use tool or say "I don't know" |
| **Verify first** | Tool data > LLM knowledge |
`,
  previousTopic: { module: 2, slug: 'thought-action-observation', title: 'Thought–Action–Observation Loop' },
  nextTopic: { module: 2, slug: 'planning-vs-execution', title: 'Planning vs Execution Separation' },
};

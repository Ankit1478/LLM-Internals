import { Article } from './types';

export const reactPattern: Article = {
  module: 3,
  slug: 'react-pattern',
  title: 'ReAct Pattern',
  description: 'The most important pattern for building AI Agents - Reasoning + Acting together',
  readTime: 7,
  content: `# ReAct Pattern

## What is ReAct?

**ReAct** = **Re**asoning + **Act**ing

It's the most popular pattern for building AI agents. The agent THINKS out loud before taking action.

\`\`\`mermaid
flowchart LR
    A[Reason] --> B[Act]
    B --> C[Observe]
    C --> A
\`\`\`

**The core idea:** Instead of just acting blindly, the agent first REASONS about what to do, then ACTS, then OBSERVES the result. This loop continues until the task is done.

## Why ReAct Matters

**Without ReAct (Bad):**
\`\`\`
User: Book a flight to Delhi
Agent: *immediately calls random API*
Agent: *fails because no date specified*
Agent: *tries again randomly*
Agent: *keeps failing*
\`\`\`

**With ReAct (Good):**
\`\`\`
User: Book a flight to Delhi
Agent: [THOUGHT] User wants to fly to Delhi. I need to know:
       - Travel date
       - Departure city
       - Budget preferences
       Let me ask for the date first.
Agent: [ACTION] Ask user for travel date
Agent: [OBSERVATION] User said "next Friday"
Agent: [THOUGHT] Good, I have the date. Now I need departure city...
\`\`\`

**Key difference:** The agent THINKS before acting, making it much smarter!

## The ReAct Loop Explained

\`\`\`mermaid
flowchart TD
    A[User Request] --> B[THOUGHT: What should I do?]
    B --> C[ACTION: Do something]
    C --> D[OBSERVATION: What happened?]
    D --> E{Task Complete?}
    E -->|No| B
    E -->|Yes| F[Return Answer]
\`\`\`

**Three components:**

| Component | What it does | Example |
|-----------|--------------|---------|
| **Thought** | Agent reasons about the situation | "I need to search for flights first" |
| **Action** | Agent does something | Call flight search API |
| **Observation** | Agent sees the result | "Found 5 flights, cheapest is ₹4500" |

## Real-World Example: Research Agent

**User:** "What's the population of India and China? Which is larger?"

\`\`\`mermaid
flowchart TD
    A[Question Received] --> B[Thought 1]
    B --> C[Action 1: Search India population]
    C --> D[Observation 1: 1.4 billion]
    D --> E[Thought 2]
    E --> F[Action 2: Search China population]
    F --> G[Observation 2: 1.4 billion]
    G --> H[Thought 3: Compare numbers]
    H --> I[Final Answer]
\`\`\`

**Step by step:**

**Thought 1:** "I need to find population of both countries. Let me start with India."

**Action 1:** search("population of India 2024")

**Observation 1:** "India's population is approximately 1.44 billion"

**Thought 2:** "Good, I have India's data. Now I need China's population."

**Action 2:** search("population of China 2024")

**Observation 2:** "China's population is approximately 1.41 billion"

**Thought 3:** "Now I can compare: India (1.44B) vs China (1.41B). India is larger!"

**Final Answer:** "India's population (1.44 billion) is slightly larger than China's (1.41 billion)."

## Code Implementation

\`\`\`python|javascript
class ReActAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.max_steps = 10

    def run(self, user_query):
        history = []
        step = 0

        while step < self.max_steps:
            step += 1

            # THOUGHT: Ask LLM to reason
            thought = self.llm.generate(f"""
                User Query: {user_query}
                History: {history}

                Think step by step. What should you do next?
                If you have enough info, say "FINAL ANSWER: <answer>"

                THOUGHT:
            """)

            history.append(f"THOUGHT: {thought}")

            # Check if we have final answer
            if "FINAL ANSWER:" in thought:
                return thought.split("FINAL ANSWER:")[1].strip()

            # ACTION: Ask LLM to choose action
            action = self.llm.generate(f"""
                Based on your thought: {thought}
                Available tools: {list(self.tools.keys())}

                What action should you take?
                Format: ACTION: tool_name(parameters)
            """)

            history.append(f"ACTION: {action}")

            # Execute the action
            tool_name, params = self.parse_action(action)
            result = self.tools[tool_name](params)

            # OBSERVATION: Record result
            observation = f"OBSERVATION: {result}"
            history.append(observation)

        return "Max steps reached"

# Usage
agent = ReActAgent(
    llm=OpenAI(),
    tools={
        "search": search_web,
        "calculate": calculator,
        "get_weather": weather_api
    }
)

answer = agent.run("What's the population of India vs China?")
|||
class ReActAgent {
    constructor(llm, tools) {
        this.llm = llm;
        this.tools = tools;
        this.maxSteps = 10;
    }

    async run(userQuery) {
        const history = [];
        let step = 0;

        while (step < this.maxSteps) {
            step++;

            // THOUGHT: Ask LLM to reason
            const thought = await this.llm.generate(\`
                User Query: \${userQuery}
                History: \${history.join('\\n')}

                Think step by step. What should you do next?
                If you have enough info, say "FINAL ANSWER: <answer>"

                THOUGHT:
            \`);

            history.push(\`THOUGHT: \${thought}\`);

            // Check if we have final answer
            if (thought.includes("FINAL ANSWER:")) {
                return thought.split("FINAL ANSWER:")[1].trim();
            }

            // ACTION: Ask LLM to choose action
            const action = await this.llm.generate(\`
                Based on your thought: \${thought}
                Available tools: \${Object.keys(this.tools)}

                What action should you take?
                Format: ACTION: tool_name(parameters)
            \`);

            history.push(\`ACTION: \${action}\`);

            // Execute the action
            const { toolName, params } = this.parseAction(action);
            const result = await this.tools[toolName](params);

            // OBSERVATION: Record result
            const observation = \`OBSERVATION: \${result}\`;
            history.push(observation);
        }

        return "Max steps reached";
    }
}

// Usage
const agent = new ReActAgent(
    new OpenAI(),
    {
        search: searchWeb,
        calculate: calculator,
        getWeather: weatherApi
    }
);

const answer = await agent.run("What's the population of India vs China?");
\`\`\`

## ReAct Prompt Template

Here's a standard ReAct prompt you can use:

\`\`\`text
You are a helpful AI assistant that uses tools to answer questions.

Available Tools:
- search(query): Search the web for information
- calculate(expression): Do math calculations
- get_weather(city): Get current weather

You must follow this format:

THOUGHT: [Your reasoning about what to do next]
ACTION: [tool_name(parameters)]
OBSERVATION: [Result from the tool - I will provide this]
... (repeat until done)
THOUGHT: I now have enough information
FINAL ANSWER: [Your final response to the user]

User Question: {question}

Begin!
\`\`\`

## Visual: ReAct vs Direct Approach

\`\`\`mermaid
flowchart TB
    subgraph Direct[Direct Approach - No Reasoning]
        A1[Question] --> A2[Guess Answer]
        A2 --> A3[Often Wrong!]
    end

    subgraph ReAct[ReAct Approach - With Reasoning]
        B1[Question] --> B2[Think: What do I need?]
        B2 --> B3[Act: Search/Calculate]
        B3 --> B4[Observe: Got result]
        B4 --> B5[Think: Need more?]
        B5 -->|Yes| B3
        B5 -->|No| B6[Accurate Answer!]
    end
\`\`\`

## When to Use ReAct

\`\`\`mermaid
flowchart TD
    A[Your Task] --> B{Needs external info?}
    B -->|Yes| C[Use ReAct]
    B -->|No| D{Multi-step reasoning?}
    D -->|Yes| C
    D -->|No| E{Needs tools?}
    E -->|Yes| C
    E -->|No| F[Simple prompt is fine]
\`\`\`

**Use ReAct when:**
- Agent needs to search for information
- Task requires multiple steps
- Agent needs to use tools (APIs, databases, etc.)
- You want to see the agent's reasoning process

**Skip ReAct when:**
- Simple question-answer (no tools needed)
- Task can be done in one step
- You just need text generation

## Common ReAct Mistakes

Let's learn from common mistakes so you can avoid them in your agents.

### Mistake 1: No Maximum Steps (Infinite Loop)

\`\`\`mermaid
flowchart TD
    A[Agent starts] --> B[Thought]
    B --> C[Action]
    C --> D[Observation]
    D --> B
    D -.->|Never ends!| E[💀 Infinite Loop]
\`\`\`

**The Problem:**
\`\`\`python|javascript
# BAD: No limit on iterations
while not done:
    thought = think()
    action = act()
    observe()
    # If agent never finds answer, runs forever!
    # Also burns through your API credits 💸
|||
// BAD: No limit on iterations
while (!done) {
    const thought = think();
    const action = act();
    observe();
    // If agent never finds answer, runs forever!
    // Also burns through your API credits 💸
}
\`\`\`

**The Solution:**
\`\`\`python|javascript
# GOOD: Always set a max step limit
MAX_STEPS = 10
step = 0

while step < MAX_STEPS and not done:
    step += 1
    thought = think()
    action = act()
    observe()

if step >= MAX_STEPS:
    return "Could not complete task in allowed steps"
|||
// GOOD: Always set a max step limit
const MAX_STEPS = 10;
let step = 0;

while (step < MAX_STEPS && !done) {
    step++;
    const thought = think();
    const action = act();
    observe();
}

if (step >= MAX_STEPS) {
    return "Could not complete task in allowed steps";
}
\`\`\`

---

### Mistake 2: Vague Thoughts

**The Problem:**

\`\`\`
THOUGHT: "I should search for something"
THOUGHT: "Let me try this"
THOUGHT: "I'll figure it out"
\`\`\`

These thoughts don't help the agent decide what to do!

\`\`\`mermaid
flowchart LR
    A[Vague Thought] --> B[Unclear Action]
    B --> C[Wrong Results]
    C --> D[More Confusion]
    D --> A
\`\`\`

**The Solution:**

\`\`\`
THOUGHT: "User wants flight to Delhi. I need:
         1. Departure city (missing - should ask)
         2. Date (missing - should ask)
         3. Budget (missing - should ask)
         First, I'll ask for departure city."

THOUGHT: "Search returned no results because I used
         'Delhi flight' which is too vague.
         I should search 'flights from Mumbai to Delhi
         December 2024' for better results."
\`\`\`

**Prompt tip to fix this:**
\`\`\`python|javascript
thought_prompt = """
Think step by step. Your thought MUST include:
1. What do I know? (list the facts)
2. What am I missing? (list unknowns)
3. What is my SPECIFIC next action and WHY?

Bad: "I should search"
Good: "I need the weather for Mumbai because user asked about umbrella.
      I'll use get_weather('Mumbai') to get rain probability."
"""
|||
const thoughtPrompt = \`
Think step by step. Your thought MUST include:
1. What do I know? (list the facts)
2. What am I missing? (list unknowns)
3. What is my SPECIFIC next action and WHY?

Bad: "I should search"
Good: "I need the weather for Mumbai because user asked about umbrella.
      I'll use get_weather('Mumbai') to get rain probability."
\`;
\`\`\`

---

### Mistake 3: Too Many Tools

\`\`\`mermaid
flowchart TD
    A[Agent sees 20 tools] --> B[Gets confused]
    B --> C[Picks wrong tool]
    C --> D[Task fails]
\`\`\`

**The Problem:**
\`\`\`python|javascript
# BAD: Too many tools overwhelm the agent
tools = {
    "search_web": ...,
    "search_images": ...,
    "search_news": ...,
    "search_videos": ...,
    "search_maps": ...,
    "send_email": ...,
    "send_sms": ...,
    "send_whatsapp": ...,
    "create_document": ...,
    "edit_document": ...,
    "delete_document": ...,
    "book_flight": ...,
    "book_hotel": ...,
    "book_car": ...,
    # ... 20 more tools
}
# Agent: "Uhh... which one do I use?" 😵
|||
// BAD: Too many tools overwhelm the agent
const tools = {
    searchWeb: ...,
    searchImages: ...,
    searchNews: ...,
    searchVideos: ...,
    searchMaps: ...,
    sendEmail: ...,
    sendSms: ...,
    sendWhatsapp: ...,
    createDocument: ...,
    editDocument: ...,
    deleteDocument: ...,
    bookFlight: ...,
    bookHotel: ...,
    bookCar: ...,
    // ... 20 more tools
};
// Agent: "Uhh... which one do I use?" 😵
\`\`\`

**The Solution:**
\`\`\`python|javascript
# GOOD: Only give relevant tools for the task
def get_tools_for_task(task_type):
    if task_type == "research":
        return {
            "search": search_web,
            "read_page": read_webpage,
            "calculate": calculator
        }
    elif task_type == "travel":
        return {
            "search_flights": search_flights,
            "search_hotels": search_hotels,
            "get_weather": get_weather
        }
    # Max 3-5 tools per task!
|||
// GOOD: Only give relevant tools for the task
function getToolsForTask(taskType) {
    if (taskType === "research") {
        return {
            search: searchWeb,
            readPage: readWebpage,
            calculate: calculator
        };
    } else if (taskType === "travel") {
        return {
            searchFlights: searchFlights,
            searchHotels: searchHotels,
            getWeather: getWeather
        };
    }
    // Max 3-5 tools per task!
}
\`\`\`

---

### Mistake 4: No Few-Shot Examples

**The Problem:**

Agent doesn't follow the ReAct format correctly:
\`\`\`
User: What's 25 * 40?
Agent: The answer is 1000.  // Didn't show reasoning!
\`\`\`

**The Solution - Add Examples in Prompt:**

\`\`\`python|javascript
react_prompt = """
You must follow the ReAct format. Here's an example:

EXAMPLE:
User: What's the capital of France and its population?

THOUGHT: I need to find two pieces of information:
1. Capital of France
2. Population of that capital
Let me search for France's capital first.

ACTION: search("capital of France")

OBSERVATION: Paris is the capital of France.

THOUGHT: Good, capital is Paris. Now I need its population.

ACTION: search("Paris population 2024")

OBSERVATION: Paris has a population of approximately 2.1 million.

THOUGHT: I now have both pieces of information.

FINAL ANSWER: The capital of France is Paris, with a population
of approximately 2.1 million people.

---
Now solve this:
User: {user_question}
"""
|||
const reactPrompt = \`
You must follow the ReAct format. Here's an example:

EXAMPLE:
User: What's the capital of France and its population?

THOUGHT: I need to find two pieces of information:
1. Capital of France
2. Population of that capital
Let me search for France's capital first.

ACTION: search("capital of France")

OBSERVATION: Paris is the capital of France.

THOUGHT: Good, capital is Paris. Now I need its population.

ACTION: search("Paris population 2024")

OBSERVATION: Paris has a population of approximately 2.1 million.

THOUGHT: I now have both pieces of information.

FINAL ANSWER: The capital of France is Paris, with a population
of approximately 2.1 million people.

---
Now solve this:
User: \${userQuestion}
\`;
\`\`\`

---

### Mistake 5: Ignoring Failed Observations

\`\`\`mermaid
flowchart TD
    A[Action: Search] --> B[Observation: ERROR - No results]
    B --> C{Agent Response}
    C -->|Bad| D[Repeat same search]
    C -->|Good| E[Try different query]
    D --> F[Fails again! 🔄]
    E --> G[Success! ✅]
\`\`\`

**The Problem:**
\`\`\`
ACTION: search("xyz123abc")
OBSERVATION: No results found

ACTION: search("xyz123abc")  // Same query again!
OBSERVATION: No results found

ACTION: search("xyz123abc")  // Still the same! 🤦
\`\`\`

**The Solution:**
\`\`\`python|javascript
def handle_observation(observation, action_history):
    if observation["success"] == False:
        # Check if we tried this before
        if action in action_history:
            return "THOUGHT: This action failed before. I need a different approach."

        # Analyze the error
        error = observation.get("error", "Unknown error")
        return f"""
        THOUGHT: The action failed with error: {error}
        I should try a different approach:
        - Use different search terms
        - Try a different tool
        - Ask user for clarification
        """
|||
function handleObservation(observation, actionHistory) {
    if (observation.success === false) {
        // Check if we tried this before
        if (actionHistory.includes(action)) {
            return "THOUGHT: This action failed before. I need a different approach.";
        }

        // Analyze the error
        const error = observation.error || "Unknown error";
        return \`
        THOUGHT: The action failed with error: \${error}
        I should try a different approach:
        - Use different search terms
        - Try a different tool
        - Ask user for clarification
        \`;
    }
}
\`\`\`

---

### Mistake 6: Not Knowing When to Stop

**The Problem:**
\`\`\`
User: What's 2 + 2?

THOUGHT: I need to calculate this.
ACTION: calculate("2 + 2")
OBSERVATION: 4

THOUGHT: Let me verify this.
ACTION: search("what is 2 + 2")
OBSERVATION: 2 + 2 equals 4

THOUGHT: Let me double-check with another source.
ACTION: search("2 plus 2 answer")
OBSERVATION: The answer is 4

THOUGHT: Maybe I should check once more...
// Agent keeps going even though it has the answer! 😫
\`\`\`

**The Solution:**
\`\`\`python|javascript
def should_stop(thought, observations):
    # Clear stopping conditions
    stop_phrases = [
        "I have enough information",
        "I can now answer",
        "FINAL ANSWER",
        "I now know the answer"
    ]

    for phrase in stop_phrases:
        if phrase.lower() in thought.lower():
            return True

    # Check if we have the answer
    if len(observations) > 0 and is_answer_complete(observations):
        return True

    return False

# In your prompt, be explicit:
prompt = """
IMPORTANT: Once you have enough information to answer,
immediately give your FINAL ANSWER. Do not over-verify
or continue searching unnecessarily.

If you're confident in your answer, say:
THOUGHT: I have enough information to answer.
FINAL ANSWER: [your answer]
"""
|||
function shouldStop(thought, observations) {
    // Clear stopping conditions
    const stopPhrases = [
        "I have enough information",
        "I can now answer",
        "FINAL ANSWER",
        "I now know the answer"
    ];

    for (const phrase of stopPhrases) {
        if (thought.toLowerCase().includes(phrase.toLowerCase())) {
            return true;
        }
    }

    // Check if we have the answer
    if (observations.length > 0 && isAnswerComplete(observations)) {
        return true;
    }

    return false;
}

// In your prompt, be explicit:
const prompt = \`
IMPORTANT: Once you have enough information to answer,
immediately give your FINAL ANSWER. Do not over-verify
or continue searching unnecessarily.

If you're confident in your answer, say:
THOUGHT: I have enough information to answer.
FINAL ANSWER: [your answer]
\`;
\`\`\`

---

## Summary: Mistakes Cheat Sheet

| Mistake | Symptom | Quick Fix |
|---------|---------|-----------|
| **No max steps** | Agent runs forever | Add \`max_steps = 10\` |
| **Vague thoughts** | Wrong actions | Require specific reasoning in prompt |
| **Too many tools** | Wrong tool selection | Limit to 3-5 relevant tools |
| **No examples** | Wrong format | Add few-shot examples |
| **Ignoring errors** | Repeating failed actions | Track history, change approach |
| **Not stopping** | Unnecessary iterations | Clear stop conditions |

\`\`\`mermaid
flowchart LR
    A[Good ReAct Agent] --> B[Max Steps ✓]
    A --> C[Specific Thoughts ✓]
    A --> D[Few Tools ✓]
    A --> E[Examples ✓]
    A --> F[Error Handling ✓]
    A --> G[Clear Stop ✓]
\`\`\`

## Advanced: ReAct with Memory

\`\`\`python|javascript
class ReActAgentWithMemory:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.long_term_memory = []  # Persists across conversations

    def run(self, user_query):
        # Include relevant memories in context
        relevant_memories = self.search_memory(user_query)

        history = []
        prompt = f"""
        User Query: {user_query}

        Relevant Past Information:
        {relevant_memories}

        Think step by step using the ReAct pattern.
        """

        # ... rest of ReAct loop ...

        # Save important findings to memory
        self.save_to_memory(user_query, final_answer)

        return final_answer
|||
class ReActAgentWithMemory {
    constructor(llm, tools) {
        this.llm = llm;
        this.tools = tools;
        this.longTermMemory = [];  // Persists across conversations
    }

    async run(userQuery) {
        // Include relevant memories in context
        const relevantMemories = this.searchMemory(userQuery);

        const history = [];
        const prompt = \`
        User Query: \${userQuery}

        Relevant Past Information:
        \${relevantMemories}

        Think step by step using the ReAct pattern.
        \`;

        // ... rest of ReAct loop ...

        // Save important findings to memory
        this.saveToMemory(userQuery, finalAnswer);

        return finalAnswer;
    }
}
\`\`\`

## Key Takeaways

\`\`\`mermaid
flowchart LR
    A[ReAct] --> B[Thought]
    A --> C[Action]
    A --> D[Observation]
    B --> E[Makes agents smarter]
    C --> E
    D --> E
\`\`\`

| Remember | Description |
|----------|-------------|
| **Re** = Reasoning | Agent thinks before acting |
| **Act** = Action | Agent uses tools to do things |
| **Loop** | Thought → Action → Observation → Repeat |
| **When done** | Agent says "FINAL ANSWER" |

**The golden rule:** Always make your agent THINK before it ACTS. This simple idea makes agents 10x more effective!

## What's Next?

In the next lesson, we'll dive deeper into the **Thought-Action-Observation Loop** and learn advanced techniques for each component.
`,
  previousTopic: { module: 3, slug: 'stateless-vs-stateful', title: 'Stateless vs Stateful Agents' },
  nextTopic: { module: 3, slug: 'thought-action-observation', title: 'Thought–Action–Observation Loop' },
};

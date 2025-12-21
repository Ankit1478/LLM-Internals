import { Article } from './types';

export const reactiveVsDeliberative: Article = {
  module: 3,
  slug: 'reactive-vs-deliberative',
  title: 'Reactive vs Deliberative Agents',
  description: 'Quick reflexes vs deep thinking - when to use which',
  readTime: 5,
  content: `# Reactive vs Deliberative Agents

## The Core Difference

Think of two people in a kitchen:
- **Reactive:** A line cook who instantly responds - order comes in, food goes out
- **Deliberative:** A chef planning a 7-course meal - thinks, plans, then cooks

\`\`\`mermaid
flowchart LR
    subgraph Reactive[Reactive Agent]
        A1[See] --> A2[Act]
    end

    subgraph Deliberative[Deliberative Agent]
        B1[See] --> B2[Think]
        B2 --> B3[Plan]
        B3 --> B4[Act]
    end
\`\`\`

## Understanding Both Types

### Reactive Agents

**Definition:** Agents that respond immediately to inputs using predefined rules or patterns. No planning, no memory of past - just stimulus → response.

\`\`\`mermaid
flowchart TD
    A[User Input] --> B{Match Rule?}
    B -->|Yes| C[Execute Response]
    B -->|No| D[Default Response]
    C --> E[Done]
    D --> E
\`\`\`

**Characteristics:**
- Fast response time (milliseconds)
- No internal state or planning
- Works like if-else conditions
- Perfect for simple, repetitive tasks

**Real Examples:**
| Example | Input | Output |
|---------|-------|--------|
| Chatbot greeting | "Hello" | "Hi! How can I help?" |
| Spam filter | Contains "lottery" | Mark as spam |
| Auto-reply | Email received | "I'm out of office" |
| Thermostat | Temp > 25°C | Turn on AC |

### Deliberative Agents

**Definition:** Agents that maintain a model of the world, reason about goals, and create plans before acting. They think before doing.

\`\`\`mermaid
flowchart TD
    A[Goal] --> B[Analyze Situation]
    B --> C[Generate Options]
    C --> D[Evaluate Options]
    D --> E[Create Plan]
    E --> F[Execute Step 1]
    F --> G[Monitor Result]
    G --> H{Goal Achieved?}
    H -->|No| B
    H -->|Yes| I[Done]
\`\`\`

**Characteristics:**
- Slower but smarter
- Maintains internal world model
- Can handle novel situations
- Adapts when things go wrong

**Real Examples:**
| Example | Process |
|---------|---------|
| Trip planner | Analyze dates → Find flights → Compare → Book |
| Code assistant | Understand task → Design → Write → Test |
| Research agent | Break down question → Search → Synthesize |

## Code Implementation

### Reactive Agent

\`\`\`python|javascript
class ReactiveAgent:
    def __init__(self):
        # Simple rule-based responses
        self.rules = {
            "hello": "Hi there! How can I help you?",
            "bye": "Goodbye! Have a great day!",
            "thanks": "You're welcome!",
            "help": "I can help with FAQs, orders, and support."
        }

    def respond(self, user_input):
        user_input = user_input.lower()

        # Check each rule
        for trigger, response in self.rules.items():
            if trigger in user_input:
                return response

        # No rule matched - default response
        return "I'm not sure. Can you rephrase?"

# Usage - Instant responses
agent = ReactiveAgent()
print(agent.respond("Hello!"))        # "Hi there! How can I help you?"
print(agent.respond("I need help"))   # "I can help with FAQs..."
|||
class ReactiveAgent {
    constructor() {
        // Simple rule-based responses
        this.rules = {
            hello: "Hi there! How can I help you?",
            bye: "Goodbye! Have a great day!",
            thanks: "You're welcome!",
            help: "I can help with FAQs, orders, and support."
        };
    }

    respond(userInput) {
        userInput = userInput.toLowerCase();

        // Check each rule
        for (const [trigger, response] of Object.entries(this.rules)) {
            if (userInput.includes(trigger)) {
                return response;
            }
        }

        // No rule matched - default response
        return "I'm not sure. Can you rephrase?";
    }
}

// Usage - Instant responses
const agent = new ReactiveAgent();
console.log(agent.respond("Hello!"));       // "Hi there! How can I help you?"
console.log(agent.respond("I need help"));  // "I can help with FAQs..."
\`\`\`

### Deliberative Agent

\`\`\`python|javascript
class DeliberativeAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.world_model = {}  # Internal state

    def respond(self, goal):
        # Step 1: Understand the goal
        analysis = self.analyze_goal(goal)

        # Step 2: Create a plan
        plan = self.create_plan(analysis)
        print(f"Plan: {[step['action'] for step in plan]}")

        # Step 3: Execute each step
        results = []
        for step in plan:
            result = self.execute_step(step)
            results.append(result)

            # Update world model
            self.world_model[step["action"]] = result

            # Re-plan if needed
            if not result["success"]:
                plan = self.replan(goal, results)

        # Step 4: Synthesize final answer
        return self.synthesize(goal, results)

    def analyze_goal(self, goal):
        return self.llm.generate(f"""
            Goal: {goal}
            What information do I need?
            What steps are required?
        """)

    def create_plan(self, analysis):
        return self.llm.generate(f"""
            Analysis: {analysis}
            Tools: {list(self.tools.keys())}
            Create step-by-step plan.
        """)

    def execute_step(self, step):
        tool = self.tools.get(step["tool"])
        return tool(step["params"]) if tool else {"success": False}
|||
class DeliberativeAgent {
    constructor(llm, tools) {
        this.llm = llm;
        this.tools = tools;
        this.worldModel = {}; // Internal state
    }

    async respond(goal) {
        // Step 1: Understand the goal
        const analysis = await this.analyzeGoal(goal);

        // Step 2: Create a plan
        let plan = await this.createPlan(analysis);
        console.log("Plan:", plan.map(s => s.action));

        // Step 3: Execute each step
        const results = [];
        for (const step of plan) {
            const result = await this.executeStep(step);
            results.push(result);

            // Update world model
            this.worldModel[step.action] = result;

            // Re-plan if needed
            if (!result.success) {
                plan = await this.replan(goal, results);
            }
        }

        // Step 4: Synthesize final answer
        return this.synthesize(goal, results);
    }

    async analyzeGoal(goal) {
        return await this.llm.generate(\`
            Goal: \${goal}
            What information do I need?
            What steps are required?
        \`);
    }

    async createPlan(analysis) {
        return await this.llm.generate(\`
            Analysis: \${analysis}
            Tools: \${Object.keys(this.tools)}
            Create step-by-step plan.
        \`);
    }

    async executeStep(step) {
        const tool = this.tools[step.tool];
        return tool ? await tool(step.params) : { success: false };
    }
}
\`\`\`

## Side-by-Side Comparison

| Aspect | Reactive | Deliberative |
|--------|----------|--------------|
| **Speed** | Milliseconds | Seconds to minutes |
| **Planning** | None | Full planning cycle |
| **Memory** | Stateless | Maintains world model |
| **Adaptability** | Fixed rules | Handles new situations |
| **Cost** | Low (no LLM calls) | High (multiple LLM calls) |
| **Best for** | Simple, repeated tasks | Complex, novel tasks |
| **Failure mode** | Wrong rule fires | Plan fails mid-execution |

## The Hybrid Approach

Smart systems combine both - react quickly when possible, deliberate when necessary.

\`\`\`mermaid
flowchart TD
    A[User Input] --> B{Can React?}
    B -->|Simple query| C[Reactive Response]
    B -->|Complex task| D[Deliberative Process]
    C --> E[Fast Output]
    D --> F[Thoughtful Output]
\`\`\`

\`\`\`python|javascript
class HybridAgent:
    def __init__(self, llm, tools):
        self.reactive = ReactiveAgent()
        self.deliberative = DeliberativeAgent(llm, tools)

        # Keywords that trigger deliberation
        self.complex_indicators = [
            "plan", "research", "analyze", "compare",
            "create", "build", "design", "find best"
        ]

    def respond(self, user_input):
        # Quick complexity check
        if self.is_complex(user_input):
            return self.deliberative.respond(user_input)
        else:
            return self.reactive.respond(user_input)

    def is_complex(self, text):
        text_lower = text.lower()
        return any(kw in text_lower for kw in self.complex_indicators)

# Usage
agent = HybridAgent(llm, tools)
agent.respond("Hello")                    # Reactive (instant)
agent.respond("Plan a trip to Japan")     # Deliberative (plans)
|||
class HybridAgent {
    constructor(llm, tools) {
        this.reactive = new ReactiveAgent();
        this.deliberative = new DeliberativeAgent(llm, tools);

        // Keywords that trigger deliberation
        this.complexIndicators = [
            "plan", "research", "analyze", "compare",
            "create", "build", "design", "find best"
        ];
    }

    async respond(userInput) {
        // Quick complexity check
        if (this.isComplex(userInput)) {
            return await this.deliberative.respond(userInput);
        } else {
            return this.reactive.respond(userInput);
        }
    }

    isComplex(text) {
        const textLower = text.toLowerCase();
        return this.complexIndicators.some(kw => textLower.includes(kw));
    }
}

// Usage
const agent = new HybridAgent(llm, tools);
await agent.respond("Hello");                  // Reactive (instant)
await agent.respond("Plan a trip to Japan");   // Deliberative (plans)
\`\`\`

## When to Use Which

| Scenario | Agent Type | Why |
|----------|-----------|-----|
| Customer FAQ bot | Reactive | Fast, predictable responses |
| Trip planning | Deliberative | Multiple steps, comparisons |
| Auto-complete | Reactive | Speed is critical |
| Code generation | Deliberative | Needs planning and reasoning |
| Alert system | Reactive | Immediate action needed |
| Research assistant | Deliberative | Complex information synthesis |
| Chat greeting | Reactive | Simple pattern matching |
| Project planning | Deliberative | Multiple considerations |

## Key Takeaways

| Principle | Description |
|-----------|-------------|
| **Reactive = Reflexes** | Fast, rule-based, no thinking |
| **Deliberative = Reasoning** | Slow, planned, goal-oriented |
| **Hybrid = Smart** | React when you can, deliberate when you must |
| **Match complexity** | Simple task → Reactive, Complex task → Deliberative |
| **Cost matters** | Deliberation is expensive, use wisely |
`,
  previousTopic: { module: 3, slug: 'planner-worker-architecture', title: 'Planner + Worker Architecture' },
  nextTopic: { module: 3, slug: 'agent-state-machines', title: 'State Machines for Agents' },
};

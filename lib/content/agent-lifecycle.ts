import { Article } from './types';

export const agentLifecycle: Article = {
  module: 2,
  slug: 'agent-lifecycle',
  title: 'Agent Lifecycle',
  description: 'Understanding how an AI Agent lives, works, and completes tasks',
  readTime: 5,
  content: `# Agent Lifecycle

## What is Agent Lifecycle?

The **lifecycle** is how an agent lives from start to finish. Like a human's day:
- Wake up → Work → Sleep → Repeat

An agent's lifecycle:
- **Start** → **Think** → **Act** → **Check** → **Repeat or Stop**

## The Simple Loop

Every AI agent follows a continuous loop until the task is complete. This is the heartbeat of any agent system.

\`\`\`mermaid
flowchart TD
    A[1. PERCEIVE] --> B[2. THINK]
    B --> C[3. ACT]
    C --> D{4. DONE?}
    D -->|No| A
    D -->|Yes| E[5. STOP]
\`\`\`

**Understanding the Loop:**

The agent lifecycle is inspired by how humans work. When you're given a task, you don't just do it blindly - you observe, plan, execute, and check your progress. AI agents work the same way!

| Step | What Agent Does | Human Example | Why It Matters |
|------|-----------------|---------------|----------------|
| Perceive | See/Read input | Open your eyes | Agent needs to understand the situation |
| Think | Decide what to do | Plan your day | Without planning, agent acts randomly |
| Act | Do something | Go to work | This is where real work happens |
| Check | Is task done? | Did I finish? | Prevents infinite loops |
| Stop | End the task | Go home | Return results to user |

**Key Insight:** The loop continues until the goal is achieved. If the agent gets stuck, it should have a maximum step limit to prevent running forever.

## Real Example: Food Ordering Agent

Let's see how the lifecycle works with a real example. When you say "Order me a pizza", the agent doesn't just magically order - it goes through multiple cycles of the loop.

**Your request:** "Order me a pizza"

\`\`\`mermaid
flowchart TD
    A[Perceive: User wants pizza] --> B[Think: Which app? What pizza?]
    B --> C[Act: Open Zomato]
    C --> D{Done? No}
    D --> E[Perceive: See menu]
    E --> F[Think: User likes Margherita]
    F --> G[Act: Add to cart]
    G --> H{Done? No}
    H --> I[Act: Place order]
    I --> J{Done? Yes!}
    J --> K[Stop: Order confirmed]
\`\`\`

**What's happening in each cycle:**

**Cycle 1:** Agent understands you want pizza → Decides to open a food app → Opens Zomato → Checks: Order placed? No, continue.

**Cycle 2:** Agent sees the menu → Decides based on your past orders → Adds Margherita to cart → Checks: Order placed? No, continue.

**Cycle 3:** Agent sees cart is ready → Decides to checkout → Places order → Checks: Order placed? Yes! → Stops and returns confirmation.

**Why multiple cycles?** Complex tasks can't be done in one step. The agent breaks them down and handles each part, checking progress after each action.

## The 5 Lifecycle Stages

Now let's deep dive into each stage with theory and code.

### Stage 1: Initialize (Born)

**Theory:** Before an agent can do anything, it needs to be created with its capabilities defined. This is like hiring an employee - you need to tell them what tools they have access to and what they're responsible for.

During initialization:
- Agent loads its available tools (search, email, database, etc.)
- Agent sets up empty memory to store conversation history
- Agent prepares to receive goals from the user

**Why it matters:** A poorly initialized agent won't know what it can do. If you don't give it tools, it can only talk - not act!

\`\`\`python|javascript
# Agent is born with tools and memory
class PizzaAgent:
    def __init__(self):
        self.tools = ["search_restaurant", "place_order"]
        self.memory = []
        self.goal = None

agent = PizzaAgent()  # Agent is born!
|||
// Agent is born with tools and memory
class PizzaAgent {
    constructor() {
        this.tools = ["searchRestaurant", "placeOrder"];
        this.memory = [];
        this.goal = null;
    }
}

const agent = new PizzaAgent();  // Agent is born!
\`\`\`

### Stage 2: Perceive (See)

**Theory:** Perception is how the agent understands the world around it. Just like humans use eyes and ears, agents use APIs, user messages, and data sources to "see" their environment.

The perception stage answers: **"What is the current situation?"**

Key things an agent perceives:
- **User input:** What did the user ask for?
- **Environment state:** What's the current status of things?
- **Context:** What happened before? What constraints exist?

\`\`\`mermaid
flowchart LR
    A[User Input] --> B[Agent Eyes]
    B --> C[Understanding]
\`\`\`

**Real-world analogy:** When a waiter comes to your table, they first LOOK at the menu you're pointing to, LISTEN to your order, and NOTICE if you seem in a hurry. That's perception!

\`\`\`python|javascript
def perceive(self, user_input):
    # Agent sees the request
    self.goal = "Order pizza"
    self.context = {
        "request": user_input,
        "time": "8 PM",
        "location": "Mumbai"
    }
    return self.context
|||
perceive(userInput) {
    // Agent sees the request
    this.goal = "Order pizza";
    this.context = {
        request: userInput,
        time: "8 PM",
        location: "Mumbai"
    };
    return this.context;
}
\`\`\`

### Stage 3: Think (Decide)

**Theory:** This is the "brain" of the agent - where the LLM (Large Language Model) shines. The agent takes what it perceived and decides the best course of action.

The thinking stage answers: **"What should I do next?"**

Two types of thinking:
1. **Planning:** Breaking a big goal into smaller steps
2. **Reasoning:** Deciding which step to take RIGHT NOW

\`\`\`mermaid
flowchart TD
    A[Goal: Order Pizza] --> B{What do I need?}
    B --> C[Find restaurant]
    B --> D[Choose pizza]
    B --> E[Get address]
    C --> F[Make Plan]
    D --> F
    E --> F
\`\`\`

**Why thinking is crucial:** Without proper thinking, an agent might:
- Try to checkout before adding items to cart
- Book a flight without checking dates
- Send an email without writing content

Good agents think BEFORE they act!

\`\`\`python|javascript
def think(self):
    # Agent makes a plan
    plan = [
        "1. Search for pizza restaurants",
        "2. Pick the best rated one",
        "3. Select Margherita pizza",
        "4. Add delivery address",
        "5. Place order"
    ]
    return plan
|||
think() {
    // Agent makes a plan
    const plan = [
        "1. Search for pizza restaurants",
        "2. Pick the best rated one",
        "3. Select Margherita pizza",
        "4. Add delivery address",
        "5. Place order"
    ];
    return plan;
}
\`\`\`

### Stage 4: Act (Do)

**Theory:** Action is where the agent actually DOES something in the real world. This is what separates agents from simple chatbots - they don't just talk, they take action!

The action stage answers: **"Let me do this!"**

Types of actions:
- **Tool calls:** Search the web, query database, send email
- **API calls:** Book tickets, place orders, post on social media
- **File operations:** Read, write, edit documents
- **Communication:** Send messages, notifications

\`\`\`mermaid
flowchart LR
    A[Agent] --> B[Tool: Search]
    B --> C[Result: Found restaurants]
    A --> D[Tool: Order]
    D --> E[Result: Order placed]
\`\`\`

**Important concept - Tool Use:** The agent doesn't have hands, but it has TOOLS. Each tool is like a superpower:
- Search tool = Agent can find information
- Email tool = Agent can send messages
- Database tool = Agent can store/retrieve data

\`\`\`python|javascript
def act(self, action):
    if action == "search":
        result = self.tools["search_restaurant"]("pizza", "Mumbai")
    elif action == "order":
        result = self.tools["place_order"](pizza="Margherita")

    self.memory.append({"action": action, "result": result})
    return result
|||
act(action) {
    let result;
    if (action === "search") {
        result = this.tools.searchRestaurant("pizza", "Mumbai");
    } else if (action === "order") {
        result = this.tools.placeOrder({ pizza: "Margherita" });
    }

    this.memory.push({ action, result });
    return result;
}
\`\`\`

### Stage 5: Check & Stop (Done?)

**Theory:** After every action, the agent must check: "Did I achieve my goal?" This is critical because:

1. **Prevents infinite loops:** Without checking, agent runs forever
2. **Enables course correction:** If action failed, try something else
3. **Knows when to stop:** Return results to user at the right time

The check stage answers: **"Am I done yet?"**

\`\`\`mermaid
flowchart TD
    A[Check Result] --> B{Goal Complete?}
    B -->|Yes| C[Return Success]
    B -->|No| D[Continue Loop]
    B -->|Error| E[Handle Error]
    E --> D
\`\`\`

**Three possible outcomes after checking:**
1. **Success:** Goal achieved! Stop and return results.
2. **In Progress:** Not done yet, continue the loop.
3. **Error:** Something went wrong, handle it and retry.

**Pro tip:** Always set a maximum number of steps (like 10 or 20) to prevent runaway agents that never stop!

\`\`\`python|javascript
def is_done(self):
    # Check if order is placed
    last_action = self.memory[-1]
    if last_action["result"] == "order_confirmed":
        return True
    return False
|||
isDone() {
    // Check if order is placed
    const lastAction = this.memory[this.memory.length - 1];
    if (lastAction.result === "order_confirmed") {
        return true;
    }
    return false;
}
\`\`\`

## Complete Agent Code

\`\`\`python|javascript
class SimpleAgent:
    def __init__(self):
        self.memory = []
        self.max_steps = 10  # Prevent infinite loop

    def run(self, user_request):
        # Stage 1: Initialize
        step = 0

        # Stage 2: Perceive
        goal = self.perceive(user_request)

        while step < self.max_steps:
            step += 1

            # Stage 3: Think
            action = self.think(goal)

            # Stage 4: Act
            result = self.act(action)

            # Stage 5: Check
            if self.is_done(result):
                return f"Done! {result}"

        return "Max steps reached"

# Usage
agent = SimpleAgent()
agent.run("Order me a pizza")
|||
class SimpleAgent {
    constructor() {
        this.memory = [];
        this.maxSteps = 10;  // Prevent infinite loop
    }

    async run(userRequest) {
        // Stage 1: Initialize
        let step = 0;

        // Stage 2: Perceive
        const goal = this.perceive(userRequest);

        while (step < this.maxSteps) {
            step++;

            // Stage 3: Think
            const action = this.think(goal);

            // Stage 4: Act
            const result = await this.act(action);

            // Stage 5: Check
            if (this.isDone(result)) {
                return \`Done! \${result}\`;
            }
        }

        return "Max steps reached";
    }
}

// Usage
const agent = new SimpleAgent();
agent.run("Order me a pizza");
\`\`\`

## Lifecycle Visual Summary

\`\`\`mermaid
flowchart TB
    subgraph Lifecycle
        A[INIT] --> B[PERCEIVE]
        B --> C[THINK]
        C --> D[ACT]
        D --> E[CHECK]
        E -->|Not Done| B
        E -->|Done| F[STOP]
    end
\`\`\`

## Key Takeaways

| Stage | Purpose | Question |
|-------|---------|----------|
| Init | Setup agent | What tools do I have? |
| Perceive | Understand input | What does user want? |
| Think | Plan next step | What should I do? |
| Act | Execute action | Do the thing! |
| Check | Verify result | Am I done? |
| Stop | End task | Return result |

**Remember:** Perceive → Think → Act → Check → Repeat!
`,
  previousTopic: { module: 2, slug: 'agent-vs-prompt-vs-workflow', title: 'Agent vs Prompt vs Workflow' },
  nextTopic: { module: 2, slug: 'agent-environment-state', title: 'Environment, State, Actions, Observations' },
};

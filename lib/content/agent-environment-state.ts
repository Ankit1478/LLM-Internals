import { Article } from './types';

export const agentEnvironmentState: Article = {
  module: 2,
  slug: 'agent-environment-state',
  title: 'Environment, State, Actions, Observations',
  description: 'The 4 building blocks every AI Agent needs to work',
  readTime: 6,
  content: `# Environment, State, Actions, Observations

## The 4 Building Blocks

Every agent needs 4 things to work. Think of these as the fundamental pieces that make any agent function - without even ONE of them, the agent can't operate properly.

\`\`\`mermaid
flowchart TD
    subgraph Agent World
        A[ENVIRONMENT] --- B[STATE]
        A --- C[ACTIONS]
        A --- D[OBSERVATIONS]
    end
\`\`\`

**Why these 4 matter:**

These concepts come from **Reinforcement Learning** - the science of how machines learn by interacting with their world. Every AI agent, from game-playing bots to ChatGPT, uses these 4 building blocks.

| Block | What is it? | Real-Life Example | Without it... |
|-------|-------------|-------------------|---------------|
| **Environment** | Where agent works | Kitchen | Agent has nowhere to operate |
| **State** | Current situation | Fridge is empty | Agent doesn't know what's happening |
| **Actions** | What agent can do | Cook, Order food | Agent can't do anything |
| **Observations** | What agent sees | See empty fridge | Agent is blind to results |

**Real-life analogy:** Imagine you're a delivery driver (agent). The city is your **environment**, your current location is your **state**, driving/walking are your **actions**, and your GPS showing traffic is your **observation**.

## 1. Environment (Where)

The **environment** is the world where the agent lives and works. It includes everything the agent can interact with.

**Theory:** In AI, the environment is everything OUTSIDE the agent that it can perceive and affect. The agent doesn't control the environment - it just lives in it and reacts to it.

Key characteristics of environments:
- **Boundaries:** Where can the agent operate? (Only Gmail? Only your codebase?)
- **Rules:** What's allowed? What's forbidden?
- **Other actors:** Are there other users, systems, or agents?

\`\`\`mermaid
flowchart TB
    subgraph Environment
        A[Agent]
        B[Users]
        C[APIs]
        D[Databases]
        E[Files]
    end
\`\`\`

**Think of it this way:** The environment is like a fish tank for your agent. The fish (agent) can swim around, but can't go outside the tank. The water, plants, and other fish are all part of its environment.

### Examples of Environments

| Agent Type | Environment |
|------------|-------------|
| Chatbot | Chat interface |
| Code Agent | VS Code, GitHub |
| Email Agent | Gmail, Outlook |
| Shopping Agent | Amazon, Flipkart |
| Game Agent | Game world |

### Code Example

\`\`\`python|javascript
# Define the environment
class KitchenEnvironment:
    def __init__(self):
        self.fridge = ["milk", "eggs", "butter"]
        self.stove = "off"
        self.dishes = []

    def get_fridge_items(self):
        return self.fridge

    def turn_on_stove(self):
        self.stove = "on"
        return "Stove is now on"

# Agent works inside this environment
env = KitchenEnvironment()
|||
// Define the environment
class KitchenEnvironment {
    constructor() {
        this.fridge = ["milk", "eggs", "butter"];
        this.stove = "off";
        this.dishes = [];
    }

    getFridgeItems() {
        return this.fridge;
    }

    turnOnStove() {
        this.stove = "on";
        return "Stove is now on";
    }
}

// Agent works inside this environment
const env = new KitchenEnvironment();
\`\`\`

## 2. State (Current Situation)

The **state** is a snapshot of everything happening RIGHT NOW. It changes over time as actions are taken.

**Theory:** State is the agent's "memory of the present moment." It captures all relevant information needed to make the next decision. Without state, the agent would have no idea what's going on!

Why state matters:
- **Decision making:** Agent needs to know current situation to decide next step
- **Progress tracking:** Has the goal been achieved? How far along are we?
- **Context:** What happened before? What's relevant now?

\`\`\`mermaid
flowchart LR
    A[State at 9 AM] --> B[State at 10 AM]
    B --> C[State at 11 AM]

    A -.- D[Fridge: Full]
    B -.- E[Fridge: Half]
    C -.- F[Fridge: Empty]
\`\`\`

**Key insight:** State is NOT permanent - it changes after every action. Think of it like a scoreboard in a game - it updates constantly as the game progresses.

### What State Includes

\`\`\`mermaid
flowchart TB
    subgraph Current State
        A[Agent Memory]
        B[Environment Data]
        C[Goal Progress]
        D[Last Action Result]
    end
\`\`\`

### Code Example

\`\`\`python|javascript
# State holds current information
class AgentState:
    def __init__(self):
        self.current_goal = None
        self.completed_steps = []
        self.observations = []
        self.environment_data = {}

    def update(self, new_data):
        self.environment_data.update(new_data)

    def get_current_state(self):
        return {
            "goal": self.current_goal,
            "steps_done": len(self.completed_steps),
            "last_observation": self.observations[-1] if self.observations else None
        }

# Example
state = AgentState()
state.current_goal = "Make breakfast"
state.observations.append("Fridge has eggs")
print(state.get_current_state())
# {'goal': 'Make breakfast', 'steps_done': 0, 'last_observation': 'Fridge has eggs'}
|||
// State holds current information
class AgentState {
    constructor() {
        this.currentGoal = null;
        this.completedSteps = [];
        this.observations = [];
        this.environmentData = {};
    }

    update(newData) {
        this.environmentData = { ...this.environmentData, ...newData };
    }

    getCurrentState() {
        return {
            goal: this.currentGoal,
            stepsDone: this.completedSteps.length,
            lastObservation: this.observations[this.observations.length - 1] || null
        };
    }
}

// Example
const state = new AgentState();
state.currentGoal = "Make breakfast";
state.observations.push("Fridge has eggs");
console.log(state.getCurrentState());
// {goal: 'Make breakfast', stepsDone: 0, lastObservation: 'Fridge has eggs'}
\`\`\`

## 3. Actions (What Agent Can Do)

**Actions** are the things an agent can do to change the environment. They are the agent's "hands and feet."

**Theory:** An action is any operation that can change the state of the environment. Without actions, an agent can only think but never DO anything. Actions are what make agents useful!

Key concepts about actions:
- **Action space:** The complete set of all possible actions an agent can take
- **Valid actions:** Not all actions are valid in all states (can't checkout empty cart)
- **Side effects:** Actions change the environment, which affects future states

\`\`\`mermaid
flowchart LR
    A[Agent] --> B{Choose Action}
    B --> C[Search Web]
    B --> D[Send Email]
    B --> E[Write Code]
    B --> F[Read File]
\`\`\`

**Important:** The agent must CHOOSE which action to take. This choice is based on:
1. Current state (what's happening now?)
2. Goal (what am I trying to achieve?)
3. Available actions (what CAN I do?)

### Types of Actions

| Action Type | Examples |
|-------------|----------|
| **Read** | Get data, Search, Query |
| **Write** | Save, Create, Update |
| **Communicate** | Email, Message, Call API |
| **Compute** | Calculate, Analyze |

### Code Example

\`\`\`python|javascript
# Define available actions
class AgentActions:
    def __init__(self, environment):
        self.env = environment

    def search(self, query):
        # Search action
        return f"Searched for: {query}"

    def send_email(self, to, message):
        # Email action
        return f"Email sent to {to}"

    def read_file(self, path):
        # Read action
        return f"Read file: {path}"

    def write_file(self, path, content):
        # Write action
        return f"Written to: {path}"

# Agent has these actions available
actions = AgentActions(env)
result = actions.search("best pizza nearby")
|||
// Define available actions
class AgentActions {
    constructor(environment) {
        this.env = environment;
    }

    search(query) {
        // Search action
        return \`Searched for: \${query}\`;
    }

    sendEmail(to, message) {
        // Email action
        return \`Email sent to \${to}\`;
    }

    readFile(path) {
        // Read action
        return \`Read file: \${path}\`;
    }

    writeFile(path, content) {
        // Write action
        return \`Written to: \${path}\`;
    }
}

// Agent has these actions available
const actions = new AgentActions(env);
const result = actions.search("best pizza nearby");
\`\`\`

## 4. Observations (What Agent Sees)

**Observations** are the feedback the agent receives after taking an action. They tell the agent what happened!

**Theory:** After every action, the environment responds. The observation is that response - it tells the agent whether the action worked, what changed, and what's the new situation.

Why observations are critical:
- **Feedback loop:** Agent learns what worked and what didn't
- **State update:** Observations help update the current state
- **Decision input:** Next action depends on what was observed

\`\`\`mermaid
flowchart LR
    A[Action: Search] --> B[Environment]
    B --> C[Observation: 5 results found]
\`\`\`

**Think about it:** When you click a button on a website, you OBSERVE what happens - maybe a popup appears, or an error message shows. That observation tells you whether your action worked!

### The Action-Observation Loop

\`\`\`mermaid
flowchart TD
    A[Take Action] --> B[Environment Changes]
    B --> C[Get Observation]
    C --> D[Update State]
    D --> E[Decide Next Action]
    E --> A
\`\`\`

### Code Example

\`\`\`python|javascript
# Observations from environment
class Observation:
    def __init__(self, action, result, success):
        self.action = action
        self.result = result
        self.success = success
        self.timestamp = "now"

    def to_dict(self):
        return {
            "action": self.action,
            "result": self.result,
            "success": self.success
        }

# After action, agent gets observation
obs = Observation(
    action="search",
    result=["Pizza Hut", "Dominos", "Local Pizza"],
    success=True
)
print(obs.to_dict())
# {'action': 'search', 'result': ['Pizza Hut', 'Dominos', 'Local Pizza'], 'success': True}
|||
// Observations from environment
class Observation {
    constructor(action, result, success) {
        this.action = action;
        this.result = result;
        this.success = success;
        this.timestamp = new Date();
    }

    toDict() {
        return {
            action: this.action,
            result: this.result,
            success: this.success
        };
    }
}

// After action, agent gets observation
const obs = new Observation(
    "search",
    ["Pizza Hut", "Dominos", "Local Pizza"],
    true
);
console.log(obs.toDict());
// {action: 'search', result: ['Pizza Hut', 'Dominos', 'Local Pizza'], success: true}
\`\`\`

## How They Work Together

\`\`\`mermaid
flowchart TD
    subgraph Complete Flow
        A[Environment: Food delivery app] --> B[State: Cart empty]
        B --> C[Action: Add pizza to cart]
        C --> D[Observation: Pizza added!]
        D --> E[State: Cart has 1 item]
        E --> F[Action: Checkout]
        F --> G[Observation: Order placed!]
    end
\`\`\`

## Complete Example: Shopping Agent

\`\`\`python|javascript
class ShoppingAgent:
    def __init__(self):
        # Environment
        self.environment = {
            "store": "Amazon",
            "cart": [],
            "budget": 1000
        }

        # State
        self.state = {
            "goal": None,
            "items_found": [],
            "order_placed": False
        }

        # Available Actions
        self.actions = ["search", "add_to_cart", "checkout"]

    def observe(self):
        # Get observation from environment
        return {
            "cart_items": len(self.environment["cart"]),
            "total": sum(item["price"] for item in self.environment["cart"]),
            "budget_left": self.environment["budget"]
        }

    def act(self, action, params=None):
        if action == "search":
            # Search returns observation
            return {"found": ["Item A - $50", "Item B - $30"]}

        elif action == "add_to_cart":
            self.environment["cart"].append(params)
            return {"status": "added", "cart_size": len(self.environment["cart"])}

        elif action == "checkout":
            self.state["order_placed"] = True
            return {"status": "order_confirmed"}

    def run(self, goal):
        self.state["goal"] = goal

        # 1. Observe initial state
        obs = self.observe()
        print(f"Initial: {obs}")

        # 2. Search for item
        search_result = self.act("search")
        print(f"Search: {search_result}")

        # 3. Add to cart
        add_result = self.act("add_to_cart", {"name": "Item A", "price": 50})
        print(f"Add: {add_result}")

        # 4. Observe new state
        obs = self.observe()
        print(f"After add: {obs}")

        # 5. Checkout
        checkout_result = self.act("checkout")
        print(f"Checkout: {checkout_result}")

# Run the agent
agent = ShoppingAgent()
agent.run("Buy a gift under $100")
|||
class ShoppingAgent {
    constructor() {
        // Environment
        this.environment = {
            store: "Amazon",
            cart: [],
            budget: 1000
        };

        // State
        this.state = {
            goal: null,
            itemsFound: [],
            orderPlaced: false
        };

        // Available Actions
        this.actions = ["search", "addToCart", "checkout"];
    }

    observe() {
        // Get observation from environment
        const total = this.environment.cart.reduce((sum, item) => sum + item.price, 0);
        return {
            cartItems: this.environment.cart.length,
            total: total,
            budgetLeft: this.environment.budget - total
        };
    }

    act(action, params = null) {
        if (action === "search") {
            return { found: ["Item A - $50", "Item B - $30"] };
        }
        else if (action === "addToCart") {
            this.environment.cart.push(params);
            return { status: "added", cartSize: this.environment.cart.length };
        }
        else if (action === "checkout") {
            this.state.orderPlaced = true;
            return { status: "order_confirmed" };
        }
    }

    run(goal) {
        this.state.goal = goal;

        // 1. Observe initial state
        let obs = this.observe();
        console.log("Initial:", obs);

        // 2. Search for item
        const searchResult = this.act("search");
        console.log("Search:", searchResult);

        // 3. Add to cart
        const addResult = this.act("addToCart", { name: "Item A", price: 50 });
        console.log("Add:", addResult);

        // 4. Observe new state
        obs = this.observe();
        console.log("After add:", obs);

        // 5. Checkout
        const checkoutResult = this.act("checkout");
        console.log("Checkout:", checkoutResult);
    }
}

// Run the agent
const agent = new ShoppingAgent();
agent.run("Buy a gift under $100");
\`\`\`

## Summary

\`\`\`mermaid
flowchart LR
    A[Environment] -->|contains| B[State]
    B -->|enables| C[Actions]
    C -->|produce| D[Observations]
    D -->|update| B
\`\`\`

| Concept | Question | Example |
|---------|----------|---------|
| Environment | Where does agent work? | Amazon website |
| State | What's happening now? | Cart has 2 items |
| Actions | What can agent do? | Search, Add, Buy |
| Observations | What does agent see? | "Item added!" |

**Remember:** Environment → State → Action → Observation → New State!
`,
  previousTopic: { module: 2, slug: 'agent-lifecycle', title: 'Agent Lifecycle' },
  nextTopic: { module: 2, slug: 'deterministic-vs-probabilistic', title: 'Deterministic vs Probabilistic Agents' },
};

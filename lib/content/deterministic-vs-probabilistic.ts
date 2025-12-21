import { Article } from './types';

export const deterministicVsProbabilistic: Article = {
  module: 3,
  slug: 'deterministic-vs-probabilistic',
  title: 'Deterministic vs Probabilistic Agents',
  description: 'Understanding predictable vs unpredictable AI agents',
  readTime: 5,
  content: `# Deterministic vs Probabilistic Agents

## The Simple Difference

This is one of the most important concepts in AI agents. It determines how PREDICTABLE your agent will be.

\`\`\`mermaid
flowchart LR
    subgraph Deterministic
        A[Same Input] --> B[Same Output]
        C[1 + 1] --> D[Always 2]
    end

    subgraph Probabilistic
        E[Same Input] --> F[Different Outputs]
        G[Tell me a joke] --> H[Joke A or B or C]
    end
\`\`\`

**The core concept:**
- **Deterministic:** The universe where 1+1 ALWAYS equals 2. No surprises.
- **Probabilistic:** The universe where asking "tell me a joke" gives different jokes each time.

| Type | Behavior | Example | Predictability |
|------|----------|---------|----------------|
| **Deterministic** | Same input = Same output | Calculator | 100% predictable |
| **Probabilistic** | Same input = Different outputs | ChatGPT | Varies each time |

**Why does this matter?** If you're building a banking agent that calculates interest, you want DETERMINISTIC (exact same answer every time). If you're building a creative writing agent, you want PROBABILISTIC (fresh ideas each time).

## Deterministic Agent

A **deterministic** agent always does the SAME thing for the SAME input. Zero randomness, 100% predictable.

**Theory:** In computer science, "deterministic" means the output is completely determined by the input. Given the same starting conditions, you'll ALWAYS get the same result. This is how traditional programming works.

**Characteristics of deterministic agents:**
- Follow fixed rules or algorithms
- No randomness in decision making
- Easy to test and debug
- Perfect for tasks requiring accuracy

### Real-Life Example: Vending Machine

\`\`\`mermaid
flowchart TD
    A[Press A1] --> B[Always get Chips]
    C[Press B2] --> D[Always get Cola]
    E[Press A1 again] --> F[Same Chips again!]
\`\`\`

- Press A1 → Get Chips (always!)
- Press A1 tomorrow → Get Chips (same!)
- Press A1 100 times → Get Chips (100 times!)

### Code Example

\`\`\`python|javascript
# Deterministic Agent - Always same result
class CalculatorAgent:
    def calculate(self, a, b, operation):
        if operation == "add":
            return a + b
        elif operation == "multiply":
            return a * b

agent = CalculatorAgent()

# Same input = Same output (ALWAYS)
print(agent.calculate(2, 3, "add"))  # 5
print(agent.calculate(2, 3, "add"))  # 5
print(agent.calculate(2, 3, "add"))  # 5
# Always 5! Never changes!
|||
// Deterministic Agent - Always same result
class CalculatorAgent {
    calculate(a, b, operation) {
        if (operation === "add") {
            return a + b;
        } else if (operation === "multiply") {
            return a * b;
        }
    }
}

const agent = new CalculatorAgent();

// Same input = Same output (ALWAYS)
console.log(agent.calculate(2, 3, "add"));  // 5
console.log(agent.calculate(2, 3, "add"));  // 5
console.log(agent.calculate(2, 3, "add"));  // 5
// Always 5! Never changes!
\`\`\`

### When to Use Deterministic

\`\`\`mermaid
flowchart TD
    A{Need exact same result?} -->|Yes| B[Use Deterministic]
    A -->|No| C[Consider Probabilistic]

    B --> D[Banking]
    B --> E[Calculations]
    B --> F[Rule-based systems]
\`\`\`

## Probabilistic Agent

A **probabilistic** agent might give DIFFERENT outputs for the SAME input. It has randomness built in!

**Theory:** "Probabilistic" means the output is influenced by probability/randomness. The agent doesn't follow a fixed path - it samples from possibilities based on likelihood. This is how LLMs (Large Language Models) work!

**Characteristics of probabilistic agents:**
- Use randomness in decision making
- Can be creative and varied
- Harder to test (output varies)
- Perfect for creative and conversational tasks

**The science behind it:** LLMs predict the NEXT word by calculating probabilities for ALL possible words, then randomly selecting one (weighted by probability). That's why ChatGPT gives different answers each time!

### Real-Life Example: Asking a Friend

\`\`\`mermaid
flowchart TD
    A[You: Recommend a movie] --> B{Friend thinks...}
    B --> C[Day 1: Inception]
    B --> D[Day 2: Avatar]
    B --> E[Day 3: Interstellar]
\`\`\`

Same question, different answers based on:
- Mood
- What they remember
- Random choice

### Why LLMs are Probabilistic

\`\`\`mermaid
flowchart TD
    A[Prompt: Write a poem] --> B[LLM Brain]
    B --> C{Probability of next word}
    C -->|30%| D[The]
    C -->|25%| E[A]
    C -->|20%| F[In]
    C -->|25%| G[Once]
\`\`\`

LLMs pick words based on **probability**, not fixed rules!

### Code Example

\`\`\`python|javascript
import random

# Probabilistic Agent - Different results possible
class JokeAgent:
    def __init__(self):
        self.jokes = [
            "Why did the developer go broke? Because he used up all his cache!",
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "There are 10 types of people: those who understand binary and those who don't."
        ]

    def tell_joke(self):
        # Randomly picks a joke - probabilistic!
        return random.choice(self.jokes)

agent = JokeAgent()

# Same request, different outputs!
print(agent.tell_joke())  # Maybe joke 1
print(agent.tell_joke())  # Maybe joke 3
print(agent.tell_joke())  # Maybe joke 2
|||
// Probabilistic Agent - Different results possible
class JokeAgent {
    constructor() {
        this.jokes = [
            "Why did the developer go broke? Because he used up all his cache!",
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "There are 10 types of people: those who understand binary and those who don't."
        ];
    }

    tellJoke() {
        // Randomly picks a joke - probabilistic!
        const index = Math.floor(Math.random() * this.jokes.length);
        return this.jokes[index];
    }
}

const agent = new JokeAgent();

// Same request, different outputs!
console.log(agent.tellJoke());  // Maybe joke 1
console.log(agent.tellJoke());  // Maybe joke 3
console.log(agent.tellJoke());  // Maybe joke 2
\`\`\`

### LLM Temperature Setting

**Temperature** is the magic knob that controls how random/creative the AI is. This is the MOST important parameter when working with LLMs!

\`\`\`mermaid
flowchart LR
    subgraph Low Temp 0.1
        A[More Predictable]
        B[Same-ish answers]
    end

    subgraph High Temp 0.9
        C[More Random]
        D[Creative answers]
    end
\`\`\`

**How temperature works (simplified):**
- At **temperature = 0**: AI always picks the highest probability word. Very predictable.
- At **temperature = 1**: AI considers many possible words. Very creative/random.
- In between: Balanced behavior.

| Temperature | Behavior | Use Case | Example |
|-------------|----------|----------|---------|
| 0.0 | Almost deterministic | Facts, code | "What is 2+2?" → "4" |
| 0.3 | Slightly varied | Customer support | Consistent but natural |
| 0.5 | Balanced | General chat | Normal conversation |
| 0.7 | Creative | Brainstorming | Fresh ideas |
| 1.0 | Very random | Creative writing | Wild, unexpected content |

**Pro tip:** Start with temperature 0.7 for most tasks, then adjust based on whether you need more consistency (lower) or creativity (higher).

\`\`\`python|javascript
import openai

# Low temperature = More deterministic
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "What is 2+2?"}],
    temperature=0.0  # Very predictable
)
# Almost always: "4"

# High temperature = More probabilistic
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Write a creative story opening"}],
    temperature=0.9  # Very creative/random
)
# Different story each time!
|||
// Low temperature = More deterministic
const response1 = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "What is 2+2?" }],
    temperature: 0.0  // Very predictable
});
// Almost always: "4"

// High temperature = More probabilistic
const response2 = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Write a creative story opening" }],
    temperature: 0.9  // Very creative/random
});
// Different story each time!
\`\`\`

## Side-by-Side Comparison

\`\`\`mermaid
flowchart TB
    subgraph Deterministic
        A1[Input: Sort 3,1,2] --> A2[Output: 1,2,3]
        A3[Input: Sort 3,1,2] --> A4[Output: 1,2,3]
        A5[Always Same!]
    end

    subgraph Probabilistic
        B1[Input: Tell story] --> B2[Output: Story A]
        B3[Input: Tell story] --> B4[Output: Story B]
        B5[Different Each Time!]
    end
\`\`\`

| Aspect | Deterministic | Probabilistic |
|--------|---------------|---------------|
| **Predictability** | 100% predictable | Varies |
| **Testing** | Easy to test | Hard to test |
| **Creativity** | None | High |
| **Use case** | Math, logic | Chat, content |
| **Example** | Calculator | ChatGPT |

## Hybrid Approach

Most real agents use BOTH!

\`\`\`mermaid
flowchart TD
    A[User Request] --> B{What type of task?}
    B -->|Math/Logic| C[Deterministic: Calculator]
    B -->|Creative| D[Probabilistic: LLM]
    B -->|Search| E[Deterministic: Database]
    C --> F[Combine Results]
    D --> F
    E --> F
\`\`\`

### Code Example: Hybrid Agent

\`\`\`python|javascript
class HybridAgent:
    def __init__(self):
        self.llm = OpenAI()

    def process(self, task, task_type):
        if task_type == "calculate":
            # Deterministic - always same result
            return eval(task)  # "2+2" -> 4

        elif task_type == "creative":
            # Probabilistic - different each time
            return self.llm.generate(task, temperature=0.8)

        elif task_type == "factual":
            # Low randomness for facts
            return self.llm.generate(task, temperature=0.1)

agent = HybridAgent()

# Deterministic
print(agent.process("10 * 5", "calculate"))  # Always 50

# Probabilistic
print(agent.process("Write a poem", "creative"))  # Different each time

# Semi-deterministic
print(agent.process("What is Python?", "factual"))  # Similar each time
|||
class HybridAgent {
    constructor() {
        this.llm = new OpenAI();
    }

    async process(task, taskType) {
        if (taskType === "calculate") {
            // Deterministic - always same result
            return eval(task);  // "2+2" -> 4
        }
        else if (taskType === "creative") {
            // Probabilistic - different each time
            return await this.llm.generate(task, { temperature: 0.8 });
        }
        else if (taskType === "factual") {
            // Low randomness for facts
            return await this.llm.generate(task, { temperature: 0.1 });
        }
    }
}

const agent = new HybridAgent();

// Deterministic
console.log(agent.process("10 * 5", "calculate"));  // Always 50

// Probabilistic
console.log(await agent.process("Write a poem", "creative"));  // Different each time

// Semi-deterministic
console.log(await agent.process("What is Python?", "factual"));  // Similar each time
\`\`\`

## When to Use What?

\`\`\`mermaid
flowchart TD
    A[Your Task] --> B{Needs creativity?}
    B -->|Yes| C[Probabilistic]
    B -->|No| D{Needs exact answer?}
    D -->|Yes| E[Deterministic]
    D -->|No| F[Either works]

    C --> G[Stories, Ideas, Chat]
    E --> H[Math, Rules, Logic]
\`\`\`

## Key Takeaways

| Remember | Deterministic | Probabilistic |
|----------|---------------|---------------|
| Think of | Calculator | Creative friend |
| Same input | Same output | Different output |
| Best for | Logic, math | Creativity, chat |
| LLM temp | 0.0 - 0.2 | 0.7 - 1.0 |

**Rule of thumb:**
- Need **exact** answer? → Deterministic
- Need **creative** answer? → Probabilistic
- Need **both**? → Hybrid agent!
`,
  previousTopic: { module: 3, slug: 'agent-environment-state', title: 'Environment, State, Actions, Observations' },
  nextTopic: { module: 3, slug: 'stateless-vs-stateful', title: 'Stateless vs Stateful Agents' },
};

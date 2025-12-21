import { Article } from './types';

export const statelessVsStateful: Article = {
  module: 3,
  slug: 'stateless-vs-stateful',
  title: 'Stateless vs Stateful Agents',
  description: 'Understanding agents with and without memory',
  readTime: 5,
  content: `# Stateless vs Stateful Agents

## The Core Difference

This concept determines whether your agent can have a CONVERSATION or just answer isolated questions.

\`\`\`mermaid
flowchart LR
    subgraph Stateless
        A[No Memory]
        B[Each request is new]
    end

    subgraph Stateful
        C[Has Memory]
        D[Remembers past]
    end
\`\`\`

**The fundamental question:** Does your agent remember what happened before?

| Type | Memory | Example | Conversation |
|------|--------|---------|--------------|
| **Stateless** | None | Google Search | No - each search is independent |
| **Stateful** | Yes | ChatGPT | Yes - remembers earlier messages |

**Why this matters so much:**
- A stateless agent treats every request like it's from a stranger
- A stateful agent builds on previous interactions like a friend would
- The wrong choice can make your agent feel stupid or waste resources

## Stateless Agent (No Memory)

A **stateless** agent forgets everything after each request. Fresh start every time!

**Theory:** In computer science, "stateless" means the system doesn't store any information between requests. Each request is handled in complete isolation - the agent has no idea what happened before.

**Characteristics of stateless agents:**
- No memory between requests
- Each request is independent
- Simple to build and scale
- Fast because no memory lookup needed
- Perfect for one-shot tasks

**Trade-off:** Stateless agents are simpler but can't have conversations. They're like a vending machine - put in request, get result, done.

### Real-Life Example: Stranger on Street

\`\`\`mermaid
flowchart TD
    A[You: Where is the station?] --> B[Stranger: Go left]
    C[You: How far is it?] --> D[Stranger: What station?]
    E[Stranger forgot your first question!]
\`\`\`

Each question is like asking a NEW stranger!

### Code Example

\`\`\`python|javascript
# Stateless Agent - No memory between calls
class StatelessAgent:
    def answer(self, question):
        # No memory! Processes only current question
        if "weather" in question:
            return "I can check weather for you"
        elif "time" in question:
            return "I can tell time"
        else:
            return "I don't understand"

agent = StatelessAgent()

# Each call is independent - no memory!
print(agent.answer("What's the weather?"))
# "I can check weather for you"

print(agent.answer("What about tomorrow?"))
# "I don't understand"
# Agent forgot we were talking about weather!
|||
// Stateless Agent - No memory between calls
class StatelessAgent {
    answer(question) {
        // No memory! Processes only current question
        if (question.includes("weather")) {
            return "I can check weather for you";
        } else if (question.includes("time")) {
            return "I can tell time";
        } else {
            return "I don't understand";
        }
    }
}

const agent = new StatelessAgent();

// Each call is independent - no memory!
console.log(agent.answer("What's the weather?"));
// "I can check weather for you"

console.log(agent.answer("What about tomorrow?"));
// "I don't understand"
// Agent forgot we were talking about weather!
\`\`\`

### When Stateless is Good

\`\`\`mermaid
flowchart TD
    A[Stateless Works Best For]
    A --> B[One-time queries]
    A --> C[Independent tasks]
    A --> D[High-scale APIs]
    A --> E[Simple lookups]
\`\`\`

| Use Case | Why Stateless |
|----------|---------------|
| Search engine | Each search is independent |
| Calculator | Just needs numbers now |
| Translation | Just needs current text |
| Weather API | Just needs location now |

## Stateful Agent (Has Memory)

A **stateful** agent remembers previous interactions. Like talking to a friend who knows you!

**Theory:** "Stateful" means the system maintains information (state) between requests. The agent remembers what happened before and uses that context to handle current requests better.

**Characteristics of stateful agents:**
- Remembers conversation history
- Can refer back to earlier context
- More complex to build
- Requires memory storage
- Perfect for conversations and personalization

**How stateful agents store memory:**
1. **In-memory:** Fast but lost when agent restarts
2. **Database:** Persistent but slower
3. **Context window:** Send history with each request (how ChatGPT works!)

**Trade-off:** Stateful agents provide better UX but need more resources and are harder to scale.

### Real-Life Example: Your Friend

\`\`\`mermaid
flowchart TD
    A[You: I'm going to Goa] --> B[Friend: Nice! When?]
    C[You: Next week] --> D[Friend: For how long?]
    E[You: 3 days] --> F[Friend remembers: Goa, next week, 3 days]
\`\`\`

Friend remembers the WHOLE conversation!

### Code Example

\`\`\`python|javascript
# Stateful Agent - Has memory!
class StatefulAgent:
    def __init__(self):
        self.memory = []  # Memory storage!
        self.context = {}

    def answer(self, question):
        # Save to memory
        self.memory.append({"role": "user", "content": question})

        # Use memory for context
        if "weather" in question:
            self.context["topic"] = "weather"
            response = "I can check weather. Which city?"

        elif self.context.get("topic") == "weather":
            # Remembers we're talking about weather!
            city = question
            response = f"Weather in {city} is sunny!"

        else:
            response = "How can I help?"

        # Save response to memory too
        self.memory.append({"role": "assistant", "content": response})
        return response

agent = StatefulAgent()

print(agent.answer("What's the weather?"))
# "I can check weather. Which city?"

print(agent.answer("Mumbai"))
# "Weather in Mumbai is sunny!"
# Agent remembered we were talking about weather!
|||
// Stateful Agent - Has memory!
class StatefulAgent {
    constructor() {
        this.memory = [];  // Memory storage!
        this.context = {};
    }

    answer(question) {
        // Save to memory
        this.memory.push({ role: "user", content: question });

        let response;

        // Use memory for context
        if (question.includes("weather")) {
            this.context.topic = "weather";
            response = "I can check weather. Which city?";
        }
        else if (this.context.topic === "weather") {
            // Remembers we're talking about weather!
            const city = question;
            response = \`Weather in \${city} is sunny!\`;
        }
        else {
            response = "How can I help?";
        }

        // Save response to memory too
        this.memory.push({ role: "assistant", content: response });
        return response;
    }
}

const agent = new StatefulAgent();

console.log(agent.answer("What's the weather?"));
// "I can check weather. Which city?"

console.log(agent.answer("Mumbai"));
// "Weather in Mumbai is sunny!"
// Agent remembered we were talking about weather!
\`\`\`

## Visual Comparison

### Stateless Flow

\`\`\`mermaid
flowchart LR
    A[Request 1] --> B[Agent]
    B --> C[Response 1]

    D[Request 2] --> E[Agent]
    E --> F[Response 2]

    G[No connection between requests!]
\`\`\`

### Stateful Flow

\`\`\`mermaid
flowchart TD
    A[Request 1] --> B[Agent + Memory]
    B --> C[Response 1]
    B --> D[Save to Memory]

    E[Request 2] --> B
    B --> F[Read Memory]
    F --> G[Response 2 uses context!]
\`\`\`

## Chat Example Comparison

### Stateless Chat (Bad UX)

\`\`\`
User: My name is Rahul
Bot: Nice to meet you!

User: What's my name?
Bot: I don't know your name.  ❌
\`\`\`

### Stateful Chat (Good UX)

\`\`\`
User: My name is Rahul
Bot: Nice to meet you, Rahul!

User: What's my name?
Bot: Your name is Rahul!  ✓
\`\`\`

## Complete Comparison

Let's compare all aspects of both approaches:

\`\`\`mermaid
flowchart TB
    subgraph Stateless
        A1[No Memory]
        A2[Fast]
        A3[Simple]
        A4[Scalable]
    end

    subgraph Stateful
        B1[Has Memory]
        B2[Slower]
        B3[Complex]
        B4[Better UX]
    end
\`\`\`

**Deep dive into the differences:**

| Aspect | Stateless | Stateful | Winner for... |
|--------|-----------|----------|---------------|
| Memory | None | Yes | Stateful for conversations |
| Speed | Fast | Slower | Stateless for simple tasks |
| Scalability | Easy (no shared state) | Harder (need to sync) | Stateless for high traffic |
| Context | No | Yes | Stateful for personalization |
| Complexity | Simple | Complex | Stateless for quick builds |
| Cost | Lower (no storage) | Higher (needs DB) | Stateless for budget |
| User Experience | Basic | Rich | Stateful for engagement |

**Scaling considerations:**
- **Stateless:** Any server can handle any request. Easy to add more servers!
- **Stateful:** Need to route same user to same server, or sync state across servers. Complex!

## Code: Building Both Types

\`\`\`python|javascript
# Complete example of both types

class StatelessTranslator:
    """Translates text - no memory needed"""
    def translate(self, text, target_lang):
        # Each call is independent
        return call_translation_api(text, target_lang)


class StatefulAssistant:
    """Personal assistant - needs memory"""
    def __init__(self, user_id):
        self.user_id = user_id
        self.conversation = []
        self.user_preferences = {}

    def chat(self, message):
        # Add to conversation history
        self.conversation.append({
            "role": "user",
            "content": message
        })

        # Build context from memory
        context = self.build_context()

        # Generate response using full context
        response = self.llm.generate(
            messages=self.conversation,
            context=context
        )

        # Save response
        self.conversation.append({
            "role": "assistant",
            "content": response
        })

        return response

    def build_context(self):
        return {
            "user_name": self.user_preferences.get("name"),
            "past_topics": self.extract_topics(),
            "conversation_length": len(self.conversation)
        }


# Usage
translator = StatelessTranslator()
translator.translate("Hello", "Hindi")  # No memory needed

assistant = StatefulAssistant(user_id="user123")
assistant.chat("My name is Priya")  # Saved!
assistant.chat("What's my name?")   # Uses memory!
|||
// Complete example of both types

class StatelessTranslator {
    /** Translates text - no memory needed */
    translate(text, targetLang) {
        // Each call is independent
        return callTranslationApi(text, targetLang);
    }
}


class StatefulAssistant {
    /** Personal assistant - needs memory */
    constructor(userId) {
        this.userId = userId;
        this.conversation = [];
        this.userPreferences = {};
    }

    async chat(message) {
        // Add to conversation history
        this.conversation.push({
            role: "user",
            content: message
        });

        // Build context from memory
        const context = this.buildContext();

        // Generate response using full context
        const response = await this.llm.generate({
            messages: this.conversation,
            context: context
        });

        // Save response
        this.conversation.push({
            role: "assistant",
            content: response
        });

        return response;
    }

    buildContext() {
        return {
            userName: this.userPreferences.name,
            pastTopics: this.extractTopics(),
            conversationLength: this.conversation.length
        };
    }
}


// Usage
const translator = new StatelessTranslator();
translator.translate("Hello", "Hindi");  // No memory needed

const assistant = new StatefulAssistant("user123");
await assistant.chat("My name is Priya");  // Saved!
await assistant.chat("What's my name?");   // Uses memory!
\`\`\`

## When to Use What?

\`\`\`mermaid
flowchart TD
    A[Your Task] --> B{Need conversation?}
    B -->|Yes| C[Stateful]
    B -->|No| D{Need user context?}
    D -->|Yes| C
    D -->|No| E[Stateless]

    C --> F[Chatbots, Assistants]
    E --> G[APIs, Tools, Search]
\`\`\`

## Real-World Examples

| Product | Type | Why |
|---------|------|-----|
| Google Search | Stateless | Each search is independent |
| ChatGPT | Stateful | Remembers conversation |
| Calculator | Stateless | Just needs current numbers |
| Siri | Stateful | Knows your preferences |
| Translation API | Stateless | Just needs current text |
| Personal Assistant | Stateful | Knows your schedule, preferences |

## Key Takeaways

\`\`\`mermaid
flowchart LR
    A[Stateless] --> B[No Memory = Fresh Start]
    C[Stateful] --> D[Has Memory = Remembers]
\`\`\`

| Remember | Stateless | Stateful |
|----------|-----------|----------|
| Memory | Goldfish | Elephant |
| Each request | Brand new | Continues conversation |
| Best for | Simple tasks | Conversations |
| Complexity | Simple | Complex |

**Quick Rule:**
- One-shot task? → **Stateless**
- Ongoing conversation? → **Stateful**
- Need to remember user? → **Stateful**
- High scale, simple queries? → **Stateless**
`,
  previousTopic: { module: 3, slug: 'deterministic-vs-probabilistic', title: 'Deterministic vs Probabilistic Agents' },
  nextTopic: { module: 3, slug: 'react-pattern', title: 'ReAct Pattern' },
};

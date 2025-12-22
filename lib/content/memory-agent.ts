import { Article } from './types';

export const memoryAgent: Article = {
  module: 2,
  slug: 'memory-agent',
  title: 'Memory Agent',
  description: 'Stores and retrieves information for other agents',
  readTime: 3,
  content: `# Memory Agent

## What is it?

**Memory Agent** stores information and retrieves it when needed. It's the brain's storage system.

**Think of it like:** A librarian who stores books and finds them when asked.

## What it Stores

User facts: Name, company, location - Example: "User's name is Raj"

Preferences: Settings, likes/dislikes - Example: "User prefers dark mode"

Past interactions: Previous conversations - Example: "Last week discussed React"

Learned procedures: How to do tasks - Example: "Steps to deploy to AWS"

## Code Example

\`\`\`python|javascript
class MemoryAgent:
    def __init__(self, storage):
        self.storage = storage

    def store(self, key, value):
        self.storage.save({
            "key": key,
            "value": value,
            "timestamp": datetime.now()
        })

    def recall(self, query):
        # Find relevant memories
        return self.storage.search(query, limit=5)

    def should_remember(self, text):
        # Check if worth storing
        triggers = ["remember", "my name", "i prefer", "always"]
        return any(t in text.lower() for t in triggers)

# Usage
memory = MemoryAgent(VectorDB())
memory.store("user_name", "Raj")
memory.store("preference", "likes Python over JavaScript")

# Later...
info = memory.recall("what language does user prefer")
# Returns: "likes Python over JavaScript"
|||
class MemoryAgent {
    constructor(storage) {
        this.storage = storage;
    }

    store(key, value) {
        this.storage.save({
            key: key,
            value: value,
            timestamp: new Date()
        });
    }

    recall(query) {
        // Find relevant memories
        return this.storage.search(query, { limit: 5 });
    }

    shouldRemember(text) {
        // Check if worth storing
        const triggers = ["remember", "my name", "i prefer", "always"];
        return triggers.some(t => text.toLowerCase().includes(t));
    }
}

// Usage
const memory = new MemoryAgent(new VectorDB());
memory.store("user_name", "Raj");
memory.store("preference", "likes Python over JavaScript");

// Later...
const info = memory.recall("what language does user prefer");
// Returns: "likes Python over JavaScript"
\`\`\`

## Example Prompts

Extract memories from conversation:
\`\`\`
Analyze this conversation and extract information worth remembering:

Conversation: {conversation}

Extract:
1. User facts (name, job, location)
2. Preferences (likes, dislikes, settings)
3. Important events mentioned

Format as JSON:
{"facts": [...], "preferences": [...], "events": [...]}
\`\`\`

Recall relevant memories:
\`\`\`
Given this query, find relevant memories:

Query: {user_query}
Available memories: {memories}

Return only memories that are relevant to answering this query.
Rank by relevance.
\`\`\`

## Key Point

**Memory Agent = Smart Librarian.** Knows what's worth keeping and can find it fast.
`,
  previousTopic: { module: 2, slug: 'planning-agent', title: 'Planning Agent' },
  nextTopic: { module: 2, slug: 'evaluation-agent', title: 'Evaluation Agent' },
};

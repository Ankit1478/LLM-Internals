import { Article } from './types';

export const autogen: Article = {
  module: 2,
  slug: 'autogen',
  title: 'AutoGen (Microsoft)',
  description: 'Build multi-agent conversations where AI agents talk to each other',
  readTime: 7,
  content: `# AutoGen (Microsoft)

## What is AutoGen?

**AutoGen** = Microsoft's framework for building **multi-agent conversations**.

Imagine multiple AI agents talking to each other to solve a problem. That's AutoGen!

\`\`\`mermaid
flowchart LR
    A[User] --> B[Agent 1]
    B <--> C[Agent 2]
    C <--> D[Agent 3]
    D --> E[Solution]
\`\`\`

**Key idea:** Instead of one agent doing everything, multiple specialized agents **chat** with each other.

## Why AutoGen?

| Traditional Approach | AutoGen Approach |
|---------------------|------------------|
| One agent does all | Specialized agents collaborate |
| Complex prompts | Simple, focused agents |
| Hard to debug | Clear conversation flow |
| Limited capabilities | Combine agent strengths |

## Core Concept: Agent Conversation

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Coder as Coder Agent
    participant Reviewer as Reviewer Agent

    User->>Coder: Write a function to sort numbers
    Coder->>Reviewer: Here's my code...
    Reviewer->>Coder: Bug on line 5, fix it
    Coder->>Reviewer: Fixed! Here's updated code
    Reviewer->>User: Code is approved ✓
\`\`\`

## Agent Types in AutoGen

### 1. AssistantAgent
The worker that does tasks (powered by LLM).

\`\`\`python|javascript
from autogen import AssistantAgent

coder = AssistantAgent(
    name="Coder",
    system_message="You are a Python programmer. Write clean code.",
    llm_config={"model": "gpt-4"}
)
|||
// AutoGen is Python-first, showing concept
const coder = new AssistantAgent({
    name: "Coder",
    systemMessage: "You are a Python programmer. Write clean code.",
    llmConfig: { model: "gpt-4" }
});
\`\`\`

### 2. UserProxyAgent
Represents the human (can auto-execute code).

\`\`\`python|javascript
from autogen import UserProxyAgent

user = UserProxyAgent(
    name="User",
    human_input_mode="NEVER",  # Auto mode
    code_execution_config={"work_dir": "coding"}
)
|||
const user = new UserProxyAgent({
    name: "User",
    humanInputMode: "NEVER",  // Auto mode
    codeExecutionConfig: { workDir: "coding" }
});
\`\`\`

### 3. GroupChat
Multiple agents discussing together.

\`\`\`python|javascript
from autogen import GroupChat, GroupChatManager

group = GroupChat(
    agents=[coder, reviewer, tester],
    messages=[],
    max_round=10
)
|||
const group = new GroupChat({
    agents: [coder, reviewer, tester],
    messages: [],
    maxRound: 10
});
\`\`\`

## Simple Example: Two Agents Chatting

\`\`\`mermaid
flowchart LR
    A[User Proxy] <--> B[Assistant]
    A --> C[Task: Write code]
    B --> D[Code solution]
\`\`\`

\`\`\`python|javascript
from autogen import AssistantAgent, UserProxyAgent

# Create assistant
assistant = AssistantAgent(
    name="Assistant",
    system_message="You are a helpful AI assistant.",
    llm_config={"model": "gpt-4"}
)

# Create user proxy (simulates user)
user = UserProxyAgent(
    name="User",
    human_input_mode="TERMINATE",  # Stop when task done
    max_consecutive_auto_reply=5
)

# Start conversation
user.initiate_chat(
    assistant,
    message="What is 25 * 48?"
)

# Output:
# User: What is 25 * 48?
# Assistant: 25 * 48 = 1200
# User: TERMINATE
|||
// Conceptual JavaScript
const assistant = new AssistantAgent({
    name: "Assistant",
    systemMessage: "You are a helpful AI assistant.",
    llmConfig: { model: "gpt-4" }
});

const user = new UserProxyAgent({
    name: "User",
    humanInputMode: "TERMINATE",
    maxConsecutiveAutoReply: 5
});

await user.initiateChat(
    assistant,
    { message: "What is 25 * 48?" }
);
\`\`\`

## Powerful Example: Coder + Reviewer

\`\`\`mermaid
flowchart TD
    A[User Request] --> B[Coder writes code]
    B --> C[Reviewer checks]
    C --> D{Approved?}
    D -->|No| E[Feedback to Coder]
    E --> B
    D -->|Yes| F[Done!]
\`\`\`

\`\`\`python|javascript
from autogen import AssistantAgent, UserProxyAgent

# Coder agent
coder = AssistantAgent(
    name="Coder",
    system_message="""You are a Python developer.
    Write clean, efficient code.
    Always include comments.""",
    llm_config={"model": "gpt-4"}
)

# Reviewer agent
reviewer = AssistantAgent(
    name="Reviewer",
    system_message="""You are a code reviewer.
    Check for:
    - Bugs
    - Performance issues
    - Code style
    Say APPROVED if code is good.""",
    llm_config={"model": "gpt-4"}
)

# User proxy to orchestrate
user = UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "workspace"}
)

# Coder writes, reviewer reviews
user.initiate_chat(
    coder,
    message="Write a function to find prime numbers up to N"
)

# Then reviewer checks
reviewer.initiate_chat(
    coder,
    message="Please review the code above"
)
|||
// Conceptual JavaScript
const coder = new AssistantAgent({
    name: "Coder",
    systemMessage: \`You are a Python developer.
    Write clean, efficient code.
    Always include comments.\`,
    llmConfig: { model: "gpt-4" }
});

const reviewer = new AssistantAgent({
    name: "Reviewer",
    systemMessage: \`You are a code reviewer.
    Check for bugs, performance, style.
    Say APPROVED if code is good.\`,
    llmConfig: { model: "gpt-4" }
});

const user = new UserProxyAgent({
    name: "User",
    humanInputMode: "NEVER",
    codeExecutionConfig: { workDir: "workspace" }
});

await user.initiateChat(
    coder,
    { message: "Write a function to find prime numbers up to N" }
);

await reviewer.initiateChat(
    coder,
    { message: "Please review the code above" }
);
\`\`\`

## Group Chat: Multiple Agents

\`\`\`mermaid
flowchart TD
    A[User] --> B[Group Chat]
    B --> C[Planner]
    B --> D[Coder]
    B --> E[Tester]
    B --> F[Manager decides who speaks]
\`\`\`

\`\`\`python|javascript
from autogen import GroupChat, GroupChatManager

# Create specialized agents
planner = AssistantAgent(
    name="Planner",
    system_message="Break down tasks into steps"
)

coder = AssistantAgent(
    name="Coder",
    system_message="Write code based on plan"
)

tester = AssistantAgent(
    name="Tester",
    system_message="Write tests for the code"
)

user = UserProxyAgent(name="User")

# Create group chat
group_chat = GroupChat(
    agents=[user, planner, coder, tester],
    messages=[],
    max_round=15
)

# Manager controls the conversation
manager = GroupChatManager(
    groupchat=group_chat,
    llm_config={"model": "gpt-4"}
)

# Start the group discussion
user.initiate_chat(
    manager,
    message="Create a todo list app with tests"
)

# Conversation flow:
# 1. Planner: "Here's the plan..."
# 2. Coder: "Implementing step 1..."
# 3. Tester: "Writing tests for..."
# 4. Coder: "Fixed the bug..."
# 5. Done!
|||
// Conceptual JavaScript
const planner = new AssistantAgent({
    name: "Planner",
    systemMessage: "Break down tasks into steps"
});

const coder = new AssistantAgent({
    name: "Coder",
    systemMessage: "Write code based on plan"
});

const tester = new AssistantAgent({
    name: "Tester",
    systemMessage: "Write tests for the code"
});

const user = new UserProxyAgent({ name: "User" });

const groupChat = new GroupChat({
    agents: [user, planner, coder, tester],
    messages: [],
    maxRound: 15
});

const manager = new GroupChatManager({
    groupchat: groupChat,
    llmConfig: { model: "gpt-4" }
});

await user.initiateChat(
    manager,
    { message: "Create a todo list app with tests" }
);
\`\`\`

## Code Execution

AutoGen can **run code automatically**!

\`\`\`python|javascript
user = UserProxyAgent(
    name="User",
    code_execution_config={
        "work_dir": "workspace",
        "use_docker": False  # Set True for safety
    }
)

# When assistant writes code, user proxy executes it
user.initiate_chat(
    assistant,
    message="Write and run code to calculate fibonacci(10)"
)

# Output:
# Assistant: Here's the code...
# User: [Executes code] Result: 55
|||
const user = new UserProxyAgent({
    name: "User",
    codeExecutionConfig: {
        workDir: "workspace",
        useDocker: false  // Set true for safety
    }
});

await user.initiateChat(
    assistant,
    { message: "Write and run code to calculate fibonacci(10)" }
);
\`\`\`

## Human Input Modes

| Mode | Behavior |
|------|----------|
| \`ALWAYS\` | Ask human every turn |
| \`TERMINATE\` | Ask only at end |
| \`NEVER\` | Fully autonomous |

\`\`\`python|javascript
# Always ask human
user = UserProxyAgent(human_input_mode="ALWAYS")

# Only at termination
user = UserProxyAgent(human_input_mode="TERMINATE")

# Never ask (auto mode)
user = UserProxyAgent(human_input_mode="NEVER")
|||
// Always ask human
const user1 = new UserProxyAgent({ humanInputMode: "ALWAYS" });

// Only at termination
const user2 = new UserProxyAgent({ humanInputMode: "TERMINATE" });

// Never ask (auto mode)
const user3 = new UserProxyAgent({ humanInputMode: "NEVER" });
\`\`\`

## AutoGen Patterns

### Pattern 1: Sequential Chat

\`\`\`mermaid
flowchart LR
    A[Agent 1] --> B[Agent 2] --> C[Agent 3]
\`\`\`

### Pattern 2: Hierarchical

\`\`\`mermaid
flowchart TD
    A[Manager] --> B[Worker 1]
    A --> C[Worker 2]
    A --> D[Worker 3]
\`\`\`

### Pattern 3: Collaborative

\`\`\`mermaid
flowchart LR
    A[Agent 1] <--> B[Agent 2]
    B <--> C[Agent 3]
    C <--> A
\`\`\`

## When to Use AutoGen

| Use AutoGen | Don't Use |
|------------|-----------|
| Multi-agent collaboration | Single agent tasks |
| Code generation + execution | Simple Q&A |
| Complex problem solving | Quick responses |
| Need agent discussions | Linear workflows |

## AutoGen vs LangGraph

| Feature | AutoGen | LangGraph |
|---------|---------|-----------|
| Focus | Agent conversations | State machines |
| Style | Chat-based | Graph-based |
| Code execution | Built-in | Manual |
| Multi-agent | Native | Requires setup |
| Learning curve | Easy | Medium |

## Quick Start Template

\`\`\`python|javascript
from autogen import AssistantAgent, UserProxyAgent

# 1. Create assistant
assistant = AssistantAgent(
    name="Assistant",
    llm_config={"model": "gpt-4"}
)

# 2. Create user proxy
user = UserProxyAgent(
    name="User",
    human_input_mode="NEVER"
)

# 3. Start conversation
user.initiate_chat(
    assistant,
    message="Your task here"
)
|||
const assistant = new AssistantAgent({
    name: "Assistant",
    llmConfig: { model: "gpt-4" }
});

const user = new UserProxyAgent({
    name: "User",
    humanInputMode: "NEVER"
});

await user.initiateChat(
    assistant,
    { message: "Your task here" }
);
\`\`\`

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **AssistantAgent** | LLM-powered worker |
| **UserProxyAgent** | Human simulator, can run code |
| **GroupChat** | Multiple agents discussing |
| **initiate_chat** | Start the conversation |

\`\`\`mermaid
flowchart LR
    A[Define Agents] --> B[Set Roles]
    B --> C[Start Chat]
    C --> D[Agents Collaborate]
    D --> E[Solution!]
\`\`\`

**AutoGen makes multi-agent systems as simple as a group chat!**
`,
  previousTopic: { module: 2, slug: 'langgraph', title: 'LangGraph' },
  nextTopic: { module: 2, slug: 'crewai', title: 'CrewAI (Role-Based)' },
};

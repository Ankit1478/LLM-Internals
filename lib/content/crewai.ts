import { Article } from './types';

export const crewai: Article = {
  module: 2,
  slug: 'crewai',
  title: 'CrewAI (Role-Based)',
  description: 'Build AI teams with roles like Researcher, Writer, and Manager',
  readTime: 7,
  content: `# CrewAI (Role-Based)

## What is CrewAI?

**CrewAI** = Build AI teams where each agent has a **specific role**.

Think of it like a company: you have a Researcher, Writer, Editor - each does their job.

\`\`\`mermaid
flowchart LR
    A[Task] --> B[Researcher]
    B --> C[Writer]
    C --> D[Editor]
    D --> E[Final Output]
\`\`\`

**Key idea:** Give agents **roles**, **goals**, and **backstories** - they behave like team members!

## Why CrewAI?

| Problem | CrewAI Solution |
|---------|-----------------|
| Generic agents | Role-specific behavior |
| No collaboration | Agents work as a team |
| Hard to organize | Clear task delegation |
| Unpredictable output | Structured workflows |

## Core Concepts

### 1. Agent = Team Member

Each agent has:
- **Role**: What they do (Researcher, Writer, etc.)
- **Goal**: What they want to achieve
- **Backstory**: Their personality/expertise

\`\`\`python|javascript
from crewai import Agent

researcher = Agent(
    role="Senior Researcher",
    goal="Find accurate, up-to-date information",
    backstory="""You are an expert researcher with 10 years
    of experience. You always verify facts from multiple sources.""",
    verbose=True
)
|||
// CrewAI is Python, showing concept
const researcher = new Agent({
    role: "Senior Researcher",
    goal: "Find accurate, up-to-date information",
    backstory: \`You are an expert researcher with 10 years
    of experience. You always verify facts from multiple sources.\`,
    verbose: true
});
\`\`\`

### 2. Task = Work Assignment

What each agent needs to do.

\`\`\`python|javascript
from crewai import Task

research_task = Task(
    description="Research the latest AI trends in 2024",
    agent=researcher,
    expected_output="A detailed report with 5 key trends"
)
|||
const researchTask = new Task({
    description: "Research the latest AI trends in 2024",
    agent: researcher,
    expectedOutput: "A detailed report with 5 key trends"
});
\`\`\`

### 3. Crew = The Team

All agents working together.

\`\`\`python|javascript
from crewai import Crew

crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, write_task, edit_task],
    verbose=True
)

result = crew.kickoff()
|||
const crew = new Crew({
    agents: [researcher, writer, editor],
    tasks: [researchTask, writeTask, editTask],
    verbose: true
});

const result = await crew.kickoff();
\`\`\`

## Complete Example: Blog Writing Team

\`\`\`mermaid
flowchart TD
    A[Topic: AI Trends] --> B[Researcher]
    B -->|Research| C[Writer]
    C -->|Draft| D[Editor]
    D -->|Final| E[Published Blog]
\`\`\`

\`\`\`python|javascript
from crewai import Agent, Task, Crew

# 1. Create Agents (Team Members)

researcher = Agent(
    role="Research Analyst",
    goal="Find comprehensive information on the topic",
    backstory="""You are a thorough researcher who digs deep.
    You always cite sources and verify facts.""",
    verbose=True
)

writer = Agent(
    role="Content Writer",
    goal="Write engaging, clear blog posts",
    backstory="""You are a skilled writer with a knack for
    making complex topics simple and interesting.""",
    verbose=True
)

editor = Agent(
    role="Editor",
    goal="Ensure content is polished and error-free",
    backstory="""You are a meticulous editor with an eye
    for detail. You improve clarity and fix all errors.""",
    verbose=True
)

# 2. Create Tasks (Assignments)

research_task = Task(
    description="""Research the topic: 'AI in Healthcare 2024'.
    Find key trends, statistics, and real-world examples.
    Include at least 3 credible sources.""",
    agent=researcher,
    expected_output="Research report with facts and sources"
)

writing_task = Task(
    description="""Write a 500-word blog post based on the research.
    Make it engaging and easy to understand.
    Include an introduction, 3 main points, and conclusion.""",
    agent=writer,
    expected_output="A complete blog post draft"
)

editing_task = Task(
    description="""Edit the blog post for:
    - Grammar and spelling
    - Clarity and flow
    - Engaging headline
    Make final improvements.""",
    agent=editor,
    expected_output="Final polished blog post ready to publish"
)

# 3. Create Crew (Team)

blog_crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    verbose=True
)

# 4. Run the Crew

result = blog_crew.kickoff()
print(result)
|||
// Conceptual JavaScript version
const researcher = new Agent({
    role: "Research Analyst",
    goal: "Find comprehensive information on the topic",
    backstory: "You are a thorough researcher who digs deep.",
    verbose: true
});

const writer = new Agent({
    role: "Content Writer",
    goal: "Write engaging, clear blog posts",
    backstory: "You make complex topics simple and interesting.",
    verbose: true
});

const editor = new Agent({
    role: "Editor",
    goal: "Ensure content is polished and error-free",
    backstory: "You are meticulous with an eye for detail.",
    verbose: true
});

const researchTask = new Task({
    description: "Research 'AI in Healthcare 2024'...",
    agent: researcher,
    expectedOutput: "Research report with facts and sources"
});

const writingTask = new Task({
    description: "Write a 500-word blog post...",
    agent: writer,
    expectedOutput: "A complete blog post draft"
});

const editingTask = new Task({
    description: "Edit the blog post for grammar, clarity...",
    agent: editor,
    expectedOutput: "Final polished blog post"
});

const blogCrew = new Crew({
    agents: [researcher, writer, editor],
    tasks: [researchTask, writingTask, editingTask],
    verbose: true
});

const result = await blogCrew.kickoff();
\`\`\`

## Adding Tools to Agents

Agents can use tools like search, calculators, etc.

\`\`\`python|javascript
from crewai import Agent
from crewai_tools import SerperDevTool, WebsiteSearchTool

# Give researcher search tools
researcher = Agent(
    role="Researcher",
    goal="Find accurate information",
    backstory="Expert researcher",
    tools=[
        SerperDevTool(),      # Web search
        WebsiteSearchTool()   # Search specific sites
    ]
)
|||
const researcher = new Agent({
    role: "Researcher",
    goal: "Find accurate information",
    backstory: "Expert researcher",
    tools: [
        new SerperDevTool(),      // Web search
        new WebsiteSearchTool()   // Search specific sites
    ]
});
\`\`\`

## Process Types

How tasks flow through the crew.

### Sequential (Default)
\`\`\`mermaid
flowchart LR
    A[Task 1] --> B[Task 2] --> C[Task 3]
\`\`\`

\`\`\`python|javascript
crew = Crew(
    agents=[a1, a2, a3],
    tasks=[t1, t2, t3],
    process=Process.sequential  # One after another
)
|||
const crew = new Crew({
    agents: [a1, a2, a3],
    tasks: [t1, t2, t3],
    process: Process.sequential
});
\`\`\`

### Hierarchical
\`\`\`mermaid
flowchart TD
    A[Manager] --> B[Worker 1]
    A --> C[Worker 2]
    A --> D[Worker 3]
\`\`\`

\`\`\`python|javascript
crew = Crew(
    agents=[manager, worker1, worker2],
    tasks=[task1, task2, task3],
    process=Process.hierarchical,
    manager_llm="gpt-4"  # Manager coordinates
)
|||
const crew = new Crew({
    agents: [manager, worker1, worker2],
    tasks: [task1, task2, task3],
    process: Process.hierarchical,
    managerLlm: "gpt-4"
});
\`\`\`

## Real-World Crew Examples

### 1. Customer Support Crew

\`\`\`mermaid
flowchart LR
    A[Customer Query] --> B[Classifier]
    B --> C{Type?}
    C -->|Technical| D[Tech Support]
    C -->|Billing| E[Billing Agent]
    C -->|General| F[General Support]
\`\`\`

### 2. Content Marketing Crew

\`\`\`mermaid
flowchart TD
    A[Strategy] --> B[SEO Researcher]
    B --> C[Content Writer]
    C --> D[Designer]
    D --> E[Publisher]
\`\`\`

### 3. Code Review Crew

\`\`\`mermaid
flowchart LR
    A[Code] --> B[Security Reviewer]
    A --> C[Performance Reviewer]
    A --> D[Style Reviewer]
    B --> E[Final Report]
    C --> E
    D --> E
\`\`\`

## Task Dependencies

Tasks can depend on previous task outputs.

\`\`\`python|javascript
research_task = Task(
    description="Research AI trends",
    agent=researcher
)

writing_task = Task(
    description="Write article based on {research_task.output}",
    agent=writer,
    context=[research_task]  # Depends on research
)
|||
const researchTask = new Task({
    description: "Research AI trends",
    agent: researcher
});

const writingTask = new Task({
    description: "Write article based on research",
    agent: writer,
    context: [researchTask]  // Depends on research
});
\`\`\`

## Memory in CrewAI

Crews can remember past interactions.

\`\`\`python|javascript
crew = Crew(
    agents=[...],
    tasks=[...],
    memory=True,           # Enable memory
    embedder={
        "provider": "openai",
        "config": {"model": "text-embedding-3-small"}
    }
)
|||
const crew = new Crew({
    agents: [...],
    tasks: [...],
    memory: true,
    embedder: {
        provider: "openai",
        config: { model: "text-embedding-3-small" }
    }
});
\`\`\`

## When to Use CrewAI

\`\`\`mermaid
flowchart TD
    A[Your Task] --> B{Multiple roles needed?}
    B -->|Yes| C{Clear workflow?}
    B -->|No| D[Single agent is fine]
    C -->|Yes| E[Use CrewAI ✓]
    C -->|No| F[Consider LangGraph]
\`\`\`

| Use CrewAI | Don't Use |
|-----------|-----------|
| Team-based workflows | Single tasks |
| Role specialization | Generic agents |
| Sequential processes | Complex state machines |
| Content creation | Real-time chat |

## CrewAI vs Others

| Feature | CrewAI | AutoGen | LangGraph |
|---------|--------|---------|-----------|
| Focus | Roles & teams | Conversations | State graphs |
| Setup | Easy | Easy | Medium |
| Best for | Workflows | Multi-agent chat | Complex logic |
| Learning | Low | Low | Medium |

## Quick Start Template

\`\`\`python|javascript
from crewai import Agent, Task, Crew

# 1. Define agents with roles
agent1 = Agent(
    role="Your Role",
    goal="Your Goal",
    backstory="Your Backstory"
)

# 2. Define tasks
task1 = Task(
    description="What to do",
    agent=agent1,
    expected_output="What to produce"
)

# 3. Create and run crew
crew = Crew(
    agents=[agent1],
    tasks=[task1]
)

result = crew.kickoff()
|||
const agent1 = new Agent({
    role: "Your Role",
    goal: "Your Goal",
    backstory: "Your Backstory"
});

const task1 = new Task({
    description: "What to do",
    agent: agent1,
    expectedOutput: "What to produce"
});

const crew = new Crew({
    agents: [agent1],
    tasks: [task1]
});

const result = await crew.kickoff();
\`\`\`

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **Agent** | Team member with role |
| **Task** | Work assignment |
| **Crew** | The team |
| **kickoff()** | Start the work |
| **Role** | What agent does |
| **Goal** | What agent wants |
| **Backstory** | Agent's personality |

\`\`\`mermaid
flowchart LR
    A[Define Roles] --> B[Create Agents]
    B --> C[Assign Tasks]
    C --> D[Form Crew]
    D --> E[Kickoff!]
\`\`\`

**CrewAI turns AI agents into a productive team with clear roles and responsibilities!**
`,
  previousTopic: { module: 2, slug: 'autogen', title: 'AutoGen (Microsoft)' },
  nextTopic: { module: 2, slug: 'vercel-ai-sdk', title: 'Vercel AI SDK' },
};

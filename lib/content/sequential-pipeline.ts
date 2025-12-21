import { Article } from './types';

export const sequentialPipeline: Article = {
  module: 3,
  slug: 'sequential-pipeline',
  title: 'Sequential Pipeline',
  description: 'Agents work one after another in a chain',
  readTime: 4,
  content: `# Sequential Pipeline

## What is it?

Sequential Pipeline is when agents work one after another, like an assembly line. Output of one agent becomes input for the next.

Think of it like: A factory assembly line where each worker adds something before passing it forward.

## Visual Flow

\`\`\`
Input → Agent 1 → Agent 2 → Agent 3 → Final Output
         ↓           ↓          ↓
       Result 1 → Result 2 → Result 3
\`\`\`

## Code Example

\`\`\`python|javascript
class SequentialPipeline:
    def __init__(self, agents):
        self.agents = agents  # Ordered list

    def run(self, initial_input):
        result = initial_input
        history = []

        for agent in self.agents:
            result = agent.execute(result)
            history.append({
                "agent": agent.name,
                "output": result
            })

        return {
            "final": result,
            "history": history
        }

# Define agents
class ResearchAgent:
    name = "Researcher"
    def execute(self, topic):
        # Research the topic
        return f"Research findings about: {topic}"

class WriterAgent:
    name = "Writer"
    def execute(self, research):
        # Write based on research
        return f"Article based on: {research}"

class ReviewerAgent:
    name = "Reviewer"
    def execute(self, draft):
        # Review and improve
        return f"Reviewed and improved: {draft}"

# Usage
pipeline = SequentialPipeline([
    ResearchAgent(),
    WriterAgent(),
    ReviewerAgent()
])

result = pipeline.run("React hooks best practices")
# Each agent builds on previous agent's work
|||
class SequentialPipeline {
    constructor(agents) {
        this.agents = agents; // Ordered list
    }

    async run(initialInput) {
        let result = initialInput;
        const history = [];

        for (const agent of this.agents) {
            result = await agent.execute(result);
            history.push({
                agent: agent.name,
                output: result
            });
        }

        return {
            final: result,
            history
        };
    }
}

// Define agents
class ResearchAgent {
    name = "Researcher";
    async execute(topic) {
        // Research the topic
        return \`Research findings about: \${topic}\`;
    }
}

class WriterAgent {
    name = "Writer";
    async execute(research) {
        // Write based on research
        return \`Article based on: \${research}\`;
    }
}

class ReviewerAgent {
    name = "Reviewer";
    async execute(draft) {
        // Review and improve
        return \`Reviewed and improved: \${draft}\`;
    }
}

// Usage
const pipeline = new SequentialPipeline([
    new ResearchAgent(),
    new WriterAgent(),
    new ReviewerAgent()
]);

const result = await pipeline.run("React hooks best practices");
// Each agent builds on previous agent's work
\`\`\`

## With Error Handling

\`\`\`python|javascript
class RobustPipeline:
    def __init__(self, agents):
        self.agents = agents

    def run(self, input_data):
        result = input_data

        for i, agent in enumerate(self.agents):
            try:
                result = agent.execute(result)
            except Exception as e:
                # Option 1: Stop pipeline
                return {"error": str(e), "failed_at": agent.name}

                # Option 2: Skip and continue
                # continue

                # Option 3: Retry
                # result = self.retry(agent, result, max_attempts=3)

        return {"success": True, "result": result}

    def retry(self, agent, input_data, max_attempts):
        for attempt in range(max_attempts):
            try:
                return agent.execute(input_data)
            except:
                if attempt == max_attempts - 1:
                    raise
|||
class RobustPipeline {
    constructor(agents) {
        this.agents = agents;
    }

    async run(inputData) {
        let result = inputData;

        for (const agent of this.agents) {
            try {
                result = await agent.execute(result);
            } catch (e) {
                // Option 1: Stop pipeline
                return { error: e.message, failedAt: agent.name };

                // Option 2: Skip and continue
                // continue;

                // Option 3: Retry
                // result = await this.retry(agent, result, 3);
            }
        }

        return { success: true, result };
    }

    async retry(agent, inputData, maxAttempts) {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                return await agent.execute(inputData);
            } catch (e) {
                if (attempt === maxAttempts - 1) throw e;
            }
        }
    }
}
\`\`\`

## Common Use Cases

**Content Creation Pipeline:**
Research → Outline → Draft → Edit → Publish

**Code Review Pipeline:**
Analyze → Find Issues → Suggest Fixes → Apply Fixes

**Data Processing Pipeline:**
Extract → Clean → Transform → Load

**Customer Support Pipeline:**
Classify → Research → Draft Response → Review

## Pros and Cons

**Pros:**

Simple to understand and debug

Easy to add/remove steps

Clear data flow

Each agent has focused responsibility

**Cons:**

Slow (waits for each step)

One failure can stop everything

Not good for independent tasks

Can't parallelize

## When to Use

Each step depends on previous step's output

Order matters

Tasks are naturally linear

You need clear audit trail of what happened

## Example Prompt

\`\`\`
You are step {step_number} of {total_steps} in a pipeline.

Your role: {agent_role}

Input from previous step:
{previous_output}

Your task:
{specific_task}

Output your result for the next agent.
\`\`\`

## Key Point

Sequential Pipeline = Assembly Line. One agent finishes, next agent starts. Simple but powerful for ordered workflows.
`,
  previousTopic: { module: 3, slug: 'multi-agent-patterns', title: 'Multi-Agent Patterns' },
  nextTopic: { module: 3, slug: 'parallel-execution', title: 'Parallel Execution' },
};

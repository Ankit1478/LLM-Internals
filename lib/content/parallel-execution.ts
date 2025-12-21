import { Article } from './types';

export const parallelExecution: Article = {
  module: 3,
  slug: 'parallel-execution',
  title: 'Parallel Execution',
  description: 'Multiple agents work simultaneously on different tasks',
  readTime: 4,
  content: `# Parallel Execution

## What is it?

Parallel Execution runs multiple agents at the same time. Instead of waiting for one to finish, all agents work together on different parts.

Think of it like: Multiple chefs cooking different dishes at the same time for one meal.

## Visual Flow

\`\`\`
              ┌→ Agent 1 → Result 1 ─┐
              │                       │
Input ────────┼→ Agent 2 → Result 2 ─┼→ Combine → Final Output
              │                       │
              └→ Agent 3 → Result 3 ─┘
\`\`\`

## Code Example

\`\`\`python|javascript
import asyncio

class ParallelExecutor:
    def __init__(self, agents):
        self.agents = agents

    async def run(self, task):
        # Create tasks for all agents
        tasks = [agent.execute(task) for agent in self.agents]

        # Run all at same time
        results = await asyncio.gather(*tasks)

        # Combine results
        return self.combine(results)

    def combine(self, results):
        return {
            "results": results,
            "count": len(results)
        }

# Define specialized agents
class WebSearchAgent:
    async def execute(self, query):
        # Search the web
        return {"source": "web", "data": f"Web results for: {query}"}

class DocSearchAgent:
    async def execute(self, query):
        # Search documentation
        return {"source": "docs", "data": f"Doc results for: {query}"}

class CodeSearchAgent:
    async def execute(self, query):
        # Search codebase
        return {"source": "code", "data": f"Code results for: {query}"}

# Usage
executor = ParallelExecutor([
    WebSearchAgent(),
    DocSearchAgent(),
    CodeSearchAgent()
])

results = await executor.run("How to implement authentication")
# All 3 searches happen at same time!
|||
class ParallelExecutor {
    constructor(agents) {
        this.agents = agents;
    }

    async run(task) {
        // Create promises for all agents
        const promises = this.agents.map(agent => agent.execute(task));

        // Run all at same time
        const results = await Promise.all(promises);

        // Combine results
        return this.combine(results);
    }

    combine(results) {
        return {
            results,
            count: results.length
        };
    }
}

// Define specialized agents
class WebSearchAgent {
    async execute(query) {
        // Search the web
        return { source: "web", data: \`Web results for: \${query}\` };
    }
}

class DocSearchAgent {
    async execute(query) {
        // Search documentation
        return { source: "docs", data: \`Doc results for: \${query}\` };
    }
}

class CodeSearchAgent {
    async execute(query) {
        // Search codebase
        return { source: "code", data: \`Code results for: \${query}\` };
    }
}

// Usage
const executor = new ParallelExecutor([
    new WebSearchAgent(),
    new DocSearchAgent(),
    new CodeSearchAgent()
]);

const results = await executor.run("How to implement authentication");
// All 3 searches happen at same time!
\`\`\`

## With Error Handling

\`\`\`python|javascript
import asyncio

class RobustParallelExecutor:
    def __init__(self, agents):
        self.agents = agents

    async def run(self, task):
        tasks = [self.safe_execute(agent, task) for agent in self.agents]
        results = await asyncio.gather(*tasks)

        # Filter out failures
        successes = [r for r in results if r["success"]]
        failures = [r for r in results if not r["success"]]

        return {
            "successes": successes,
            "failures": failures,
            "success_rate": len(successes) / len(results)
        }

    async def safe_execute(self, agent, task):
        try:
            result = await agent.execute(task)
            return {"success": True, "agent": agent.name, "result": result}
        except Exception as e:
            return {"success": False, "agent": agent.name, "error": str(e)}

# With timeout
async def run_with_timeout(self, task, timeout_seconds=30):
    try:
        return await asyncio.wait_for(
            self.run(task),
            timeout=timeout_seconds
        )
    except asyncio.TimeoutError:
        return {"error": "Timeout exceeded"}
|||
class RobustParallelExecutor {
    constructor(agents) {
        this.agents = agents;
    }

    async run(task) {
        const promises = this.agents.map(agent => this.safeExecute(agent, task));
        const results = await Promise.all(promises);

        // Filter out failures
        const successes = results.filter(r => r.success);
        const failures = results.filter(r => !r.success);

        return {
            successes,
            failures,
            successRate: successes.length / results.length
        };
    }

    async safeExecute(agent, task) {
        try {
            const result = await agent.execute(task);
            return { success: true, agent: agent.name, result };
        } catch (e) {
            return { success: false, agent: agent.name, error: e.message };
        }
    }
}

// With timeout
async function runWithTimeout(executor, task, timeoutMs = 30000) {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeoutMs)
    );

    try {
        return await Promise.race([executor.run(task), timeoutPromise]);
    } catch (e) {
        return { error: "Timeout exceeded" };
    }
}
\`\`\`

## Fan-Out Fan-In Pattern

\`\`\`python|javascript
class FanOutFanIn:
    def __init__(self, splitter, workers, aggregator):
        self.splitter = splitter    # Splits task into parts
        self.workers = workers      # Process parts in parallel
        self.aggregator = aggregator # Combines results

    async def run(self, task):
        # Fan-out: split into subtasks
        subtasks = self.splitter.split(task)

        # Parallel: process all subtasks
        tasks = [self.process(subtask) for subtask in subtasks]
        results = await asyncio.gather(*tasks)

        # Fan-in: combine results
        final = self.aggregator.combine(results)
        return final

    async def process(self, subtask):
        # Pick best worker for subtask
        worker = self.select_worker(subtask)
        return await worker.execute(subtask)

# Usage: Analyze multiple documents in parallel
analyzer = FanOutFanIn(
    splitter=DocumentSplitter(),
    workers=[AnalysisAgent() for _ in range(4)],
    aggregator=ResultAggregator()
)
results = await analyzer.run(["doc1.pdf", "doc2.pdf", "doc3.pdf"])
|||
class FanOutFanIn {
    constructor(splitter, workers, aggregator) {
        this.splitter = splitter;    // Splits task into parts
        this.workers = workers;      // Process parts in parallel
        this.aggregator = aggregator; // Combines results
    }

    async run(task) {
        // Fan-out: split into subtasks
        const subtasks = this.splitter.split(task);

        // Parallel: process all subtasks
        const promises = subtasks.map(subtask => this.process(subtask));
        const results = await Promise.all(promises);

        // Fan-in: combine results
        const final = this.aggregator.combine(results);
        return final;
    }

    async process(subtask) {
        // Pick best worker for subtask
        const worker = this.selectWorker(subtask);
        return await worker.execute(subtask);
    }
}

// Usage: Analyze multiple documents in parallel
const analyzer = new FanOutFanIn(
    new DocumentSplitter(),
    Array.from({ length: 4 }, () => new AnalysisAgent()),
    new ResultAggregator()
);
const results = await analyzer.run(["doc1.pdf", "doc2.pdf", "doc3.pdf"]);
\`\`\`

## Common Use Cases

**Multi-Source Search:**
Search web + docs + code + database all at once

**Document Analysis:**
Analyze multiple documents simultaneously

**Data Validation:**
Run multiple validators on same input

**Multi-Model Consensus:**
Get answers from multiple LLMs, pick best one

## Pros and Cons

**Pros:**

Much faster than sequential

Great for independent tasks

One failure doesn't block others

Scales well with resources

**Cons:**

Need to handle combining results

More complex error handling

Resource intensive

Tasks must be independent

## When to Use

Tasks don't depend on each other

Speed is important

You have independent data sources

Results can be combined meaningfully

## Example Prompt

\`\`\`
You are one of {total_agents} parallel agents.

Your specialty: {agent_specialty}

Task: {task}

Provide your specialized perspective.
Your result will be combined with other agents.

Focus only on your area of expertise.
\`\`\`

## Key Point

Parallel Execution = Multiple workers, same time. Fast for independent tasks. Remember to handle failures and combine results properly.
`,
  previousTopic: { module: 3, slug: 'sequential-pipeline', title: 'Sequential Pipeline' },
  nextTopic: { module: 3, slug: 'hierarchical-pattern', title: 'Hierarchical' },
};

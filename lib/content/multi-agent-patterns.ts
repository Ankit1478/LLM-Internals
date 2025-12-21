import { Article } from './types';

export const multiAgentPatterns: Article = {
  module: 3,
  slug: 'multi-agent-patterns',
  title: 'Multi-Agent Patterns',
  description: 'Common patterns for organizing multiple agents',
  readTime: 4,
  content: `# Multi-Agent Patterns

## Overview

There are 4 main patterns for organizing multiple agents:

1. Sequential Pipeline - Agents work one after another
2. Parallel Execution - Agents work at the same time
3. Hierarchical - Boss agents manage worker agents
4. Collaborative - Agents discuss and reach consensus

## 1. Sequential Pipeline

Agents work in order. Output of one becomes input of next.

Example: Research → Write → Review → Publish

\`\`\`python|javascript
class SequentialPipeline:
    def __init__(self, agents):
        self.agents = agents  # Ordered list

    def run(self, initial_input):
        result = initial_input
        for agent in self.agents:
            result = agent.execute(result)
        return result

# Usage
pipeline = SequentialPipeline([
    ResearchAgent(),
    WriterAgent(),
    ReviewerAgent()
])
final = pipeline.run("Write about React hooks")
|||
class SequentialPipeline {
    constructor(agents) {
        this.agents = agents; // Ordered list
    }

    async run(initialInput) {
        let result = initialInput;
        for (const agent of this.agents) {
            result = await agent.execute(result);
        }
        return result;
    }
}

// Usage
const pipeline = new SequentialPipeline([
    new ResearchAgent(),
    new WriterAgent(),
    new ReviewerAgent()
]);
const final = await pipeline.run("Write about React hooks");
\`\`\`

When to use: When each step depends on previous step.

## 2. Parallel Execution

Multiple agents work at the same time on different parts.

Example: Search Google + Search Docs + Search Code (all at once)

\`\`\`python|javascript
import asyncio

class ParallelExecutor:
    def __init__(self, agents):
        self.agents = agents

    async def run(self, task):
        # Run all agents at same time
        tasks = [agent.execute(task) for agent in self.agents]
        results = await asyncio.gather(*tasks)
        return self.combine(results)

    def combine(self, results):
        return {"all_results": results}

# Usage
executor = ParallelExecutor([
    WebSearchAgent(),
    DocSearchAgent(),
    CodeSearchAgent()
])
results = await executor.run("How to use React context")
|||
class ParallelExecutor {
    constructor(agents) {
        this.agents = agents;
    }

    async run(task) {
        // Run all agents at same time
        const promises = this.agents.map(agent => agent.execute(task));
        const results = await Promise.all(promises);
        return this.combine(results);
    }

    combine(results) {
        return { allResults: results };
    }
}

// Usage
const executor = new ParallelExecutor([
    new WebSearchAgent(),
    new DocSearchAgent(),
    new CodeSearchAgent()
]);
const results = await executor.run("How to use React context");
\`\`\`

When to use: When tasks are independent and can run together.

## 3. Hierarchical

Supervisor agent manages worker agents. Like a company org chart.

Example: Manager assigns tasks to developers

\`\`\`python|javascript
class HierarchicalSystem:
    def __init__(self, supervisor, workers):
        self.supervisor = supervisor
        self.workers = workers

    def run(self, task):
        # Supervisor breaks down task
        subtasks = self.supervisor.plan(task)

        # Assign to workers
        results = {}
        for subtask in subtasks:
            worker = self.supervisor.assign(subtask, self.workers)
            results[subtask["id"]] = worker.execute(subtask)

        # Supervisor combines results
        return self.supervisor.combine(results)

# Usage
system = HierarchicalSystem(
    supervisor=SupervisorAgent(),
    workers=[CodeWorker(), TestWorker(), DocWorker()]
)
result = system.run("Build a login feature")
|||
class HierarchicalSystem {
    constructor(supervisor, workers) {
        this.supervisor = supervisor;
        this.workers = workers;
    }

    async run(task) {
        // Supervisor breaks down task
        const subtasks = await this.supervisor.plan(task);

        // Assign to workers
        const results = {};
        for (const subtask of subtasks) {
            const worker = this.supervisor.assign(subtask, this.workers);
            results[subtask.id] = await worker.execute(subtask);
        }

        // Supervisor combines results
        return this.supervisor.combine(results);
    }
}

// Usage
const system = new HierarchicalSystem(
    new SupervisorAgent(),
    [new CodeWorker(), new TestWorker(), new DocWorker()]
);
const result = await system.run("Build a login feature");
\`\`\`

When to use: Complex tasks needing coordination and delegation.

## 4. Collaborative (Debate & Consensus)

Agents discuss, debate, and agree on answer together.

Example: Multiple agents propose solutions, vote on best one

\`\`\`python|javascript
class CollaborativeSystem:
    def __init__(self, agents):
        self.agents = agents

    def run(self, problem):
        # Each agent proposes solution
        proposals = []
        for agent in self.agents:
            proposals.append({
                "agent": agent.id,
                "solution": agent.propose(problem)
            })

        # Agents critique each other
        critiques = self.critique_round(proposals)

        # Reach consensus
        final = self.reach_consensus(proposals, critiques)
        return final

    def reach_consensus(self, proposals, critiques):
        # Simple: pick most supported proposal
        # Complex: synthesize best parts of each
        scores = self.score_proposals(proposals, critiques)
        best = max(scores, key=lambda x: x["score"])
        return best["solution"]
|||
class CollaborativeSystem {
    constructor(agents) {
        this.agents = agents;
    }

    async run(problem) {
        // Each agent proposes solution
        const proposals = [];
        for (const agent of this.agents) {
            proposals.push({
                agent: agent.id,
                solution: await agent.propose(problem)
            });
        }

        // Agents critique each other
        const critiques = await this.critiqueRound(proposals);

        // Reach consensus
        const final = this.reachConsensus(proposals, critiques);
        return final;
    }

    reachConsensus(proposals, critiques) {
        // Simple: pick most supported proposal
        // Complex: synthesize best parts of each
        const scores = this.scoreProposals(proposals, critiques);
        const best = scores.reduce((a, b) => a.score > b.score ? a : b);
        return best.solution;
    }
}
\`\`\`

When to use: When you want diverse perspectives and higher quality.

## Comparison

Sequential: Simple, ordered, slow (one at a time)

Parallel: Fast, independent tasks only, need to combine results

Hierarchical: Scalable, good for complex tasks, needs good supervisor

Collaborative: High quality, slow, good for important decisions

## Choosing a Pattern

Simple linear workflow → Sequential

Independent subtasks → Parallel

Complex project → Hierarchical

Need best answer → Collaborative

Often you combine patterns: Hierarchical supervisor uses Parallel workers.

## Key Point

Pick the pattern that matches your task structure. Simple tasks need simple patterns.
`,
  previousTopic: { module: 3, slug: 'state-synchronization', title: 'State Synchronization' },
  nextTopic: { module: 3, slug: 'sequential-pipeline', title: 'Sequential Pipeline' },
};

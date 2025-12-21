import { Article } from './types';

export const collaborativePattern: Article = {
  module: 3,
  slug: 'collaborative-pattern',
  title: 'Collaborative (Debate & Consensus)',
  description: 'Agents discuss, debate, and reach agreement together',
  readTime: 5,
  content: `# Collaborative Pattern (Debate & Consensus)

## What is it?

Collaborative Pattern has multiple agents discuss and debate to reach the best answer. Instead of one agent deciding, they work together to find consensus.

Think of it like: A panel of experts debating to reach the best solution.

## Visual Flow

\`\`\`
    ┌─────────┐  ┌─────────┐  ┌─────────┐
    │ Agent 1 │  │ Agent 2 │  │ Agent 3 │
    └────┬────┘  └────┬────┘  └────┬────┘
         │            │            │
         ▼            ▼            ▼
    ┌─────────────────────────────────────┐
    │         Propose Solutions           │
    └─────────────────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────┐
    │        Critique Each Other          │
    └─────────────────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────┐
    │         Reach Consensus             │
    └─────────────────────────────────────┘
                     │
                     ▼
              Final Decision
\`\`\`

## Code Example

\`\`\`python|javascript
class CollaborativeSystem:
    def __init__(self, agents, max_rounds=3):
        self.agents = agents
        self.max_rounds = max_rounds

    def run(self, problem):
        # Round 1: Each agent proposes solution
        proposals = []
        for agent in self.agents:
            proposal = agent.propose(problem)
            proposals.append({
                "agent": agent.name,
                "solution": proposal
            })

        # Round 2: Agents critique each other
        critiques = self.critique_round(proposals)

        # Round 3: Reach consensus
        final = self.reach_consensus(proposals, critiques)
        return final

    def critique_round(self, proposals):
        critiques = []
        for agent in self.agents:
            # Each agent reviews all proposals
            for proposal in proposals:
                if proposal["agent"] != agent.name:
                    critique = agent.critique(proposal)
                    critiques.append({
                        "reviewer": agent.name,
                        "reviewed": proposal["agent"],
                        "feedback": critique
                    })
        return critiques

    def reach_consensus(self, proposals, critiques):
        # Score each proposal based on critiques
        scores = {}
        for proposal in proposals:
            agent_name = proposal["agent"]
            positive = sum(1 for c in critiques
                         if c["reviewed"] == agent_name and c["feedback"]["positive"])
            scores[agent_name] = positive

        # Pick highest scored
        winner = max(scores, key=scores.get)
        return next(p for p in proposals if p["agent"] == winner)

# Usage
system = CollaborativeSystem([
    OptimistAgent(),    # Focuses on benefits
    PessimistAgent(),   # Focuses on risks
    PragmatistAgent()   # Focuses on practicality
])
result = system.run("Should we migrate to microservices?")
|||
class CollaborativeSystem {
    constructor(agents, maxRounds = 3) {
        this.agents = agents;
        this.maxRounds = maxRounds;
    }

    async run(problem) {
        // Round 1: Each agent proposes solution
        const proposals = [];
        for (const agent of this.agents) {
            const proposal = await agent.propose(problem);
            proposals.push({
                agent: agent.name,
                solution: proposal
            });
        }

        // Round 2: Agents critique each other
        const critiques = await this.critiqueRound(proposals);

        // Round 3: Reach consensus
        const final = this.reachConsensus(proposals, critiques);
        return final;
    }

    async critiqueRound(proposals) {
        const critiques = [];
        for (const agent of this.agents) {
            // Each agent reviews all proposals
            for (const proposal of proposals) {
                if (proposal.agent !== agent.name) {
                    const critique = await agent.critique(proposal);
                    critiques.push({
                        reviewer: agent.name,
                        reviewed: proposal.agent,
                        feedback: critique
                    });
                }
            }
        }
        return critiques;
    }

    reachConsensus(proposals, critiques) {
        // Score each proposal based on critiques
        const scores = {};
        for (const proposal of proposals) {
            const agentName = proposal.agent;
            const positive = critiques.filter(
                c => c.reviewed === agentName && c.feedback.positive
            ).length;
            scores[agentName] = positive;
        }

        // Pick highest scored
        const winner = Object.entries(scores).reduce(
            (a, b) => a[1] > b[1] ? a : b
        )[0];
        return proposals.find(p => p.agent === winner);
    }
}

// Usage
const system = new CollaborativeSystem([
    new OptimistAgent(),    // Focuses on benefits
    new PessimistAgent(),   // Focuses on risks
    new PragmatistAgent()   // Focuses on practicality
]);
const result = await system.run("Should we migrate to microservices?");
\`\`\`

## Debate Pattern

\`\`\`python|javascript
class DebateSystem:
    def __init__(self, debaters, judge, max_rounds=3):
        self.debaters = debaters
        self.judge = judge
        self.max_rounds = max_rounds

    def run(self, topic):
        history = []

        # Initial positions
        for debater in self.debaters:
            position = debater.state_position(topic)
            history.append({"agent": debater.name, "round": 0, "statement": position})

        # Debate rounds
        for round_num in range(1, self.max_rounds + 1):
            for debater in self.debaters:
                # Respond to others' arguments
                response = debater.respond(topic, history)
                history.append({
                    "agent": debater.name,
                    "round": round_num,
                    "statement": response
                })

        # Judge decides winner
        verdict = self.judge.decide(topic, history)
        return {
            "debate_history": history,
            "verdict": verdict
        }

# Usage: Two agents debate, third judges
debate = DebateSystem(
    debaters=[ProAgent(), ConAgent()],
    judge=JudgeAgent()
)
result = debate.run("Is AI going to replace programmers?")
|||
class DebateSystem {
    constructor(debaters, judge, maxRounds = 3) {
        this.debaters = debaters;
        this.judge = judge;
        this.maxRounds = maxRounds;
    }

    async run(topic) {
        const history = [];

        // Initial positions
        for (const debater of this.debaters) {
            const position = await debater.statePosition(topic);
            history.push({ agent: debater.name, round: 0, statement: position });
        }

        // Debate rounds
        for (let roundNum = 1; roundNum <= this.maxRounds; roundNum++) {
            for (const debater of this.debaters) {
                // Respond to others' arguments
                const response = await debater.respond(topic, history);
                history.push({
                    agent: debater.name,
                    round: roundNum,
                    statement: response
                });
            }
        }

        // Judge decides winner
        const verdict = await this.judge.decide(topic, history);
        return {
            debateHistory: history,
            verdict
        };
    }
}

// Usage: Two agents debate, third judges
const debate = new DebateSystem(
    [new ProAgent(), new ConAgent()],
    new JudgeAgent()
);
const result = await debate.run("Is AI going to replace programmers?");
\`\`\`

## Voting System

\`\`\`python|javascript
class VotingSystem:
    def __init__(self, voters, threshold=0.5):
        self.voters = voters
        self.threshold = threshold

    def run(self, options, context):
        votes = {}
        reasoning = []

        for voter in self.voters:
            vote = voter.vote(options, context)
            votes[voter.name] = vote["choice"]
            reasoning.append({
                "voter": voter.name,
                "choice": vote["choice"],
                "reason": vote["reason"]
            })

        # Count votes
        vote_counts = {}
        for choice in votes.values():
            vote_counts[choice] = vote_counts.get(choice, 0) + 1

        # Find winner
        total = len(self.voters)
        winner = None
        for choice, count in vote_counts.items():
            if count / total >= self.threshold:
                winner = choice
                break

        return {
            "winner": winner,
            "votes": vote_counts,
            "reasoning": reasoning,
            "consensus_reached": winner is not None
        }

# Usage
voting = VotingSystem([
    SecurityExpert(),
    PerformanceExpert(),
    UXExpert(),
    CostExpert(),
    MaintenanceExpert()
], threshold=0.6)

result = voting.run(
    options=["Option A: Rewrite", "Option B: Refactor", "Option C: Keep as is"],
    context="Legacy system causing performance issues"
)
|||
class VotingSystem {
    constructor(voters, threshold = 0.5) {
        this.voters = voters;
        this.threshold = threshold;
    }

    async run(options, context) {
        const votes = {};
        const reasoning = [];

        for (const voter of this.voters) {
            const vote = await voter.vote(options, context);
            votes[voter.name] = vote.choice;
            reasoning.push({
                voter: voter.name,
                choice: vote.choice,
                reason: vote.reason
            });
        }

        // Count votes
        const voteCounts = {};
        for (const choice of Object.values(votes)) {
            voteCounts[choice] = (voteCounts[choice] || 0) + 1;
        }

        // Find winner
        const total = this.voters.length;
        let winner = null;
        for (const [choice, count] of Object.entries(voteCounts)) {
            if (count / total >= this.threshold) {
                winner = choice;
                break;
            }
        }

        return {
            winner,
            votes: voteCounts,
            reasoning,
            consensusReached: winner !== null
        };
    }
}

// Usage
const voting = new VotingSystem([
    new SecurityExpert(),
    new PerformanceExpert(),
    new UXExpert(),
    new CostExpert(),
    new MaintenanceExpert()
], 0.6);

const result = await voting.run(
    ["Option A: Rewrite", "Option B: Refactor", "Option C: Keep as is"],
    "Legacy system causing performance issues"
);
\`\`\`

## Synthesis Pattern

\`\`\`python|javascript
class SynthesisSystem:
    def __init__(self, experts, synthesizer):
        self.experts = experts
        self.synthesizer = synthesizer

    def run(self, problem):
        # Get perspectives from all experts
        perspectives = []
        for expert in self.experts:
            view = expert.analyze(problem)
            perspectives.append({
                "expert": expert.name,
                "specialty": expert.specialty,
                "analysis": view
            })

        # Synthesizer combines best of all
        synthesis = self.synthesizer.synthesize(problem, perspectives)
        return {
            "perspectives": perspectives,
            "synthesis": synthesis
        }

# Usage: Combine multiple viewpoints into one solution
system = SynthesisSystem(
    experts=[
        TechnicalExpert(),
        BusinessExpert(),
        UserExpert()
    ],
    synthesizer=SynthesizerAgent()
)
result = system.run("How should we redesign the checkout flow?")
# Gets technical, business, and user perspectives, then combines them
|||
class SynthesisSystem {
    constructor(experts, synthesizer) {
        this.experts = experts;
        this.synthesizer = synthesizer;
    }

    async run(problem) {
        // Get perspectives from all experts
        const perspectives = [];
        for (const expert of this.experts) {
            const view = await expert.analyze(problem);
            perspectives.push({
                expert: expert.name,
                specialty: expert.specialty,
                analysis: view
            });
        }

        // Synthesizer combines best of all
        const synthesis = await this.synthesizer.synthesize(problem, perspectives);
        return {
            perspectives,
            synthesis
        };
    }
}

// Usage: Combine multiple viewpoints into one solution
const system = new SynthesisSystem(
    [
        new TechnicalExpert(),
        new BusinessExpert(),
        new UserExpert()
    ],
    new SynthesizerAgent()
);
const result = await system.run("How should we redesign the checkout flow?");
// Gets technical, business, and user perspectives, then combines them
\`\`\`

## Common Use Cases

**Code Review:**
Multiple reviewers discuss and agree on feedback

**Decision Making:**
Experts debate options, vote on best choice

**Content Quality:**
Multiple editors review and synthesize improvements

**Risk Assessment:**
Different perspectives identify and weigh risks

## Pros and Cons

**Pros:**

Higher quality decisions

Multiple perspectives considered

Reduces individual bias

Good for important decisions

**Cons:**

Slow (multiple rounds)

May not reach consensus

More expensive (multiple LLM calls)

Complex to implement

## When to Use

Important decisions needing multiple viewpoints

Quality matters more than speed

Want to reduce bias or errors

Complex problems with no clear answer

## Example Prompts

Propose solution:
\`\`\`
You are {agent_role} in a collaborative decision.

Problem: {problem}

Propose your solution from your perspective.
Explain your reasoning clearly.
\`\`\`

Critique others:
\`\`\`
You are reviewing another agent's proposal.

Problem: {problem}
Their proposal: {proposal}

Critique this proposal:
1. What are the strengths?
2. What are the weaknesses?
3. Would you support this? (yes/no)
\`\`\`

Reach consensus:
\`\`\`
You are synthesizing multiple proposals.

Problem: {problem}
Proposals: {all_proposals}
Critiques: {all_critiques}

Create a final solution that:
1. Takes the best from each proposal
2. Addresses the critiques raised
3. Represents team consensus
\`\`\`

## Key Point

Collaborative = Discussion + Consensus. Multiple agents propose, critique, and agree. Best for high-stakes decisions where quality beats speed.
`,
  previousTopic: { module: 3, slug: 'hierarchical-pattern', title: 'Hierarchical' },
  nextTopic: { module: 3, slug: 'langgraph', title: 'LangGraph' },
};

import { Article } from './types';

export const evaluationAgent: Article = {
  module: 2,
  slug: 'evaluation-agent',
  title: 'Evaluation Agent',
  description: 'Checks quality of work before delivery',
  readTime: 3,
  content: `# Evaluation Agent

## What is it?

The Evaluation Agent checks if work is good enough. It's the quality control.

Think of it like: A teacher grading an assignment before submission.

## What it Evaluates

Correctness: Is the answer right?

Completeness: Did it cover everything?

Clarity: Is it easy to understand?

Quality: Is the code clean? Is the writing good?

## Code Example

\`\`\`python|javascript
class EvaluationAgent:
    def __init__(self, llm):
        self.llm = llm

    def evaluate(self, task, output):
        score = self.llm.generate(f"""
            Task: {task}
            Output: {output}

            Rate from 1-10 on:
            - Correctness
            - Completeness
            - Clarity

            Format: SCORE: X/10
            FEEDBACK: ...
        """)
        return self.parse_score(score)

    def is_good_enough(self, score):
        return score >= 7

# Usage
evaluator = EvaluationAgent(llm)
result = evaluator.evaluate(
    task="Write a function to reverse a string",
    output="def reverse(s): return s[::-1]"
)
# Returns: {"score": 9, "feedback": "Correct and clean"}
|||
class EvaluationAgent {
    constructor(llm) {
        this.llm = llm;
    }

    async evaluate(task, output) {
        const score = await this.llm.generate(\`
            Task: \${task}
            Output: \${output}

            Rate from 1-10 on:
            - Correctness
            - Completeness
            - Clarity

            Format: SCORE: X/10
            FEEDBACK: ...
        \`);
        return this.parseScore(score);
    }

    isGoodEnough(score) {
        return score >= 7;
    }
}

// Usage
const evaluator = new EvaluationAgent(llm);
const result = await evaluator.evaluate(
    "Write a function to reverse a string",
    "const reverse = (s) => s.split('').reverse().join('')"
);
// Returns: { score: 9, feedback: "Correct and clean" }
\`\`\`

## Example Prompt

\`\`\`
You are an Evaluation Agent. Your job is to rate the quality of work.

Task that was requested: {task}
Output produced: {output}

Evaluate on these criteria (1-10 each):

1. Correctness: Does it solve the task correctly?
2. Completeness: Does it cover all requirements?
3. Clarity: Is it easy to understand?
4. Quality: Is it well-written/clean code?

Format:
CORRECTNESS: X/10 - [reason]
COMPLETENESS: X/10 - [reason]
CLARITY: X/10 - [reason]
QUALITY: X/10 - [reason]
OVERALL: X/10
PASS: YES/NO (YES if all scores >= 7)
FEEDBACK: [what to improve]
\`\`\`

## When to Use

Before sending response to user

After code generation

After content creation

When accuracy matters

## Key Point

Evaluation Agent = Quality Gate. Nothing goes out without passing inspection.
`,
  previousTopic: { module: 2, slug: 'memory-agent', title: 'Memory Agent' },
  nextTopic: { module: 2, slug: 'verification-agent', title: 'Verification Agent' },
};

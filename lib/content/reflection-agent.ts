import { Article } from './types';

export const reflectionAgent: Article = {
  module: 3,
  slug: 'reflection-agent',
  title: 'Reflection Agent',
  description: 'Learns from mistakes and improves over time',
  readTime: 3,
  content: `# Reflection Agent

## What is it?

The Reflection Agent analyzes failures and learns from them. It makes the system smarter over time.

Think of it like: A coach reviewing game footage to improve next time.

## What it Does

Analyzes what went wrong

Identifies why it failed

Suggests improvements

Stores lessons for future

## Code Example

\`\`\`python|javascript
class ReflectionAgent:
    def __init__(self, llm):
        self.llm = llm
        self.lessons = []

    def reflect(self, task, attempt, error):
        reflection = self.llm.generate(f"""
            Task: {task}
            What we tried: {attempt}
            What went wrong: {error}

            Analyze:
            1. Why did this fail?
            2. What should we do differently?
            3. What lesson should we remember?
        """)

        # Store the lesson
        lesson = self.extract_lesson(reflection)
        self.lessons.append(lesson)

        return reflection

    def get_advice(self, new_task):
        # Check if past lessons apply
        for lesson in self.lessons:
            if self.is_relevant(lesson, new_task):
                return f"Remember: {lesson}"
        return None

# Usage
reflector = ReflectionAgent(llm)

# After a failure
reflector.reflect(
    task="Parse user date input",
    attempt="Used simple split('/')",
    error="Failed on '25-12-2024' format"
)
# Stores lesson: "Use dateutil parser for flexible date formats"

# Next time similar task comes
advice = reflector.get_advice("Parse date from user")
# Returns: "Remember: Use dateutil parser for flexible date formats"
|||
class ReflectionAgent {
    constructor(llm) {
        this.llm = llm;
        this.lessons = [];
    }

    async reflect(task, attempt, error) {
        const reflection = await this.llm.generate(\`
            Task: \${task}
            What we tried: \${attempt}
            What went wrong: \${error}

            Analyze:
            1. Why did this fail?
            2. What should we do differently?
            3. What lesson should we remember?
        \`);

        // Store the lesson
        const lesson = this.extractLesson(reflection);
        this.lessons.push(lesson);

        return reflection;
    }

    getAdvice(newTask) {
        // Check if past lessons apply
        for (const lesson of this.lessons) {
            if (this.isRelevant(lesson, newTask)) {
                return \`Remember: \${lesson}\`;
            }
        }
        return null;
    }
}

// Usage
const reflector = new ReflectionAgent(llm);

// After a failure
await reflector.reflect(
    "Parse user date input",
    "Used simple split('/')",
    "Failed on '25-12-2024' format"
);
// Stores lesson: "Use dateutil parser for flexible date formats"

// Next time similar task comes
const advice = reflector.getAdvice("Parse date from user");
// Returns: "Remember: Use dateutil parser for flexible date formats"
\`\`\`

## Reflection Loop

1. Agent tries task
2. Task fails
3. Reflection Agent analyzes why
4. Stores lesson learned
5. Next similar task uses that lesson
6. System gets smarter over time

## Example Prompts

Reflect on failure:
\`\`\`
You are a Reflection Agent. Your job is to learn from failures.

Task: {task}
Attempt: {what_we_tried}
Error: {what_went_wrong}

Analyze this failure:

1. ROOT CAUSE: Why did this fail? (be specific)
2. MISTAKE: What was the key mistake?
3. LESSON: What should we remember for next time?
4. IMPROVEMENT: How should we approach this differently?

Format the lesson as a single sentence that can be stored and reused.
\`\`\`

Get advice for new task:
\`\`\`
You are checking if past lessons apply to a new task.

New task: {new_task}
Past lessons: {lessons}

Are any of these lessons relevant to this task?
If yes, explain how to apply them.
If no, say "No relevant lessons found."
\`\`\`

## When to Use

After task failures

For continuous improvement

Building self-improving systems

When same mistakes keep happening

## Key Point

Reflection Agent = Learning Coach. Failures become lessons, lessons prevent future failures.
`,
  previousTopic: { module: 3, slug: 'verification-agent', title: 'Verification Agent' },
  nextTopic: { module: 3, slug: 'multi-agent-communication', title: 'Multi-Agent Communication' },
};

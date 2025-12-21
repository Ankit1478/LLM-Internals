import { Article } from './types';

export const workerAgents: Article = {
  module: 3,
  slug: 'worker-agents',
  title: 'Worker Agents',
  description: 'Specialized agents that execute specific tasks',
  readTime: 3,
  content: `# Worker Agents

## What is it?

**Workers** are specialized agents that do the actual work. Each worker is expert at one thing.

**Think of it like:** Developers, designers, testers - each has their specialty.

## Common Worker Types

1. **CodeWorker** - Writes and edits code. Tools: file_write, file_read, run_tests

2. **ResearchWorker** - Searches web, reads documents. Tools: web_search, read_docs

3. **WriterWorker** - Creates blog posts, docs, emails. Tools: text_edit, format

4. **DataWorker** - Analyzes data, creates charts. Tools: database_query, visualize

5. **ReviewWorker** - Reviews code/content for quality. Tools: analyze, comment

## Code Example

\`\`\`python|javascript
class CodeWorker:
    def __init__(self, llm):
        self.llm = llm

    def execute(self, task):
        code = self.llm.generate(f"""
            You are a coding expert.
            Task: {task}
            Write clean, working code.
        """)
        return {"code": code, "type": "code"}

class ResearchWorker:
    def __init__(self, llm, search_tool):
        self.llm = llm
        self.search = search_tool

    def execute(self, task):
        results = self.search(task)
        summary = self.llm.generate(f"Summarize: {results}")
        return {"summary": summary, "type": "research"}
|||
class CodeWorker {
    constructor(llm) {
        this.llm = llm;
    }

    async execute(task) {
        const code = await this.llm.generate(\`
            You are a coding expert.
            Task: \${task}
            Write clean, working code.
        \`);
        return { code, type: "code" };
    }
}

class ResearchWorker {
    constructor(llm, searchTool) {
        this.llm = llm;
        this.search = searchTool;
    }

    async execute(task) {
        const results = await this.search(task);
        const summary = await this.llm.generate(\`Summarize: \${results}\`);
        return { summary, type: "research" };
    }
}
\`\`\`

## Worker Design Rules

1. **One specialty** - Each worker does one thing well
2. **Clear interface** - All workers have \`execute(task)\` method
3. **Right tools** - Give workers only tools they need
4. **Focused prompt** - Tell worker its role clearly

## Key Point

**Workers = Specialists.** They don't decide what to do, they do what they're told - really well.
`,
  previousTopic: { module: 3, slug: 'supervisor-agent', title: 'Supervisor Agent' },
  nextTopic: { module: 3, slug: 'planning-agent', title: 'Planning Agent' },
};

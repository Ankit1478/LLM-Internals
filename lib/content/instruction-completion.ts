import { Article } from './types';

export const instructionCompletion: Article = {
  module: 1,
  slug: 'instruction-completion',
  title: 'Instruction Following vs Completion',
  description: 'Two different ways AI can respond to your input',
  readTime: 4,
  previousTopic: { module: 1, slug: 'prompt-context', title: '22. Prompt Context Dynamics' },
  nextTopic: undefined, // Last topic in module!
  content: `# Instruction Following vs Completion

## Two Different Modes

AI can work in two ways!

**Completion Mode:** Finish your sentence
**Instruction Mode:** Do what you ask

Different tools!

## Completion Mode (Old Style)

Like autocomplete on steroids!

\`\`\`
You type: "The capital of France is"
AI: "Paris"

You type: "Once upon a time there was a"
AI: "princess who lived in a castle..."

Finishes what you started!
\`\`\`

This is how **GPT-3** worked!

## Instruction Mode (New Style)

Follows commands!

\`\`\`
You: "Write a poem about cats"
AI: [Writes full poem]

You: "Translate this to Spanish"
AI: [Translates]

Does tasks!
\`\`\`

This is how **ChatGPT** works!

## The Big Difference

**Completion:**
\`\`\`
You: "The weather today is"
AI: "sunny and warm"
(Completes the sentence)
\`\`\`

**Instruction:**
\`\`\`
You: "The weather today is"
AI: "I don't have access to current weather.
     Try a weather app!"
(Interprets as question, gives helpful response)
\`\`\`

Different interpretations!

## Why The Change?

Early AI (GPT-3):
- Just completed text
- Good for writers
- Bad for chatting

Modern AI (ChatGPT):
- Follows instructions
- Good for chatting
- Better for tasks

People wanted helpers, not autocomplete!

## How They Made The Switch

**Training Change:**

\`\`\`
Old training:
"Here's text, predict next word"

New training:
"Here's instruction: [task]
Here's good response: [example]
Learn to do tasks like this!"

Called: Instruction tuning!
\`\`\`

## When Each Is Better

**Completion is better for:**
- Writing stories
- Code completion
- Continuing text

**Instruction is better for:**
- Chatting
- Answering questions
- Doing specific tasks

## Mixed Modes

Modern AI can do BOTH!

\`\`\`
ChatGPT in instruction mode BUT:

You: "Complete this: The quick brown"
AI: "fox jumps over the lazy dog"

Can still complete when asked!
\`\`\`

Flexible!

## The Format Difference

**Completion Format:**
\`\`\`
Input: Just text to continue
Output: Continuation

No system messages!
No special format!
\`\`\`

**Instruction Format:**
\`\`\`
System: You are a helpful assistant
User: [Your question]
Assistant: [AI response]

Structured conversation!
\`\`\`

## Examples Side-by-Side

**Same input, different modes:**

Input: "Python is"

\`\`\`
Completion mode:
"a programming language created by 
Guido van Rossum in 1991..."
(Continues factually)

Instruction mode:
"Is this a question? Python is a 
programming language. What would 
you like to know about it?"
(Tries to be helpful)
\`\`\`

## Why Instruction Won

People prefer instruction mode!

\`\`\`
Completion: Smart autocomplete
Instruction: Actual assistant

Users want: Assistant!

Result: ChatGPT, Claude, Gemini
All use instruction mode!
\`\`\`

## Under The Hood

Same model! Different prompts!

\`\`\`
Base model: GPT-3.5

+ No special training = Completion mode
+ Instruction training = ChatGPT

Same brain, different behavior!
\`\`\`

## Summary

> **Instruction Following vs Completion** = Completion mode finishes your text. Instruction mode does what you ask. Modern AI uses instruction mode because people want helpful assistants, not just autocomplete!

**Completion:**
- Finishes sentences
- Like smart autocomplete
- GPT-3 style

**Instruction:**
- Follows commands  
- Like helpful assistant
- ChatGPT style

**Why instruction won:**
\`\`\`
People don't want: Text predictor
People want: Helpful assistant

Instruction mode = Better for users!
\`\`\`

---

## 🎉 Module 2 Complete!

You've finished all 23 topics on **LLM Internals**!

You now understand:
- ✅ How attention works (multi-head, mechanisms)
- ✅ Feed-forward networks
- ✅ Layer normalization & residual connections
- ✅ Complexity and memory issues
- ✅ Position encodings (RoPE, ALiBi)
- ✅ KV Cache and PagedAttention
- ✅ Context windows and limitations
- ✅ Why AI behaves the way it does!

**Congratulations!** 🚀

You've learned the internals of how Large Language Models really work - from first principles to practical behavior!
`,
};

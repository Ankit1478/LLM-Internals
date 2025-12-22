import { Article } from './types';

export const promptContext: Article = {
  module: 1,
  slug: 'prompt-context',
  title: 'Prompt Context Dynamics',
  description: 'How your words shape AI behavior and responses',
  readTime: 4,
  previousTopic: { module: 1, slug: 'hallucinations', title: '21. Why Hallucinations Happen' },
  nextTopic: { module: 1, slug: 'instruction-completion', title: '23. Instruction Following vs Completion' },
  content: `# Prompt Context Dynamics

## What Is This?

HOW you ask changes WHAT you get!

Same question, different words = Different answers!

## Simple Example

Compare these:

\`\`\`
Ask #1: "Python?"
AI: "Python is a programming language..."

Ask #2: "What's a python?"
AI: "A python is a large snake..."

Ask #3: "How do I use Python?"
AI: "To use Python, first install it..."

Same word! Different context! Different answers!
\`\`\`

Your words matter!

## The Priming Effect

First words set the tone!

\`\`\`
Start with: "You are an expert chef..."
AI responds: Like a chef! (cooking terms, recipes)

Start with: "You are a scientist..."
AI responds: Like a scientist! (technical, precise)

First sentence = Sets the mode!
\`\`\`

## Examples vs Instructions

**Instructions (Tell what to do):**
\`\`\`
"Write a poem about cats"

AI: Writes generic cat poem
\`\`\`

**Examples (Show what you want):**
\`\`\`
"Write a poem about cats.

Example style:
Roses are red,
Violets are blue,
Sugar is sweet,
And so are you.

Now write about cats in this style."

AI: Matches the pattern! Better result!
\`\`\`

Show > Tell!

## Tone Matters

\`\`\`
Formal: "Please explain quantum mechanics"
AI: Technical, detailed response

Casual: "Dude, what's quantum stuff?"
AI: Simpler, friendlier response

Your tone = AI's tone!
\`\`\`

## Length Hints

AI matches your length!

\`\`\`
Short question: "Capital of France?"
AI: "Paris" (brief!)

Long question: "Could you please provide 
a detailed explanation of the capital 
city of France, including historical 
context and cultural significance?"
AI: Long detailed answer!

Match energy!
\`\`\`

## Context Builds Up

Each message adds context!

\`\`\`
Message 1: "I'm learning Python"
AI: Notes this

Message 2: "How do I make a loop?"
AI: Explains Python loops (remembers context!)

Without context:
"How do I make a loop?"
AI: Which language? (no context!)
\`\`\`

Conversation history matters!

## The "Act As" Trick

\`\`\`
Normal: "Explain blockchain"
AI: Generic explanation

Better: "Act as a blockchain expert.
Explain blockchain to a beginner."
AI: More focused, beginner-friendly!

Role-playing works!
\`\`\`

## Negative Prompting

Tell AI what NOT to do:

\`\`\`
"Write a story. Don't use clichés."
AI: Avoids common phrases!

"Explain this. Don't use jargon."
AI: Uses simple words!

Boundaries help!
\`\`\`

## Step-by-Step Works

\`\`\`
"Solve 234 × 567"
AI: Might guess wrong

Better: "Solve 234 × 567 step by step"
AI: Shows work, more accurate!

"Think step by step" = Magic words!
\`\`\`

## Format Matters

\`\`\`
"List fruits"
AI: Apple, banana, orange...

"List fruits in JSON format"
AI: {"fruits": ["apple", "banana", "orange"]}

Specify format! Get format!
\`\`\`

## The Reset Problem

Context can get messy!

\`\`\`
Long conversation about cooking
Then: "Tell me about Python"
AI: Might still think cooking! (context bias)

Solution: "Forget cooking. New topic: Python"
Helps reset context!
\`\`\`

## Summary

> **Prompt Context Dynamics** = How you phrase your question shapes the answer. AI matches your tone, length, and style. Context from previous messages affects new responses!

**Key tricks:**
- 🎭 "Act as..." (set role)
- 📝 Show examples (better than instructions)
- 🪜 "Step by step" (more accurate)
- 🚫 "Don't..." (set boundaries)
- 📏 Match your desired length
- 🎯 Specify format

**Remember:**
\`\`\`
How you ask = What you get!

Clear question → Clear answer
Vague question → Vague answer

Put effort into prompts!
\`\`\`

## What's Next?

Final topic! Understanding the last piece!

Next: **Instruction Following vs Completion** - Two different ways AI can work!
`,
};

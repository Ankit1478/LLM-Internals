import { Article } from './types';

export const contextWindow: Article = {
  module: 1,
  slug: 'context-window',
  title: 'Context Window vs Working Memory',
  description: 'What AI can see vs what it can actually use',
  readTime: 4,
  previousTopic: { module: 1, slug: 'memory-implications', title: '16. Memory Implications' },
  nextTopic: { module: 1, slug: 'context-decay', title: '18. Context Decay & Lost-in-the-Middle' },
  content: `# Context Window vs Working Memory

## What's the Difference?

**Context Window** = What AI can SEE
**Working Memory** = What AI can actually USE

Big difference!

## Book Reading Analogy

\`\`\`
Context Window:
= All pages in the book you have open
= Can flip to any page

Working Memory:
= The 1-2 pages you're ACTUALLY reading
= What you're thinking about RIGHT NOW

You have the whole book...
But only focus on a few pages!
\`\`\`

Same with AI!

## Simple Example

\`\`\`
AI with 100,000 word context window:

Can see: All 100,000 words ✓
But focuses on: Maybe 1,000-2,000 words
Rest is there but... less useful!

Like having a messy desk:
Everything is ON the desk (context window)
But you only use what's in front of you (working memory)
\`\`\`

## Why This Matters

People think:

\`\`\`
"Claude has 100K context!"
= "It remembers EVERYTHING perfectly!"

Reality:
Context: 100K words visible ✓
Working memory: Much less!
Attention: Fades over distance!
\`\`\`

It's not magic!

## Real Conversation Example

\`\`\`
You: "My favorite color is blue" (Beginning)
... 50,000 words of chat ...
You: "What's my favorite color?" (Now)

Context window: Contains whole conversation ✓
But AI might forget!

Why? Working memory focuses on recent stuff!
\`\`\`

## The Attention Spread Problem

\`\`\`
100 words in context:
Each word gets: 1% attention

100,000 words in context:
Each word gets: 0.001% attention!

More words = Less focus per word!
\`\`\`

Like trying to listen to 1,000 people at once!

## What AI Focuses On

Usually focuses on:

**1. Recent stuff**
\`\`\`
Last 100-500 words = High attention
Very fresh! ✓
\`\`\`

**2. Beginnings**
\`\`\`
First 100-500 words = Medium attention
System prompts live here!
\`\`\`

**3. Important keywords**
\`\`\`
Your question words = High attention
Currently relevant!
\`\`\`

**4. Middle stuff?**
\`\`\`
Middle 90% = Low attention
Gets "lost" ⚠️
\`\`\`

## Visual Pattern

\`\`\`
Attention Strength:
Start: ████████ (Strong)
Middle: ██ (Weak! Lost in middle!)
End: ████████ (Strong)

U-shaped attention!
\`\`\`

## Context Size Examples

\`\`\`
GPT-3.5: 4K tokens
= ~3,000 words
= One page of text

GPT-4: 8K-32K tokens  
= Up to ~25,000 words
= Short story

Claude 2: 100K tokens
= ~75,000 words
= Small book!

But all have limited working memory!
\`\`\`

## Working Memory Reality

Even with big context:

\`\`\`
AI effectively "works" with:
- Last ~1,000 words (recent)
- First ~500 words (system)
- Important keywords (scattered)

Total working set: ~2,000-3,000 words

Even in 100K context!
\`\`\`

## Why Not Perfect Memory?

**1. Attention Dilution**
\`\`\`
More words = Less attention each
Math problem!
\`\`\`

**2. Position Biases**
\`\`\`
Recent = Easy to use
Middle = Hard to access
\`\`\`

**3. Computational Cost**
\`\`\`
Looking at ALL words = Slow
Focus on some = Faster
\`\`\`

## Tricks People Use

**1. Put Important Stuff at End**
\`\`\`
Instead of:
"Rule: Be polite" (beginning, might forget)
... long conversation ...
"Answer my question"

Do:
... long conversation ...
"Remember to be polite! Answer my question"

Repeat important things!
\`\`\`

**2. Summarize Often**
\`\`\`
Every 1,000 words:
"To recap: [key points]"

Brings old info back to focus!
\`\`\`

**3. Use System Messages**
\`\`\`
System messages = High priority
AI pays more attention
Put key rules there!
\`\`\`

## The Trade-off

\`\`\`
Bigger context window:
+ Can fit more info
+ Can see full conversation
- More expensive
- Still forgets middle stuff!

Smaller context window:
+ Cheaper
+ Faster
+ Forces conciseness
- Can't fit everything

Pick what you need!
\`\`\`

## Summary

> **Context Window** = How much text AI can see. **Working Memory** = How much it actually focuses on (much less!). Big context doesn't mean perfect memory!

**Think of it like:**
- 📚 Book on desk (context) vs page you're reading (working memory)
- 🗂️ All files vs currently open file
- 📺 All TV channels vs the one you're watching
- 🧠 Everything you know vs what you're thinking about NOW

**Key insight:**
\`\`\`
Context window = 100,000 words ✓
Working memory = ~2,000-3,000 words

Don't expect perfect recall!
AI is like humans:
- Remembers recent stuff best
- Forgets middle
- Focuses on important bits
\`\`\`

## What's Next?

We know AI focuses on start and end.

But what exactly happens to the middle?

Next: **Context Decay & Lost-in-the-Middle** - Why the middle gets forgotten!
`,
};

import { Article } from './types';

export const needleHaystack: Article = {
  module: 1,
  slug: 'needle-haystack',
  title: 'Needle-in-Haystack Tests',
  description: 'Testing if AI can find hidden information in long text',
  readTime: 4,
  previousTopic: { module: 1, slug: 'context-decay', title: '18. Context Decay & Lost-in-the-Middle' },
  nextTopic: { module: 1, slug: 'reasoning-patterns', title: '20. Reasoning vs Pattern-Following' },
  content: `# Needle-in-Haystack Tests

## What Is This Test?

Hide a fact in LOTS of text.

Can AI find it?

Like finding a needle in a haystack!

## Simple Example

\`\`\`
Give AI 10,000 words of random text.

Somewhere in middle:
"The secret password is BANANA123"

Then ask:
"What's the password?"

Can AI find it? 🤔
\`\`\`

## Why This Matters

Tests if long context actually works!

\`\`\`
Model claims: "100K context window!"

Does it really USE all 100K?
Or just pretend?

This test finds out!
\`\`\`

## How The Test Works

**Step 1: Create Haystack**
\`\`\`
Fill with boring text:
"The weather is nice. The sky is blue. 
Trees are green. Birds are singing..."

Thousands of words like this!
\`\`\`

**Step 2: Hide Needle**
\`\`\`
Insert one special fact:
"The magic number is 42"

Random position in the haystack!
Could be beginning, middle, or end!
\`\`\`

**Step 3: Ask Question**
\`\`\`
"What is the magic number?"

AI must search through ALL text!
Find that ONE sentence!
\`\`\`

**Step 4: Check Answer**
\`\`\`
Correct: "42" ✓
Wrong: "I don't know" ❌
Wrong: Makes up answer ❌
\`\`\`

## Test Results

Different positions tested:

\`\`\`
Needle at position 10% (near start):
Success: 95% ✓

Needle at position 50% (middle):
Success: 40% ❌

Needle at position 90% (near end):
Success: 90% ✓

Middle is HARDEST!
\`\`\`

Proves "lost-in-middle" problem!

## Real Test Example

\`\`\`
Text: 50,000 words about various topics

Hidden fact at position 25,000:
"The best pizza topping is pineapple"

Ask: "According to the text, what's 
      the best pizza topping?"

GPT-3.5: Often fails ❌
GPT-4: Sometimes succeeds ✓
Claude 2: Better at finding it ✓
\`\`\`

## Depth Test

Not just position - also how DEEP buried!

\`\`\`
Easy (shallow):
"The code is 123. That's the code."
^ Repeated, easy to find!

Hard (deep):
"When asked about security, the 
administrator mentioned the code 
was set to 123 last Tuesday."
^ Hidden in sentence, harder!
\`\`\`

## Different Haystack Types

### 1. Random Text
\`\`\`
Completely unrelated sentences.
Easy to spot the needle!
\`\`\`

### 2. Similar Topic
\`\`\`
All about same subject.
Needle blends in!
Harder to find!
\`\`\`

### 3. Distracting Info
\`\`\`
Many similar facts:
"The code is 111"
"The code is 222"
"The password is 333"
Hidden: "The secret code is 444"

Very hard! Many false leads!
\`\`\`

## Scoring The Test

\`\`\`
Perfect score: 100%
= Finds needle at ANY position

Good score: 85%+
= Usually finds it

Poor score: 50%
= Only finds at start/end

Failed: <40%
= Context not really working
\`\`\`

## Model Comparison

Recent results:

\`\`\`
GPT-3.5 (4K context):
Score: 75% (OK for short text)

GPT-4 (32K context):
Score: 82% (Better!)

Claude 2 (100K context):
Score: 88% (Best!)

Longer context ≠ automatic win!
Must actually USE it well!
\`\`\`

## Why Models Fail

**1. Attention Decay**
\`\`\`
Middle gets less attention
Needle in middle = Invisible!
\`\`\`

**2. Distraction**
\`\`\`
Lots of text = Lots of noise
Signal gets lost!
\`\`\`

**3. Pattern Matching**
\`\`\`
AI looks for patterns
Random needle = No pattern
Hard to spot!
\`\`\`

## Improving Performance

Tricks that help:

**1. Repetition**
\`\`\`
Instead of one needle:
Mention fact 2-3 times
Different positions

Harder to miss!
\`\`\`

**2. Make It Stand Out**
\`\`\`
Boring: "The code is 123"
Better: "IMPORTANT: The code is 123"
Best: "*** SECRET CODE: 123 ***"

Grabs attention!
\`\`\`

**3. Ask Smart Questions**
\`\`\`
Vague: "What's the number?"
Better: "What's the secret code mentioned?"
Best: "Find the code in the security section"

Gives AI hints where to look!
\`\`\`

## Practical Use

This test reveals:

**What works:**
- Short contexts (4K-8K)
- Recent information
- Repeated facts
- Start/end positions

**What struggles:**
- Very long contexts (100K+)
- Middle positions
- One-time mentions
- Buried info

Plan accordingly!

## Summary

> **Needle-in-Haystack Tests** = Hide a fact in lots of text and see if AI can find it. Tests if long context windows actually work. Middle positions fail most!

**The test:**
\`\`\`
Haystack: Lots of boring text
Needle: One hidden fact
Question: Can you find it?

Good AI: Finds it anywhere!
Bad AI: Only finds at start/end
\`\`\`

**What we learned:**
- Middle = Hardest position
- More context ≠ better finding
- Repetition helps
- Make important stuff stand out

**Real lesson:**
\`\`\`
Don't assume AI reads everything!

It CAN see all text
But FOCUSES on start/end

Design around this!
\`\`\`

## What's Next?

We know HOW AI processes text.

But does it actually THINK?

Next: **Reasoning vs Pattern-Following** - Is AI smart or just good at matching patterns?
`,
};

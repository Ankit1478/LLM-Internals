import { Article } from './types';

export const reasoningPatterns: Article = {
  module: 1,
  slug: 'reasoning-patterns',
  title: 'Reasoning vs Pattern-Following',
  description: 'Does AI actually think or just match patterns?',
  readTime: 5,
  previousTopic: { module: 1, slug: 'needle-haystack', title: '19. Needle-in-Haystack Tests' },
  nextTopic: { module: 1, slug: 'hallucinations', title: '21. Why Hallucinations Happen' },
  content: `# Reasoning vs Pattern-Following

## The Big Question

Does AI actually THINK?

Or does it just copy patterns?

Honest answer: Mostly patterns!

## What's The Difference?

**Reasoning (Real Thinking):**
\`\`\`
Problem: "What's 347 + 892?"
Think: "7+2=9, 4+9=13, carry 1..."
Answer: 1,239

Understanding math!
\`\`\`

**Pattern Matching:**
\`\`\`
Problem: "What's 347 + 892?"
Seen before: "300 + 800 ≈ 1,100+"
Pattern: "Add hundreds, add more..."
Answer: ~1,200 (close but guessed!)

Matching similar examples!
\`\`\`

## Simple Test

Ask AI unusual questions:

\`\`\`
Normal: "How many legs does a dog have?"
AI: "Four" ✓ (seen this pattern!)

Weird: "How many legs does a dog have 
       if you remove one leg?"
AI: Often says "Four" ❌
    (Pattern says "dogs = 4 legs")

Real thinking: Would say "Three"
Pattern matching: Stuck on "dogs = 4"
\`\`\`

## What AI Is Good At

**Seen Before:**
\`\`\`
"Write a poem about love"
AI: Excellent! ✓

Why? Trained on millions of love poems!
Just recombining patterns!
\`\`\`

**Common Patterns:**
\`\`\`
"Translate Hello to Spanish"
AI: "Hola" ✓

Seen this pattern thousands of times!
\`\`\`

## What AI Struggles With

**Novel Problems:**
\`\`\`
"If a rooster lays an egg on a roof,
which way will it roll?"

AI might say: "Down the slope"

Real answer: Roosters don't lay eggs! 🐓
AI missed the trick question!
\`\`\`

**Logic Chains:**
\`\`\`
"Alice is taller than Bob.
Bob is taller than Carol.
Who is shortest?"

AI: Often correct ✓ (common pattern)

But:
"Alice is taller than Bob.
Bob is shorter than Carol.
Carol is shorter than Dave.
Who is tallest?"

AI: Gets confused ❌ (less common pattern)
\`\`\`

## How Patterns Work

AI learned from examples:

\`\`\`
Saw: "The cat sat on the mat"
Learned: "cat" often comes with "sat"

Saw: "The dog ran in the park"  
Learned: "dog" often comes with "ran"

Now:
Input: "The cat ___"
AI: Probably "sat" (pattern match!)
\`\`\`

Not understanding - just statistics!

## The Parrot Problem

AI is like a very smart parrot:

\`\`\`
Parrot hears: "Hello" → "Hello!"
Gets treat → Learns pattern

AI sees: Question → Answer pattern
Gets reward → Learns pattern

Both: Pattern matching!
Neither: True understanding!
\`\`\`

## Where Reasoning Shows Up

Modern AI (GPT-4, Claude) shows SOME reasoning:

**Chain of Thought:**
\`\`\`
Without: "What's 25 × 13?"
AI: "325" ✓ or "312" ❌ (guess)

With reasoning:
AI: "Let me think step by step:
     25 × 10 = 250
     25 × 3 = 75
     250 + 75 = 325" ✓

Better! But still following "step pattern"!
\`\`\`

## Real vs Fake Reasoning

**Looks Like Reasoning:**
\`\`\`
"Explain why sky is blue"

AI: "Light scatters, shorter wavelengths..."

Impressive! But memorized pattern!
Read this explanation before!
\`\`\`

**Actually Reasoning:**
\`\`\`
"If sky was green, what would happen?"

AI struggles! No memorized pattern!
Has to actually THINK!
\`\`\`

## The Training Trick

AI learned patterns from:
- Books
- Websites  
- Code
- Conversations

Billions of examples!

\`\`\`
Saw enough examples of:
- Math problems → Answers
- Questions → Explanations
- Code bugs → Fixes

Can match new problems to old patterns!
\`\`\`

## When Patterns Fail

\`\`\`
Ask: "What's heavier, 1 kg of feathers
     or 1 kg of steel?"

Common mistake: "Steel" ❌
Why? Pattern: "steel = heavy"

Right answer: "Same weight" ✓
Requires thinking, not patterns!
\`\`\`

## Why This Matters

**Don't expect:**
- Novel inventions
- True creativity
- Deep understanding
- Breaking patterns

**Do expect:**
- Matching similar problems
- Combining known patterns
- Explaining common things
- Following examples

Know the limits!

## Summary

> **Reasoning vs Pattern-Following** = AI mostly matches patterns it learned from training. It can seem smart but struggles with truly novel problems. It's like a very advanced autocomplete!

**AI is like:**
- 📚 Student who memorized textbook (not understood it)
- 🦜 Smart parrot (repeats, doesn't understand)
- 🎯 Pattern matcher (finds similar examples)
- 🤖 Autocomplete on steroids (predicts likely text)

**The truth:**
\`\`\`
Reasoning: 20% (some!)
Patterns: 80% (mostly!)

Getting better! But not human-level thinking yet!
\`\`\`

**Practical tip:**
\`\`\`
Give AI examples!
Show patterns!
It learns by matching!

Don't expect it to figure out
completely new things!
\`\`\`

## What's Next?

AI doesn't truly understand.

Sometimes it makes stuff up!

Next: **Why Hallucinations Happen** - When AI confidently says wrong things!
`,
};

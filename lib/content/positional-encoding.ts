import { Article } from './types';

export const positionalEncoding: Article = {
  module: 1,
  slug: 'positional-encoding',
  title: 'Positional Encoding',
  description: 'How AI knows the order of words in a sentence',
  readTime: 4,
  previousTopic: { module: 1, slug: 'tokens-tokenization', title: '1. Tokens & Tokenization' },
  nextTopic: { module: 1, slug: 'transformers-architecture', title: '3. Transformers Architecture' },
  content: `# Positional Encoding

## The Problem

Look at these two sentences:

> "Dog bites man"

> "Man bites dog"

Same words. But **completely different meaning!**

Why? Because **order matters**.

![Positional Encoding in AI](/positional-embedding.jpg)

## The Big Problem with AI

AI (Transformers) looks at all words **at the same time**.

It does NOT read left to right like us.

So how does it know which word comes first?

**It doesn't! Unless we tell it.**

## What is Positional Encoding?

Positional Encoding = Telling AI the **position** of each word.

Think of it like **seat numbers** in a classroom.

- Word 1 sits at seat 1
- Word 2 sits at seat 2
- Word 3 sits at seat 3

Now AI knows the order!

## Simple Example

**Sentence:** "I love AI"

Without position:
> AI sees: {I, love, AI} - just a bag of words, no order

With position:
> AI sees: {I → position 1, love → position 2, AI → position 3}

Now AI knows "I" comes before "love" which comes before "AI".

## How Does It Work?

Each word gets two things:

1. **Word meaning** (from tokenization)
2. **Position number** (from positional encoding)

These are **added together**.

Final = Word Meaning + Position Info

## Real Life Example

Think of a **music playlist**:

- Song names = Word meanings
- Track numbers = Position encoding

Without track numbers, you just have random songs.
With track numbers, you have an **ordered playlist**.

## Why Not Just Use 1, 2, 3?

Good question!

Simple numbers (1, 2, 3) have problems:
- Numbers get very big for long sentences
- Hard for AI to learn patterns

So we use **special math formulas** (sin/cos waves).

These give:
- Small numbers (between -1 and 1)
- Unique pattern for each position
- AI can learn "3 is after 2" easily

## Key Points

- AI sees all words at once (no order)
- Positional encoding adds order information
- Each word gets: meaning + position
- Without it, "dog bites man" = "man bites dog" to AI

## Summary

> Positional Encoding = Giving each word a "seat number" so AI knows the order.

That's it. Simple!

## Next Step

Now you know:

- Tokenization (breaking text into pieces)
- Positional Encoding (adding order)

Next: Learn how Transformers use this information!
`,
};

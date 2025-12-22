import { Article } from './types';

export const tokensTokenization: Article = {
  module: 1,
  slug: 'tokens-tokenization',
  title: 'Tokens & Tokenization',
  description: 'Understanding how AI breaks text into tokens',
  readTime: 3,
  previousTopic: { module: 1, slug: 'fullstack-basics', title: 'Full Stack Basics' },
  nextTopic: { module: 2, slug: 'transformers-architecture', title: 'Transformers Architecture' },
  content: `# Tokens & Tokenization

## What is Tokenization?

Tokenization = breaking text into smaller pieces called **tokens**.

AI models don't understand text directly. They understand numbers.

So we convert text → tokens → numbers.

## What are Tokens?

Tokens can be:

- Whole words → "hello"
- Parts of words → "ing", "er", "un"
- Subwords → "super", "man"
- Single characters → "a", "?", "!"
- Even spaces → " "

## Simple Example

**Sentence:**
> "Where is my train?"

**Tokens:**
> "Where" | " is" | " my" | " train" | "?"

**Token IDs (numbers):**
> [1392, 618, 445, 9923, 30]

The model only sees these numbers, not the words.

## Why Tokenization?

1. AI needs numbers to work
2. Text → Tokens → Numbers
3. Model processes numbers
4. Numbers → Tokens → Text (output)

## Popular Tokenizers

- **BPE** (Byte Pair Encoding) - Used by GPT
- **SentencePiece** - Used by LLaMA
- **tiktoken** - OpenAI's fast tokenizer

## Key Point

> Tokenization is just splitting text into small pieces that AI can convert to numbers.

That's it. Simple.
`,
};

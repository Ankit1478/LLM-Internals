import { Article } from './types';

export const kvCache: Article = {
  module: 1,
  slug: 'kv-cache',
  title: 'KV Cache',
  description: 'Saving work to make text generation faster',
  readTime: 5,
  previousTopic: { module: 1, slug: 'alibi', title: '13. ALiBi (Linear Biases)' },
  nextTopic: { module: 1, slug: 'paged-attention', title: '15. PagedAttention' },
  content: `# KV Cache

## What is KV Cache?

KV Cache saves old work so you don't repeat it.

Like keeping notes instead of re-reading the whole book!

## The Problem

When AI writes text, it's SLOW.

Why? Let me show you:

\`\`\`
AI writes: "The cat"

Next word: "sat"
AI looks back at: "The" and "cat"

Next word: "on"
AI looks back at: "The", "cat", "sat"

Next word: "the"
AI looks back at: "The", "cat", "sat", "on"

See the problem?
Keep re-looking at same old words! 
Waste of time!
\`\`\`

## The Solution: Remember!

What if we save the old calculations?

\`\`\`
First time: Calculate for "The"
Save it! ✓

Next time: Need "The"?
Just use saved version!
Don't calculate again!

Much faster! ⚡
\`\`\`

That's KV Cache!

## Real-Life Example

Think about cooking:

\`\`\`
Bad way (No Cache):
Making soup.
Every time you add ingredient, 
start cutting ALL vegetables from scratch again!

Smart way (With Cache):
Cut vegetables once.
Keep them ready.
Just add to pot when needed!

KV Cache is like prep work!
\`\`\`

## What Gets Saved?

Remember attention has three parts?
- Query (Q)
- Key (K)  
- Value (V)

We save **K and V**!

Why not Q?
Q is for the NEW word being written.
K and V are for OLD words already written.

Old stuff = Save it!
New stuff = Calculate it!

## Visual Example

\`\`\`
Writing: "The cat sat"

Step 1: Write "The"
Calculate K,V for "The"
Save them in cache ✓

Step 2: Write "cat"
Get K,V for "The" from cache (fast!)
Calculate K,V for "cat"
Save "cat" K,V in cache ✓

Step 3: Write "sat"
Get K,V for "The" and "cat" from cache (fast!)
Calculate K,V for "sat"
Save "sat" K,V in cache ✓

Only calculate new word!
Reuse everything else!
\`\`\`

## How Much Faster?

MUCH faster!

\`\`\`
Without cache:
Writing 100 words = 5,000+ calculations

With cache:
Writing 100 words = 100 calculations

50× faster! 🚀
\`\`\`

## The Trade-Off

**Benefit:** Super fast!

**Cost:** Uses memory.

More words = More memory needed.

\`\`\`
1,000 words = ~10 MB memory
10,000 words = ~100 MB memory
100,000 words = ~1 GB memory!

Long conversations = Lots of memory!
\`\`\`

## Simple Diagram

\`\`\`mermaid
flowchart LR
    New["New Word<br/>'sat'"]
    
    subgraph Cache["KV Cache (Saved)"]
        K1["K for 'The'"]
        V1["V for 'The'"]
        K2["K for 'cat'"]
        V2["V for 'cat'"]
    end
    
    Calc["Calculate<br/>K,V for 'sat'"]
    Add["Add to Cache"]
    
    New --> Calc
    Calc --> Add
    Add --> Cache
    
    style New fill:#3b82f6,color:#fff
    style Cache fill:#22c55e,color:#fff
\`\`\`

## When Is It Used?

**During Text Generation!**

When the AI is:
- Chatting with you
- Writing a story
- Answering questions
- Completing your sentence

Every new word uses the cache!

## What It Looks Like

\`\`\`
Cache Storage:

Position 0 ("The"):  K=[...], V=[...]
Position 1 ("cat"):  K=[...], V=[...]
Position 2 ("sat"):  K=[...], V=[...]
Position 3 ("on"):   K=[...], V=[...]
...

Like a filing cabinet!
Each drawer = one word's K and V
\`\`\`

## Growing the Cache

\`\`\`
Start: Cache is empty []

Write "The": Cache = [The]
Write "cat": Cache = [The, cat]
Write "sat": Cache = [The, cat, sat]
Write "on":  Cache = [The, cat, sat, on]

Cache grows with each word!
\`\`\`

## Why K and V?

Quick reminder:

\`\`\`
K (Key) = "What I have"
V (Value) = "My meaning"

These don't change!
"The" always means "The"

Q (Query) = "What am I looking for?"
This changes for each new word!

Save unchanging parts = Smart!
\`\`\`

## Memory Per Word

For typical models:

\`\`\`
Each word stores:
- K: ~1 KB
- V: ~1 KB
Total: ~2 KB per word

1000 words = 2 MB ✓ Fine
10,000 words = 20 MB ✓ OK
100,000 words = 200 MB ⚠️ Big!
\`\`\`

This is why long conversations cost more!

## The Speed Trick

Without cache:

\`\`\`
Calculate everything:
Time = n² (very slow!)

n = 1000 words
Time = 1,000,000 operations 😰
\`\`\`

With cache:

\`\`\`
Calculate only new:
Time = n (fast!)

n = 1000 words
Time = 1,000 operations 😊

1000× faster!
\`\`\`

## Real ChatGPT Example

When you chat:

\`\`\`
You: "What's the weather?"
AI: "I don't have real-time data..."

Cache now holds:
- Your question
- AI's answer
(All the K and V values!)

You: "Okay, tell me a joke"
AI: Uses cached old messages!
      Only calculates for new message!

Each message is fast because of cache!
\`\`\`

## Batch Size = 1

During generation, we process **one word** at a time.

\`\`\`
Batch = How many things at once
Generation = Batch size 1 (one word)

Old words: From cache
New word: Calculate it

Very efficient!
\`\`\`

## Cache Lifetime

Cache lives during one conversation:

\`\`\`
Start chat → Create new cache
Chat continues → Cache grows
End chat → Delete cache

Next chat = Fresh cache!
\`\`\`

## Summary

> **KV Cache** = Save the Keys and Values from old words. When writing new words, reuse saved calculations instead of redoing everything. Makes generation 50× faster!

**Think of it like:**
- 💾 Saving game progress
- 📝 Keeping notes
- 🍳 Meal prep
- 💰 Saving money instead of re-buying

**The idea:**
\`\`\`
Old words: Use saved stuff (fast!)
New word: Calculate it (once!)
Save it for next time!
\`\`\`

**Why it matters:**
\`\`\`
No cache: Slow 🐌
With cache: Fast ⚡

Makes chatbots possible!
\`\`\`

## What's Next?

KV Cache is great but uses lots of memory.

What if we could use memory smarter?

Next: **PagedAttention** - Managing memory like you manage computer RAM!
`,
};

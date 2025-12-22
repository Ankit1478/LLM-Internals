import { Article } from './types';

export const pagedAttention: Article = {
  module: 1,
  slug: 'paged-attention',
  title: 'PagedAttention',
  description: 'Smart memory management for KV Cache - like managing books on shelves',
  readTime: 4,
  previousTopic: { module: 1, slug: 'kv-cache', title: '14. KV Cache' },
  nextTopic: { module: 1, slug: 'memory-implications', title: '16. Memory Implications' },
  content: `# PagedAttention

## What is PagedAttention?

PagedAttention makes KV Cache use less memory.

It's like organizing books on shelves smartly!

## The Problem with KV Cache

Remember KV Cache saves old words?

Problem: It wastes space!

\`\`\`
Old way:
Reserve space for 10,000 words.
Actually use: 1,000 words.
Wasted: 9,000 word spaces! 😰

Like booking a 10-room hotel 
but sleeping in only 1 room!
\`\`\`

## PagedAttention's Solution

Use small chunks called "pages"!

\`\`\`
Instead of: One giant block
Use: Many small blocks

Like: Many small boxes
instead of one huge container!
\`\`\`

## Book Shelf Example

**Old way (Waste):**
\`\`\`
Reserve entire shelf for one book series.
Series has 3 books.
Shelf fits 20 books.
17 empty spaces! ❌
\`\`\`

**PagedAttention (Smart):**
\`\`\`
Use small sections.
Book 1: Section A
Book 2: Section B  
Book 3: Section C
Other books use remaining sections! ✓
No waste!
\`\`\`

## How It Works

**Step 1: Break into Pages**

\`\`\`
Instead of saving all words together:
Save in small groups!

Page 1: Words 1-16
Page 2: Words 17-32
Page 3: Words 33-48
...

Small chunks!
\`\`\`

**Step 2: Use Only What You Need**

\`\`\`
Need 50 words?
Use 4 pages (holds 64 words)

Not: Reserve space for 10,000!

Much smarter!
\`\`\`

**Step 3: Share Empty Pages**

\`\`\`
User A done with page? 
Give it to User B!

Like returning library books!
Others can use them!
\`\`\`

## Simple Diagram

\`\`\`mermaid
graph TD
    subgraph "Old Way"
        B1["Big Block<br/>10,000 words<br/>❌ Wasteful"]
    end
    
    subgraph "PagedAttention"
        P1["Page 1<br/>16 words"]
        P2["Page 2<br/>16 words"]
        P3["Page 3<br/>16 words"]
        P4["..."]
    end
    
    B1 -.Wastes memory.-> P1
    P1 --> P2 --> P3 --> P4
    
    style B1 fill:#ef4444,color:#fff
    style P1 fill:#22c55e,color:#fff
    style P2 fill:#22c55e,color:#fff
    style P3 fill:#22c55e,color:#fff
\`\`\`

## Memory Savings

Real numbers:

\`\`\`
Old way:
10 users × 10,000 word spaces = 100,000 spaces
Actually using: 10,000 words total
Waste: 90%! 😱

PagedAttention:
10 users × actual words used = 10,000 spaces
Waste: Almost 0%! 😊

10× more efficient!
\`\`\`

## Pages Are Fixed Size

\`\`\`
Each page: 16 words (example)

1 word? Use 1 page
20 words? Use 2 pages  
100 words? Use 7 pages

Round up to nearest page!
\`\`\`

## Why This Helps

**Better Memory Use:**
- No huge reservations
- Use what you need
- Return what you don't

**Serve More Users:**
- Same memory
- 10× more people!
- Or longer conversations!

**Flexibility:**
- Short chat: Few pages
- Long chat: Many pages
- Automatic!

## Real Example

\`\`\`
ChatGPT serving users:

User 1: "Hi" (1 page)
User 2: Long essay (20 pages)
User 3: "What's 2+2?" (1 page)

Old system: 
Reserve 1000 pages × 3 users = 3000 pages!

PagedAttention:
Use: 1 + 20 + 1 = 22 pages!

Save: 99% memory!
\`\`\`

## Like Computer RAM

Your computer does this!

\`\`\`
Programs don't get all RAM.
They get "pages" of RAM.

Same idea!
Proven to work!

PagedAttention = RAM management for AI!
\`\`\`

## The Page Table

Keep track with a table:

\`\`\`
User A's words:
Words 1-16: Page 5
Words 17-32: Page 12
Words 33-48: Page 3

Like a map!
"Where is each chunk?"
\`\`\`

## Benefits

**1. Less Waste**
- Use exact amount needed
- No giant reservations

**2. More Users**
- Same hardware
- Serve 10× people!

**3. Dynamic**
- Grow as conversation grows
- Shrink when done

**4. Fair Sharing**
- Everyone gets what they need
- No hogging!

## Where Used

\`\`\`
vLLM: Uses PagedAttention! ✓
(Fast inference server)

Makes serving AI cheaper!
Companies love it!
\`\`\`

## Comparison

| Method | Memory Use | Users Served |
|--------|-----------|--------------|
| **Old way** | High waste | Few users |
| **PagedAttention** | Efficient | Many users! |

Clear winner!

## The Trick

\`\`\`
Instead of:
"Give me space for MAX possible"

Say:
"Give me space as I need it"

Simple but powerful!
\`\`\`

## Summary

> **PagedAttention** = Break KV Cache into small pages. Use only pages you need. Share unused pages with others. Saves 10× memory!

**Think of it like:**
- 📚 Library books (borrow and return)
- 🗄️ Filing cabinet (use drawers as needed)
- 🏨 Hotel rooms (book what you use)
- 💾 Computer RAM (page management)

**The big win:**
\`\`\`
Old: Reserve max space
New: Use what you need

Same users: 10× less memory!
Or: 10× more users!
\`\`\`

## What's Next?

PagedAttention saves memory.

But how much memory do these models really need?

Next: **Memory Implications** - Understanding the true memory cost of running LLMs!
`,
};

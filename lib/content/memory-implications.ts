import { Article } from './types';

export const memoryImplications: Article = {
  module: 1,
  slug: 'memory-implications',
  title: 'Memory Implications',
  description: 'How much memory AI models really need and why',
  readTime: 5,
  previousTopic: { module: 1, slug: 'paged-attention', title: '15. PagedAttention' },
  nextTopic: { module: 1, slug: 'context-window', title: '17. Context Window vs Working Memory' },
  content: `# Memory Implications

## How Much Memory Do AI Models Need?

A LOT!

Let me show you why.

## The Basic Math

Each number the AI stores needs space.

\`\`\`
One number = 2 bytes (usually)
One million numbers = 2 MB
One billion numbers = 2 GB

Big models have BILLIONS of numbers!
\`\`\`

## Model Size Examples

\`\`\`
GPT-2 Small:
- 125 million parameters
- Memory needed: 250 MB ✓

GPT-3:
- 175 billion parameters  
- Memory needed: 350 GB! 😰

Llama 2 70B:
- 70 billion parameters
- Memory needed: 140 GB! 😰
\`\`\`

That's a lot!

## Why So Much?

### 1. The Model Itself

\`\`\`
All those weights (learned numbers):
- Attention layers
- Feed-forward layers
- Embeddings

Each needs storage!
\`\`\`

### 2. During Use

Need even MORE memory:

\`\`\`
Model weights: 140 GB
+ KV Cache: 50 GB
+ Activations: 20 GB
+ Gradients (training): 140 GB

Total: 350 GB!
\`\`\`

## Real Example: ChatGPT

\`\`\`
When you chat:

Your message: "Hello"
AI's response: Needs to load model

Model in memory: ~350 GB
(That's why it runs on powerful servers!)

Your laptop: 8-16 GB RAM
Not enough! ❌
\`\`\`

## The KV Cache Problem

Remember: Cache grows with conversation!

\`\`\`
Short chat (100 words):
KV Cache: ~1 MB ✓

Medium chat (1,000 words):
KV Cache: ~10 MB ✓

Long chat (10,000 words):
KV Cache: ~100 MB ⚠️

Very long (100,000 words):
KV Cache: ~1 GB! 😱
\`\`\`

## Serving Many Users

Big problem for companies:

\`\`\`
1 user: 350 GB
10 users: 350 GB (can share model!)
       + 10 GB (separate KV caches)

100 users: 350 GB (shared model)
        + 100 GB (100 KV caches)

1000 users: 350 GB (shared model)
         + 1,000 GB (1000 caches!) 😰

KV Cache adds up fast!
\`\`\`

## Why Companies Use GPUs

GPUs have fast memory!

\`\`\`
GPU memory: Very fast, but expensive
- A100 GPU: 80 GB at $10,000+
- H100 GPU: 80 GB at $30,000+

Regular RAM: Slower, cheaper
- Won't work for AI (too slow!)

Need multiple GPUs for big models!
\`\`\`

## Cost Breakdown

\`\`\`
Running GPT-3 level model:

Hardware:
- 8 × A100 GPUs ($80,000)
- High-end server ($20,000)
- Total: $100,000+

Electricity:
- Per day: $50+
- Per year: $18,000+

Expensive! 💸
\`\`\`

## Making It Smaller

People found tricks:

### 1. Quantization

\`\`\`
Normal: Each number = 16 bits
Quantized: Each number = 8 bits

Model size: Cut in half!
140 GB → 70 GB ✓

Quality: Slightly worse
Speed: Faster!
\`\`\`

### 2. Pruning

\`\`\`
Remove unimportant connections!

Like trimming a tree:
Still works, uses less space!

Can save 30-50% memory!
\`\`\`

### 3. Smaller Models

\`\`\`
Not everyone needs GPT-3!

Smaller models:
- GPT-2: 250 MB (fits on phone!)
- Llama 7B: 14 GB (single GPU!)
- Mistral 7B: 14 GB (fits laptop!)

Pick size you need!
\`\`\`

## Why Mobile Is Hard

\`\`\`
iPhone memory: 6-8 GB
GPT-3: 350 GB

Can't fit! ❌

Solutions:
- Use small models (2-7B)
- Run in cloud
- Edge computing

Most AI = Cloud based!
\`\`\`

## Training vs Inference

Different memory needs:

\`\`\`
Training (learning):
- Model: 140 GB
- Gradients: 140 GB
- Optimizer: 280 GB
- Activations: 100 GB
Total: 660 GB! 😱

Inference (using):
- Model: 140 GB
- KV Cache: 10 GB
- Activations: 5 GB
Total: 155 GB

Training needs 4× more!
\`\`\`

## Context Length Impact

Longer context = More memory!

\`\`\`
2,000 tokens: 10 GB
10,000 tokens: 50 GB
100,000 tokens: 500 GB! 😰

Why Claude 2 (100K context) is expensive!
\`\`\`

## The Trade-offs

\`\`\`
Want:
- Big model (smart)
- Long context (remember more)
- Fast responses (quick)
- Cheap (affordable)

Pick 2! Can't have all 4!
\`\`\`

## Future Solutions

People working on:

**1. Better Compression**
- Store numbers smarter
- Less memory per parameter

**2. Sparse Models**
- Only use parts you need
- Rest stays dormant

**3. New Hardware**
- Specialized AI chips
- More memory, cheaper

**4. Clever Algorithms**
- Flash Attention
- PagedAttention (we learned!)
- More to come!

Getting better every year!

## Summary

> **Memory Implications** = AI models are HUGE and need tons of memory. KV Cache adds more. This is why AI runs on expensive servers, not your phone!

**Key Points:**
- 💾 Models = 100s of GB
- 📈 Cache grows with conversation
- 💰 Needs expensive GPUs
- 🔬 Research finding solutions
- 📱 Mobile AI = small models only

**The reality:**
\`\`\`
Big AI = Big memory
Big memory = Expensive
That's why:
- ChatGPT costs money
- APIs charge per token
- Companies need funding

But getting cheaper over time!
\`\`\`

## What's Next?

We talked about memory for whole conversations.

But what about how the AI "thinks" during that conversation?

Next: **Context Window vs Working Memory** - Understanding what AI can "remember" vs what it can "think about"!
`,
};

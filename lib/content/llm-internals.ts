import { Article } from './types';

export const llmInternals: Article = {
  module: 1,
  slug: 'llm-internals',
  title: 'LLM Internals',
  description: 'Deep dive into how Large Language Models work internally',
  readTime: 10,
  previousTopic: { module: 1, slug: 'fullstack-basics', title: 'Full Stack Basics' },
  content: `# LLM Internals

## Topics Covered

- Tokens & Tokenization (BPE, SentencePiece, tiktoken)
- Transformers Architecture (Block by block)
- Self-Attention Mechanism (Q, K, V matrices)
- Multi-Head Attention
- Feed-Forward Networks
- Layer Normalization
- Residual Connections
- Positional Encoding
- Attention Mechanics & Complexity (O(n²))
- Causal Masking
- KV Cache (Key-Value Cache)
- PagedAttention (vLLM innovation)
- Memory Implications
- Context Window vs Working Memory
- Context Decay & Lost-in-the-Middle Problem
- Needle-in-Haystack Tests
- RoPE (Rotary Position Embedding)
- ALiBi (Attention with Linear Biases)
- Multi-Query Attention
- Reasoning vs Pattern-Following
- Why Hallucinations Happen
- Prompt Context Dynamics
- Instruction Following vs Completion
`,
};

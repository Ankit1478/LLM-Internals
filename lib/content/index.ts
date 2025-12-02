// Content index - imports all articles and exports them

import { Article, Module } from './types';
import { introduction } from './introduction';
import { quickStart } from './quick-start';
import { fullstackBasics } from './fullstack-basics';
import { llmInternals } from './llm-internals';
import { tokensTokenization } from './tokens-tokenization';
import { positionalEncoding } from './positional-encoding';
import { transformersArchitecture } from './transformers-architecture';
import { selfAttention } from './self-attention';
import { multiHeadAttention } from './multi-head-attention';
import { feedForwardNetworks } from './feed-forward-networks';
import { layerNormalization } from './layer-normalization';
import { residualConnections } from './residual-connections';
import { attentionComplexity } from './attention-complexity';
import { causalMasking } from './causal-masking';
import { multiQueryAttention } from './multi-query-attention';
import { basicConcepts } from './basic-concepts';
import { advancedTopics } from './advanced-topics';
import { codeExamples } from './code-examples';

// Re-export types
export type { Article, Module };

// All articles mapped by slug
const articles: Record<string, Article> = {
  'introduction': introduction,
  'quick-start': quickStart,
  'fullstack-basics': fullstackBasics,
  'llm-internals': llmInternals,
  'tokens-tokenization': tokensTokenization,
  'positional-encoding': positionalEncoding,
  'transformers-architecture': transformersArchitecture,
  'self-attention': selfAttention,
  'multi-head-attention': multiHeadAttention,
  'feed-forward-networks': feedForwardNetworks,
  'layer-normalization': layerNormalization,
  'residual-connections': residualConnections,
  'attention-complexity': attentionComplexity,
  'causal-masking': causalMasking,
  'multi-query-attention': multiQueryAttention,
  'basic-concepts': basicConcepts,
  'advanced-topics': advancedTopics,
  'code-examples': codeExamples,
};

// Docs Roadmap - Modules and Topics
export const docsRoadmap: Module[] = [
  {
    module: 0,
    title: 'Getting Started',
    topics: [
      { title: 'Introduction', slug: 'introduction' },
      { title: 'Quick Start Guide', slug: 'quick-start' },
    ]
  },
  {
    module: 1,
    title: 'Complete Basics of Full Stack',
    topics: [
      { title: 'Full Stack Basics', slug: 'fullstack-basics' },
    ]
  },
  {
    module: 2,
    title: 'LLM Internals',
    topics: [
      // 1. Basics - Start here
      { title: '1. Tokens & Tokenization', slug: 'tokens-tokenization' },
      { title: '2. Positional Encoding', slug: 'positional-encoding' },

      // 2. Transformer Architecture
      { title: '3. Transformers Architecture', slug: 'transformers-architecture' },
      { title: '4. Self-Attention Mechanism', slug: 'self-attention' },
      { title: '5. Multi-Head Attention', slug: 'multi-head-attention' },
      { title: '6. Feed-Forward Networks', slug: 'feed-forward-networks' },
      { title: '7. Layer Normalization', slug: 'layer-normalization' },
      { title: '8. Residual Connections', slug: 'residual-connections' },

      // 3. Attention Deep Dive
      { title: '9. Attention Mechanics & Complexity', slug: 'attention-complexity' },
      { title: '10. Causal Masking', slug: 'causal-masking' },
      { title: '11. Multi-Query Attention', slug: 'multi-query-attention' },

      // 4. Position Embeddings
      { title: '12. RoPE (Rotary Position)', slug: 'rope' },
      { title: '13. ALiBi (Linear Biases)', slug: 'alibi' },

      // 5. Memory & Optimization
      { title: '14. KV Cache', slug: 'kv-cache' },
      { title: '15. PagedAttention', slug: 'paged-attention' },
      { title: '16. Memory Implications', slug: 'memory-implications' },

      // 6. Context & Limitations
      { title: '17. Context Window vs Working Memory', slug: 'context-window' },
      { title: '18. Context Decay & Lost-in-the-Middle', slug: 'context-decay' },
      { title: '19. Needle-in-Haystack Tests', slug: 'needle-haystack' },

      // 7. Behavior & Understanding
      { title: '20. Reasoning vs Pattern-Following', slug: 'reasoning-patterns' },
      { title: '21. Why Hallucinations Happen', slug: 'hallucinations' },
      { title: '22. Prompt Context Dynamics', slug: 'prompt-context' },
      { title: '23. Instruction Following vs Completion', slug: 'instruction-completion' },
    ]
  },
];

// Helper functions
export function getArticle(slug: string): Article | undefined {
  return articles[slug];
}

export function getAllArticles(): Article[] {
  return Object.values(articles);
}

export function getModuleTopics(moduleNum: number): { title: string; slug: string }[] {
  const module = docsRoadmap.find(m => m.module === moduleNum);
  return module?.topics || [];
}

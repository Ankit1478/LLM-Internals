// Content index - imports all articles and exports them

import { Article, Module, SubModule, Topic } from './types';
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
import { rope } from './rope';
import { alibi } from './alibi';
import { kvCache } from './kv-cache';
import { pagedAttention } from './paged-attention';
import { memoryImplications } from './memory-implications';
import { contextWindow } from './context-window';
import { contextDecay } from './context-decay';
import { needleHaystack } from './needle-haystack';
import { reasoningPatterns } from './reasoning-patterns';
import { hallucinations } from './hallucinations';
import { promptContext } from './prompt-context';
import { instructionCompletion } from './instruction-completion';
import { basicConcepts } from './basic-concepts';
import { advancedTopics } from './advanced-topics';
import { codeExamples } from './code-examples';
import { whatIsAiAgent } from './what-is-ai-agent';
import { agentVsPromptVsWorkflow } from './agent-vs-prompt-vs-workflow';
import { agentLifecycle } from './agent-lifecycle';
import { agentEnvironmentState } from './agent-environment-state';
import { deterministicVsProbabilistic } from './deterministic-vs-probabilistic';
import { statelessVsStateful } from './stateless-vs-stateful';
import { reactPattern } from './react-pattern';
import { thoughtActionObservation } from './thought-action-observation';
import { toolFirstExecution } from './tool-first-execution';
import { planningVsExecution } from './planning-vs-execution';
import { plannerWorkerArchitecture } from './planner-worker-architecture';
import { reactiveVsDeliberative } from './reactive-vs-deliberative';
import { agentStateMachines } from './agent-state-machines';
import { explicitVsImplicitState } from './explicit-vs-implicit-state';
import { transitionGuards } from './transition-guards';
import { errorStatesRecovery } from './error-states-recovery';
import { loopDetectionTermination } from './loop-detection-termination';
import { memoryInAgents } from './memory-in-agents';
import { agentRoles } from './agent-roles';
import { supervisorAgent } from './supervisor-agent';
import { workerAgents } from './worker-agents';
import { planningAgent } from './planning-agent';
import { memoryAgent } from './memory-agent';
import { evaluationAgent } from './evaluation-agent';
import { verificationAgent } from './verification-agent';
import { reflectionAgent } from './reflection-agent';
import { multiAgentCommunication } from './multi-agent-communication';
import { messagePassing } from './message-passing';
import { sharedMemory } from './shared-memory';
import { eventBus } from './event-bus';
import { stateSynchronization } from './state-synchronization';
import { multiAgentPatterns } from './multi-agent-patterns';
import { sequentialPipeline } from './sequential-pipeline';
import { parallelExecution } from './parallel-execution';
import { hierarchicalPattern } from './hierarchical-pattern';
import { collaborativePattern } from './collaborative-pattern';
import { langgraph } from './langgraph';
import { autogen } from './autogen';
import { crewai } from './crewai';
import { vercelAiSdk } from './vercel-ai-sdk';

// Re-export types
export type { Article, Module, SubModule, Topic };

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
  'rope': rope,
  'alibi': alibi,
  'kv-cache': kvCache,
  'paged-attention': pagedAttention,
  'memory-implications': memoryImplications,
  'context-window': contextWindow,
  'context-decay': contextDecay,
  'needle-haystack': needleHaystack,
  'reasoning-patterns': reasoningPatterns,
  'hallucinations': hallucinations,
  'prompt-context': promptContext,
  'instruction-completion': instructionCompletion,
  'basic-concepts': basicConcepts,
  'advanced-topics': advancedTopics,
  'code-examples': codeExamples,
  'what-is-ai-agent': whatIsAiAgent,
  'agent-vs-prompt-vs-workflow': agentVsPromptVsWorkflow,
  'agent-lifecycle': agentLifecycle,
  'agent-environment-state': agentEnvironmentState,
  'deterministic-vs-probabilistic': deterministicVsProbabilistic,
  'stateless-vs-stateful': statelessVsStateful,
  'react-pattern': reactPattern,
  'thought-action-observation': thoughtActionObservation,
  'tool-first-execution': toolFirstExecution,
  'planning-vs-execution': planningVsExecution,
  'planner-worker-architecture': plannerWorkerArchitecture,
  'reactive-vs-deliberative': reactiveVsDeliberative,
  'agent-state-machines': agentStateMachines,
  'explicit-vs-implicit-state': explicitVsImplicitState,
  'transition-guards': transitionGuards,
  'error-states-recovery': errorStatesRecovery,
  'loop-detection-termination': loopDetectionTermination,
  'memory-in-agents': memoryInAgents,
  'agent-roles': agentRoles,
  'supervisor-agent': supervisorAgent,
  'worker-agents': workerAgents,
  'planning-agent': planningAgent,
  'memory-agent': memoryAgent,
  'evaluation-agent': evaluationAgent,
  'verification-agent': verificationAgent,
  'reflection-agent': reflectionAgent,
  'multi-agent-communication': multiAgentCommunication,
  'message-passing': messagePassing,
  'shared-memory': sharedMemory,
  'event-bus': eventBus,
  'state-synchronization': stateSynchronization,
  'multi-agent-patterns': multiAgentPatterns,
  'sequential-pipeline': sequentialPipeline,
  'parallel-execution': parallelExecution,
  'hierarchical-pattern': hierarchicalPattern,
  'collaborative-pattern': collaborativePattern,
  'langgraph': langgraph,
  'autogen': autogen,
  'crewai': crewai,
  'vercel-ai-sdk': vercelAiSdk,
};

// Docs Roadmap - Modules and Topics
export const docsRoadmap: Module[] = [
  {
    module: 0,
    title: 'Complete Basics of Full Stack',
    topics: [
      { title: 'Full Stack Basics', slug: 'fullstack-basics' },
    ]
  },
  {
    module: 1,
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
  {
    module: 2,
    title: 'Agents',
    subModules: [
      {
        title: 'Core Agent Patterns',
        topics: [
          { title: 'ReAct: Reason → Act Loop', slug: 'react-pattern' },
          { title: 'Thought-Action-Observation Loop', slug: 'thought-action-observation' },
          { title: 'Tool-First Execution', slug: 'tool-first-execution' },
          { title: 'Planner + Worker Architecture', slug: 'planner-worker-architecture' },
          { title: 'Memory in Agents', slug: 'memory-in-agents' },
          { title: 'State Machines for Agents', slug: 'agent-state-machines' },
        ]
      },
      {
        title: 'Multi-Agent Systems',
        topics: [
          { title: 'Agent Roles', slug: 'agent-roles' },
          { title: 'Supervisor Agent', slug: 'supervisor-agent' },
          { title: 'Worker Agents', slug: 'worker-agents' },
          { title: 'Planning Agent', slug: 'planning-agent' },
          { title: 'Memory Agent', slug: 'memory-agent' },
          { title: 'Evaluation Agent', slug: 'evaluation-agent' },
          { title: 'Verification Agent', slug: 'verification-agent' },
          { title: 'Reflection Agent', slug: 'reflection-agent' },
          { title: 'Multi-Agent Communication', slug: 'multi-agent-communication' },
          { title: 'Message Passing', slug: 'message-passing' },
          { title: 'Shared Memory', slug: 'shared-memory' },
          { title: 'Event Bus', slug: 'event-bus' },
          { title: 'State Synchronization', slug: 'state-synchronization' },
          { title: 'Multi-Agent Patterns', slug: 'multi-agent-patterns' },
          { title: 'Sequential Pipeline', slug: 'sequential-pipeline' },
          { title: 'Parallel Execution', slug: 'parallel-execution' },
          { title: 'Hierarchical', slug: 'hierarchical-pattern' },
          { title: 'Collaborative (Debate & Consensus)', slug: 'collaborative-pattern' },
        ]
      },
      {
        title: 'Agent Frameworks',
        topics: [
          { title: 'LangGraph', slug: 'langgraph' },
          { title: 'AutoGen (Microsoft)', slug: 'autogen' },
          { title: 'CrewAI (Role-Based)', slug: 'crewai' },
          { title: 'Vercel AI SDK (Streaming-First)', slug: 'vercel-ai-sdk' },
        ]
      },
      {
        title: 'Agent OS Concepts',
        topics: [
          { title: 'Durable Execution', slug: 'durable-execution' },
          { title: 'Event-Driven Agents', slug: 'event-driven-agents' },
          { title: 'State Checkpointing', slug: 'state-checkpointing' },
          { title: 'Task Graph Execution (DAG)', slug: 'task-graph-dag' },
          { title: 'Agent Logs & Traces', slug: 'agent-logs-traces' },
          { title: 'Multi-Agent Orchestration Engine', slug: 'orchestration-engine' },
          { title: 'Chain, Router, Parallelizer, Loop Patterns', slug: 'orchestration-patterns' },
          { title: 'Human-in-the-Loop', slug: 'human-in-the-loop' },
        ]
      },
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

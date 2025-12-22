import { Article } from './types';

export const hallucinations: Article = {
  module: 1,
  slug: 'hallucinations',
  title: 'Why Hallucinations Happen',
  description: 'Why AI makes up confident-sounding nonsense',
  readTime: 5,
  previousTopic: { module: 1, slug: 'reasoning-patterns', title: '20. Reasoning vs Pattern-Following' },
  nextTopic: { module: 1, slug: 'prompt-context', title: '22. Prompt Context Dynamics' },
  content: `# Why Hallucinations Happen

## What Are Hallucinations?

When AI makes stuff up!

Says things confidently... that are totally wrong!

## Simple Example

\`\`\`
You: "Who was the first person on Mars?"

AI: "John Smith landed on Mars in 2019"

Wrong! No one has been to Mars yet!
But AI sounds so confident!
\`\`\`

That's a hallucination!

## Why Does This Happen?

AI doesn't "know" anything.

It just predicts next words!

\`\`\`
Sees: "The first person on"
Thinks: "Moon" or "Mars" both fit pattern!
Picks: Mars (sounds good!)
Adds: Made-up name and date
Result: Confident nonsense!
\`\`\`

## The Prediction Game

AI plays "what word comes next?"

\`\`\`
Input: "The capital of France is"
AI: "_____"

Seen this pattern before!
Answer: "Paris" ✓ (correct!)

Input: "The capital of Spoopland is"
AI: "_____"

Never seen "Spoopland" before!
Makes up: "Florbia" ❌ (hallucination!)
\`\`\`

No understanding. Just word prediction!

## Why It Sounds Confident

AI doesn't know when it's wrong!

\`\`\`
True fact: "Water freezes at 0°C"
Confidence: 100%

Made-up fact: "Unicorns live in Canada"
Confidence: 100%

Can't tell the difference!
\`\`\`

Always sounds sure!

## Common Hallucinations

### 1. Fake Facts
\`\`\`
"Studies show that sleeping 2 hours
per day is optimal for health"

No such studies! Made it up!
\`\`\`

### 2. False Citations
\`\`\`
"According to Smith et al. (2018)..."

Paper doesn't exist!
Author doesn't exist!
All made up!
\`\`\`

### 3. Fake Numbers
\`\`\`
"The population of Tokyo is 52 million"

Real: ~14 million
AI: Just guessed a big number!
\`\`\`

### 4. Made-up Events
\`\`\`
"In 2020, elephants discovered electricity"

Never happened!
Sounds ridiculous!
But AI said it confidently!
\`\`\`

## Why It Happens

### 1. Pattern Completion

\`\`\`
Training saw:
"Einstein discovered ___" → relativity
"Newton discovered ___" → gravity
"Darwin discovered ___" → evolution

Never saw:
"Bob discovered ___" → ???

So AI makes up: "Bob discovered time travel"
Fills the pattern!
\`\`\`

### 2. No Truth Check

\`\`\`
AI has no way to verify facts!

Can't Google it
Can't check sources
Can't say "I don't know"

Just predicts words that fit!
\`\`\`

### 3. Training Noise

\`\`\`
Trained on internet = Lots of wrong info!

Saw wrong facts
Saw conspiracy theories
Saw jokes taken seriously

Learned bad patterns!
\`\`\`

### 4. Forced to Answer

\`\`\`
User asks question
AI must respond (designed to!)
Doesn't have answer
Makes one up!

Can't stay silent!
\`\`\`

## Real Examples

\`\`\`
Ask: "Tell me about the Loch Ness Monster's diet"

Good answer: "Loch Ness Monster isn't real"

Hallucination: "The Loch Ness Monster 
primarily eats salmon and trout..."

Made it all up! Because pattern matched
"animal diet" responses!
\`\`\`

## The Math Connection

Remember: AI is just math!

\`\`\`
Word probability:
"Paris" after "France capital": 99%
"Florbia" after "Spoopland capital": ???

No data = AI guesses
Guess = Hallucination!
\`\`\`

## When It's Worst

### Long Responses
\`\`\`
Short answer: Less room to hallucinate
Long essay: More chances to make stuff up!

Each sentence = Risk of error
More sentences = More risk!
\`\`\`

### Creative Tasks
\`\`\`
Write story: Hallucinations OK! (fiction)
State facts: Hallucinations BAD! (need truth)

Creative = Makes stuff up on purpose!
\`\`\`

### Topics It Hasn't Seen
\`\`\`
Common topic (Python): Accurate ✓
Rare topic (Obscure science): Hallucinates ❌

Less training data = More guessing!
\`\`\`

## How to Reduce Hallucinations

### 1. Be Specific
\`\`\`
Vague: "Tell me about quantum physics"
Better: "Explain quantum entanglement,
        and say 'I don't know' if unsure"

Give AI permission to admit ignorance!
\`\`\`

### 2. Ask for Sources
\`\`\`
"Provide facts with sources"

Can't cite real source?
Might hesitate to hallucinate!
\`\`\`

### 3. Verify Important Info
\`\`\`
AI said it? Double-check it!

Especially:
- Numbers
- Dates
- Citations
- Technical details

Don't trust blindly!
\`\`\`

### 4. Use Shorter Responses
\`\`\`
Long essay = More hallucinations
Brief answer = Fewer chances to err

Keep it short!
\`\`\`

## Why Can't They Fix It?

Hard problem!

\`\`\`
To fix: AI needs to "know" what's true
But: AI just predicts patterns
Doesn't understand truth!

Like asking parrot to fact-check itself
Parrot just repeats!
\`\`\`

Getting better but not solved!

## Recent Improvements

Newer models better:

\`\`\`
GPT-3: Hallucinated ~30% of facts
GPT-4: Hallucinated ~15% of facts

Better! But still happens!

Claude, Gemini: Also improving
But none are perfect!
\`\`\`

## The Fundamental Issue

\`\`\`
AI = Pattern matcher
Truth = Requires understanding
Pattern ≠ Understanding

Pattern: "Question needs answer"
Truth: "Some questions have no answer"

Mismatch!
\`\`\`

Can't fully fix without changing
how AI fundamentally works!

## Summary

> **Hallucinations** = AI making up false information confidently because it's just predicting words, not understanding truth. It fills patterns even when it doesn't know the answer!

**Why it happens:**
- 🎯 Just predicting likely words
- ❌ No way to verify truth  
- 📚 Learned from imperfect data
- 🔊 Must always answer (can't say "I don't know" easily)

**The core problem:**
\`\`\`
AI sees: "Question: ___?"
Pattern: "Must provide answer!"
No answer known? Makes one up!

Confident nonsense!
\`\`\`

**What to do:**
- ✅ Verify important facts
- ✅ Ask for sources
- ✅ Be specific
- ✅ Keep responses short
- ❌ Don't trust blindly!

## What's Next?

AI's behavior depends a LOT on how you ask!

The question matters as much as the answer!

Next: **Prompt Context Dynamics** - How your words shape AI's responses!
`,
};

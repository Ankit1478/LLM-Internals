import { Article } from './types';

export const alibi: Article = {
  module: 1,
  slug: 'alibi',
  title: 'ALiBi (Attention with Linear Biases)',
  description: 'The simplest way to help AI understand word positions',
  readTime: 4,
  previousTopic: { module: 1, slug: 'rope', title: '12. RoPE (Rotary Position)' },
  nextTopic: { module: 1, slug: 'kv-cache', title: '14. KV Cache' },
  content: `# ALiBi - Attention with Linear Biases

## What is ALiBi?

ALiBi is the **easiest way** to tell the AI where words are.

It's so simple: Just subtract small numbers!

## The Big Idea

Words that are far apart get a penalty.

Words that are close together? No penalty!

That's it. Really!

## How Simple Is It?

Let me show you:

\`\`\`
Word 1 looks at Word 1: Distance = 0, Penalty = 0
Word 1 looks at Word 2: Distance = 1, Penalty = -1
Word 1 looks at Word 3: Distance = 2, Penalty = -2
Word 1 looks at Word 4: Distance = 3, Penalty = -3

Farther away = Bigger penalty!
\`\`\`

Easy, right?

## Example: Reading a Page

Imagine you're reading a book:

\`\`\`
You're on word #5.

Word #4 (right before): Very easy to remember! (Distance: 1)
Word #3 (two words back): Still fresh! (Distance: 2)
Word #1 (first word): Harder to remember! (Distance: 4)

ALiBi does this:
Close words: Easy to use (small penalty)
Far words: Harder to use (big penalty)
\`\`\`

This feels natural!

## Visual Example

\`\`\`
Sentence: "The cat sat on mat"

Word "mat" (position 5) looking at other words:

"on"  (position 4): Distance 1 → Penalty -1  ✓ Close!
"sat" (position 3): Distance 2 → Penalty -2  ✓ Still OK
"cat" (position 2): Distance 3 → Penalty -3  ⚠️ Getting far
"The" (position 1): Distance 4 → Penalty -4  ⚠️ Very far!

Nearby words are easier to pay attention to!
\`\`\`

## Compare to Other Methods

### Old Way (Adding Position Info)

\`\`\`
Each position gets special code.
Must learn what code means.
Complicated!
\`\`\`

### RoPE (Rotating)

\`\`\`
Rotate each word based on position.
Works great!
But needs some math.
\`\`\`

### ALiBi (This One!)

\`\`\`
Just subtract distance!
No learning needed.
Super simple!
\`\`\`

## The Actual Math

Don't be scared - it's very simple:

\`\`\`
score = score - (distance × 0.5)

Example:
Original attention score: 10
Distance: 3 words away
Penalty: 3 × 0.5 = 1.5
New score: 10 - 1.5 = 8.5

Close words keep high scores.
Far words get lower scores.
\`\`\`

## Why This Works

Think about talking to someone:

\`\`\`
"I went to the store and bought milk"

When you hear "bought", you remember:
- "store" easily (just said it!)
- "went" (a bit harder)
- "I" (even harder)

ALiBi copies how our brain works!
\`\`\`

## The Pattern

\`\`\`mermaid
graph LR
    W1["Word 1<br/>Penalty: 0"]
    W2["Word 2<br/>Penalty: -1"]
    W3["Word 3<br/>Penalty: -2"]
    W4["Word 4<br/>Penalty: -3"]
    W5["Word 5<br/>Penalty: -4"]
    
    W1 --> W2 --> W3 --> W4 --> W5
    
    style W1 fill:#22c55e,color:#fff
    style W3 fill:#f59e0b,color:#fff
    style W5 fill:#ef4444,color:#fff
\`\`\`

Green = Close (good!)
Orange = Medium distance
Red = Far away

## Big Benefit: Works on Long Text!

Here's the magic:

\`\`\`
Trained on 1000 words?
Works on 10,000 words!
Works on 100,000 words!

Why? Distance is distance.
10 words apart is always 10 words apart.
\`\`\`

It just keeps working!

## Different Slopes for Different Heads

Remember multi-head attention? (8 different "readers")

Each head gets a different penalty:

\`\`\`
Head 1: Distance × 0.5 (gentle slope)
Head 2: Distance × 1.0 (medium slope)
Head 3: Distance × 2.0 (steep slope)

Gentle slope: Looks far away
Steep slope: Focuses nearby

All 8 heads work together!
\`\`\`

## Real Example

\`\`\`
"My dog loves playing with his ball"

Word "ball" looking back:

"his" (1 away):  Penalty -0.5  → Score stays high ✓
"with" (2 away): Penalty -1.0  → Score good ✓
"playing" (3):   Penalty -1.5  → Score okay ✓
"loves" (4):     Penalty -2.0  → Score lower ⚠️
"dog" (5):       Penalty -2.5  → Score low ⚠️
"My" (6):        Penalty -3.0  → Score very low ⚠️

Natural focus on nearby words!
\`\`\`

## No Extra Memory Needed!

\`\`\`
Old method: Store position codes
RoPE: Calculate rotations
ALiBi: Just subtract!

Fastest and simplest! ⚡
\`\`\`

## When Applied

ALiBi happens during attention:

\`\`\`
Step 1: Calculate attention scores
Step 2: Subtract distance penalties ← ALiBi happens here!
Step 3: Apply softmax
Step 4: Get final attention

One simple subtraction!
\`\`\`

## Where It's Used

| Model | Uses ALiBi? |
|-------|------------|
| **BLOOM** | ✓ Yes |
| **MPT** | ✓ Yes |
| **Falcon** | ❌ Uses RoPE |
| **LLaMA** | ❌ Uses RoPE |

Both ALiBi and RoPE are good!

## Why So Simple?

The creators asked: "What's the SIMPLEST thing that could work?"

Answer: Just subtract distance!

And it works great!

## Advantages

**1. Super Easy**
- No complex math
- Just subtraction

**2. No Training**
- Doesn't need to learn
- Fixed pattern

**3. Long Text**
- Works on any length
- No limits!

**4. Fast**
- Very quick to calculate
- Saves time

## The Linear Part

"Linear" means: Add same amount each step

\`\`\`
Distance 1: -1
Distance 2: -2  (added -1)
Distance 3: -3  (added -1)
Distance 4: -4  (added -1)

Same increase = Linear!
\`\`\`

Like climbing stairs - each step same height!

## Visual: Attention Strength

\`\`\`
Without ALiBi:
All words equal: ████████████████

With ALiBi:
Close words strong: ████████████
Far words weak:     ███

Makes sense!
\`\`\`

## Summary

> **ALiBi** = Subtract distance from attention scores. Close words stay strong. Far words get weaker. Super simple!

**Think like this:**
- 📏 Measure distance
- ➖ Subtract it  
- ✅ Done!

**The whole idea:**
\`\`\`
Close = Easy to use
Far = Harder to use

Just like real memory!
\`\`\`

## What's Next?

Now you know how AI remembers positions.

But when generating text, there's a trick to make it faster!

Next: **KV Cache** - How to remember what you already calculated!
`,
};

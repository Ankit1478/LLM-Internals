import { Article } from './types';

export const rope: Article = {
  module: 1,
  slug: 'rope',
  title: 'RoPE (Rotary Position Embedding)',
  description: 'A simple way to tell the model where words are in a sentence',
  readTime: 6,
  previousTopic: { module: 1, slug: 'multi-query-attention', title: '11. Multi-Query Attention' },
  nextTopic: { module: 1, slug: 'alibi', title: '13. ALiBi (Linear Biases)' },
  content: `# RoPE (Rotary Position Embedding)

## What is RoPE?

RoPE is a clever trick to help AI understand **where words are** in a sentence, without adding extra numbers at the beginning.

Think of it like this: Instead of giving each word a number tag, we **twist** the word's meaning slightly based on where it sits!

## The Position Problem

AI needs to know word order matters:

\`\`\`
"Dog bites man" ≠ "Man bites dog"

Same words, different order = different meaning!
\`\`\`

The AI must know which word comes first, second, third, etc.

## Old Way: Adding Position Numbers

**Traditional Method (like GPT-2):**

\`\`\`
Word: "cat"
Position: 3rd word

Add special "position 3" pattern to "cat"
Result: "cat" + "3rd place marker"
\`\`\`

**Problem:** These position markers don't work well for long texts!

## New Way: RoPE - Rotating Instead of Adding

**RoPE's Clever Idea:**

Instead of **adding** position info, we **rotate** the word!

\`\`\`
Imagine each word as an arrow:

Word 1: Arrow points → (0 degrees)
Word 2: Arrow rotated ↗ (30 degrees)
Word 3: Arrow rotated ↑ (60 degrees)
Word 4: Arrow rotated ↖ (90 degrees)

Position = Amount of rotation!
\`\`\`

## Simple Analogy: Clock Hands

Think of words as clock hands:

\`\`\`
Word at position 1: Hand points to 12 o'clock
Word at position 2: Hand points to 1 o'clock
Word at position 3: Hand points to 2 o'clock
...

The angle tells you the position!
\`\`\`

Each position gets a different "clock angle" - that's RoPE!

## Visual Rotation

\`\`\`mermaid
graph LR
    subgraph "Words Without Position"
        W1["cat →"]
        W2["sat →"]
        W3["mat →"]
    end
    
    subgraph "With RoPE Rotation"
        R1["cat →<br/>(0°)"]
        R2["sat ↗<br/>(30°)"]
        R3["mat ↑<br/>(60°)"]
    end
    
    W1 --> R1
    W2 --> R2
    W3 --> R3
    
    style R1 fill:#3b82f6,color:#fff
    style R2 fill:#8b5cf6,color:#fff
    style R3 fill:#ec4899,color:#fff
\`\`\`

Same word, different angles based on position!

## Why Rotation Works Better

### Distance is Preserved!

Imagine two words close together:

\`\`\`
Word at position 5: Rotated 150°
Word at position 6: Rotated 180°

Difference: 30° (they're neighbors!)

Word at position 500: Rotated ???°
Word at position 501: Rotated ???°

Difference: Still 30° (still neighbors!)

The RELATIONSHIP stays the same! ✅
\`\`\`

This is called **relative position** - words remember how far apart they are, not just their absolute positions.

## How It Actually Works

Don't worry about the math! Here's the simple idea:

**Step 1: Take a word's representation**
\`\`\`
"cat" = [0.5, 0.8, 0.3, 0.9]
(These are the word's features)
\`\`\`

**Step 2: Rotate pairs of numbers**
\`\`\`
Position 1 (0° rotation):
[0.5, 0.8] stays → [0.5, 0.8]
[0.3, 0.9] stays → [0.3, 0.9]

Position 2 (30° rotation):
[0.5, 0.8] rotates → [0.43, 0.90]
[0.3, 0.9] rotates → [0.21, 0.95]

Different position = different pattern!
\`\`\`

**Step 3: Use the rotated version**

Now "cat" at position 1 looks different from "cat" at position 2!

## Comparison with Old Method

### Old Way (Absolute Position)

\`\`\`
Position 1: "I" + [position_1_code]
Position 2: "love" + [position_2_code]
Position 100: "dogs" + [position_100_code]

Each position gets a unique code.
Problem: Position 100 is completely different from position 1!
\`\`\`

### RoPE (Relative Position)

\`\`\`
Position 1: "I" rotated 0°
Position 2: "love" rotated 30°
Position 100: "dogs" rotated 3000°

Neighbors always have similar rotations!
Position 99, 100, 101 have close angles ✅
\`\`\`

## Benefits of RoPE

**1. Works for ANY Length**

\`\`\`
Trained on 2000 words?
Can handle 10,000 words!

Rotation pattern continues naturally.
Old method: Breaks down! ❌
\`\`\`

**2. Understands Relative Distance**

\`\`\`
"cat" and "sat" are 2 words apart:
→ Always same rotational difference
→ Model learns "2 words apart" = specific angle

Works anywhere in the text!
\`\`\`

**3. No Extra Memory**

\`\`\`
Old way: Store position codes for each position
RoPE: Just rotate! No storage needed! 💾
\`\`\`

## Simple Mental Model

Think of RoPE like marking your place with **shadows on a sundial**:

\`\`\`
Morning (position 1): Shadow points left ←
Noon (position 50): Shadow points down ↓
Evening (position 100): Shadow points right →

Time of day = Shadow direction
Position in text = Rotation angle

Sunrise to sunset = Beginning to end of text
\`\`\`

## What Gets Rotated?

Only the **Query and Key** parts of attention get rotated:

\`\`\`mermaid
flowchart LR
    Input["Word Embedding"]
    
    subgraph "Attention Components"
        Q["Query<br/>✅ Gets rotated"]
        K["Key<br/>✅ Gets rotated"]
        V["Value<br/>❌ No rotation"]
    end
    
    Result["Attention Output"]
    
    Input --> Q & K & V
    Q -.RoPE rotation.-> Result
    K -.RoPE rotation.-> Result
    V --> Result
    
    style Q fill:#f59e0b,color:#fff
    style K fill:#f59e0b,color:#fff
    style V fill:#a3a3a3,color:#fff
\`\`\`

Why? Queries and Keys are what compare positions. Values just carry meaning!

## RoPE in Action

### Without RoPE

\`\`\`
"The cat sat on the mat"

AI sees: cat, sat (just words)
Doesn't know: "sat" comes after "cat"
\`\`\`

### With RoPE

\`\`\`
"The cat sat on the mat"

AI sees:
- "cat" rotated 60° (position 2)
- "sat" rotated 90° (position 3)

Knows: "sat" is 30° after "cat" = one position later! ✅
\`\`\`

## Frequency Bands (Simple Explanation)

RoPE uses different "rotation speeds" for different features:

\`\`\`
Some features: Rotate fast (good for nearby words)
Other features: Rotate slow (good for distant words)

Like:
Fast hand: Tracks seconds (close details)
Slow hand: Tracks hours (big picture)

Both working together! 🕐
\`\`\`

## Where RoPE is Used

| Model | Uses RoPE? | Why |
|-------|-----------|-----|
| **GPT-2** | ❌ No | Old method |
| **GPT-3** | ❌ No | Old method |
| **LLaMA** | ✅ Yes | Better for long text |
| **Falcon** | ✅ Yes | Modern approach |
| **Mistral** | ✅ Yes | State-of-the-art |

Most **new models** use RoPE!

## The Magic: Math-Free Explanation

Here's why RoPE is brilliant:

1. **Natural extension** - Rotation keeps going forever
2. **Nearby stays nearby** - Close positions have close angles
3. **No learning needed** - It's a fixed pattern, not learned
4. **Memory efficient** - Calculate on-the-fly

It's like having a ruler that works for any length!

## Simple Example

\`\`\`
Sentence: "I love cats"

Word "I" (position 0):
Rotated 0° → Points east →

Word "love" (position 1):
Rotated 45° → Points northeast ↗

Word "cats" (position 2):
Rotated 90° → Points north ↑

Direction difference tells distance apart!
\`\`\`

## Visual: Rotation Pattern

\`\`\`mermaid
graph TD
    P0["Position 0<br/>→ (0°)"]
    P1["Position 1<br/>↗ (45°)"]
    P2["Position 2<br/>↑ (90°)"]
    P3["Position 3<br/>↖ (135°)"]
    P4["Position 4<br/>← (180°)"]
    
    P0 --> P1 --> P2 --> P3 --> P4
    
    style P0 fill:#3b82f6,color:#fff
    style P2 fill:#f59e0b,color:#fff
    style P4 fill:#ef4444,color:#fff
\`\`\`

Each step = same angle increase!

## Why "Rotary"?

The name comes from **rotation**:

\`\`\`
Rotary = Rotating
Position = Where in sentence
Embedding = Word representation

RoPE = Rotating Position Embedding!
\`\`\`

Just rotating numbers to show position - simple!

## Key Takeaway (Super Simple)

\`\`\`
Old way:
Word + Position Number = ???

New way (RoPE):
Word ROTATED by position = ✅

Rotation is smoother and works better!
\`\`\`

## Summary

> **RoPE** = Instead of adding position numbers to words, we rotate the word's representation by an angle that depends on its position. This helps AI understand word order in a way that works for any text length!

**Think of it as:**
- 🎯 Spinning a wheel for each word
- 🕐 Like clock hands showing time
- 🧭 Using compass directions for positions
- ↻ Simple rotation = position information

**The Simple Truth:**
\`\`\`
Position 1: Spin a little →
Position 2: Spin more ↗
Position 3: Spin even more ↑

More spin = Later in sentence!
\`\`\`

## What's Next?

RoPE is one way to handle positions. There's another clever approach that's even simpler!

Next: **ALiBi (Attention with Linear Biases)** - The simplest position encoding method ever!
`,
};

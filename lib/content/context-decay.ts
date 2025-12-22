import { Article } from './types';

export const contextDecay: Article = {
  module: 1,
  slug: 'context-decay',
  title: 'Context Decay & Lost-in-the-Middle',
  description: 'Why AI forgets stuff in the middle of long conversations',
  readTime: 4,
  previousTopic: { module: 1, slug: 'context-window', title: '17. Context Window vs Working Memory' },
  nextTopic: { module: 1, slug: 'needle-haystack', title: '19. Needle-in-Haystack Tests' },
  content: `# Context Decay & Lost-in-the-Middle

## What Is This Problem?

AI forgets the middle!

Strong memory: Start and End
Weak memory: Middle

Called "Lost-in-the-Middle"!

## Simple Example

\`\`\`
Long conversation:

Beginning: "My name is Alex" ✓ Remembered!
Middle: "I like pizza" ❌ Forgotten!
End: "What's for dinner?" ✓ Remembered!

Ask: "What's my name?"
AI: "Alex!" ✓

Ask: "What food do I like?"
AI: "I don't know" ❌

The pizza info got lost in the middle!
\`\`\`

## Why Does This Happen?

### 1. Attention Pattern

\`\`\`
AI pays attention like this:

Start: ████████ (80% attention)
Middle: ██ (20% attention)
End: ████████ (80% attention)

U-shape!
Middle gets ignored!
\`\`\`

### 2. Recent Bias

\`\`\`
AI thinks:
"What you just said = Important!"
"Stuff from 10 messages ago = Less important"

Natural! Humans do this too!
\`\`\`

### 3. Attention Spread

\`\`\`
1,000 words to look at:
Each word gets 0.1% attention

Word at position 500 (middle):
Gets even LESS than 0.1%!

Gets "diluted"!
\`\`\`

## Visual Pattern

\`\`\`
Message 1: ██████ (Remembered)
Message 2: ████ (Fading...)
Message 3: ██ (Weak!)
Message 4: ██ (Very weak!)
Message 5: ████ (Getting stronger)
Message 6: ██████ (Remembered!)

Middle = Weak zone!
\`\`\`

## Real Test Results

Scientists tested this:

\`\`\`
Put important fact at different positions:

Position 1 (start): 90% recall ✓
Position 5 (middle): 40% recall ❌
Position 10 (end): 85% recall ✓

Middle performs WORST!
\`\`\`

## The Decay Curve

\`\`\`
Information strength over time:

Recent (0-5 messages): Strong ✓
Medium (5-20 messages): Fading...
Old (20+ messages): Very weak ❌

Except: Very first message stays strong!
\`\`\`

## Why First Message Stays Strong?

Special reasons:

**1. System Prompt**
\`\`\`
Living at position 0!
"You are a helpful assistant..."
Always visible!
\`\`\`

**2. Priming Effect**
\`\`\`
First info sets the context!
Like title of a book!
Brain keeps it active!
\`\`\`

**3. Positional Encoding**
\`\`\`
Position 0 = Special!
Gets extra attention weight!
Built into the model!
\`\`\`

## What Gets Lost Most?

\`\`\`
Vulnerable info:
- Facts in middle
- Lists (middle items)
- Middle paragraphs
- Transitional content

Safe info:
- First message
- Last 3-5 messages
- Repeated info
- Questions (high attention!)
\`\`\`

## Workarounds People Use

### 1. Repeat Important Stuff

\`\`\`
Bad:
"My password is ABC123" (message 1)
... 50 messages ...
"What's my password?"

Good:
... 50 messages ...
"Remember my password ABC123. What's my password?"

Bring it back to the end!
\`\`\`

### 2. Summarize Often

\`\`\`
Every 10 messages:
"To recap: [key points from middle]"

Refreshes the middle content!
\`\`\`

### 3. Keep Conversations Short

\`\`\`
Instead of:
One 100-message conversation

Do:
Five 20-message conversations

Less decay!
\`\`\`

### 4. Put Key Info at Start or End

\`\`\`
Important: "My deadline is Friday"
Put it: At the very end of your message!

Or: In system prompt (position 0)

Avoid putting in middle paragraphs!
\`\`\`

## The Lost List Problem

Really shows the issue:

\`\`\`
"Remember these numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"

Ask AI to repeat:
AI: "1, 2, 3... um... 9, 10"

Lost 4, 5, 6, 7, 8!
(The middle numbers!)
\`\`\`

## Example With Story

\`\`\`
Tell AI a story:

Start: "Once upon a time..." ✓
Middle: "The hero found a key..." ❌
End: "And lived happily ever after" ✓

Ask: "What did the hero find?"
AI often forgets the key!

Middle events get lost!
\`\`\`

## How Bad Is It?

Research shows:

\`\`\`
With 100K tokens context:

Token 100: 95% accuracy ✓
Token 50,000: 30% accuracy ❌
Token 99,000: 90% accuracy ✓

Middle is really weak!
\`\`\`

## Summary

> **Context Decay & Lost-in-the-Middle** = AI remembers the start and end of conversations well, but forgets stuff in the middle. It's a known problem with how attention works!

**Think of it like:**
- 🎬 Remembering movie beginning and end, forgetting middle
- 📖 Book's first and last chapters clear, middle fuzzy
- 🎵 Song's intro and outro memorable, middle verses forgotten
- 👴 Human memory (we do this too!)

**The pattern:**
\`\`\`
Strong: First few messages
Weak: Middle bulk  
Strong: Last few messages

Can't change it (yet!)
Work around it!
\`\`\`

**What to do:**
- Repeat important stuff
- Keep it short
- Summarize middle content
- Put key info at start/end

## What's Next?

We know the middle gets lost.

But how do we TEST for this problem?

Next: **Needle-in-Haystack Tests** - Finding hidden info in long context!
`,
};

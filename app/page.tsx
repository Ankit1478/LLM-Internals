'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Zap, Brain, Code2, Sparkles, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border" style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}>
              <Sparkles className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Master AI & LLM Internals
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight" style={{ color: 'var(--foreground)' }}>
              Learn AI from
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                First Principles
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Comprehensive documentation covering machine learning fundamentals, LLM internals, transformers architecture, and everything you need to build AI applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/0/introduction"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: 'var(--foreground)', color: 'var(--background)' }}
              >
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg border transition-all hover:scale-105"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                Browse Docs
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>23+</div>
                <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Topics Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>3</div>
                <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Core Modules</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>∞</div>
                <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Always Free</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Everything You Need to Know
            </h2>
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              From basics to advanced concepts, all in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div
              className="p-8 rounded-xl border transition-all hover:shadow-lg hover:scale-105"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--muted)' }}>
                <BookOpen className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Comprehensive Guides
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                Step-by-step tutorials covering AI fundamentals, machine learning, and neural networks from scratch.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="p-8 rounded-xl border transition-all hover:shadow-lg hover:scale-105"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--muted)' }}>
                <Brain className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                LLM Internals
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                Deep dive into transformers, attention mechanisms, tokenization, and how modern LLMs actually work.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="p-8 rounded-xl border transition-all hover:shadow-lg hover:scale-105"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--muted)' }}>
                <Code2 className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Practical Examples
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                Real-world code examples and applications to help you build your own AI projects.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className="p-8 rounded-xl border transition-all hover:shadow-lg hover:scale-105"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--muted)' }}>
                <Zap className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Quick Start
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                Get up and running quickly with our streamlined quick start guide and setup instructions.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              className="p-8 rounded-xl border transition-all hover:shadow-lg hover:scale-105"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--muted)' }}>
                <Sparkles className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Modern Architecture
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                Learn about cutting-edge concepts like RoPE, KV cache, PagedAttention, and more.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              className="p-8 rounded-xl border transition-all hover:shadow-lg hover:scale-105"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--muted)' }}>
                <Brain className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Understanding Behavior
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                Explore why LLMs hallucinate, how reasoning works, and the limits of context windows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Ready to Master AI?
          </h2>
          <p className="text-xl mb-10" style={{ color: 'var(--muted-foreground)' }}>
            Start your journey into Artificial Intelligence today.
          </p>
          <Link
            href="/docs/0/introduction"
            className="group inline-flex items-center gap-2 px-10 py-5 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'var(--foreground)', color: 'var(--background)' }}
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--foreground)' }}>
                <BookOpen className="w-5 h-5" style={{ color: 'var(--background)' }} />
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--foreground)' }}>AI Course</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              © 2025 AI Course. Built for learners, by learners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

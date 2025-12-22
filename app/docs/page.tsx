'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen, Zap, Code } from 'lucide-react';
import { docsRoadmap } from '@/lib/content/index';

export default function DocsHome() {
  const moduleIcons = [BookOpen, Zap, Code];

  return (
    <div className="min-h-full" style={{ background: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            AI Course Documentation
          </h1>
          <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>
            Your comprehensive guide to mastering Artificial Intelligence
          </p>
        </div>

        

        {/* Modules Grid */}
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
          Explore Modules
        </h2>
        <div className="grid gap-4">
          {docsRoadmap.map((module, idx) => {
            const Icon = moduleIcons[idx] || BookOpen;
            return (
              <div
                key={module.module}
                className="rounded-xl p-6 border transition-all hover:shadow-md"
                style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--muted)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
                      >
                        Module {module.module + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                      {module.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {/* Handle modules with topics */}
                      {module.topics?.map((topic) => (
                        <Link
                          key={topic.slug}
                          href={`/docs/${module.module}/${topic.slug}`}
                          className="text-sm px-3 py-1 rounded-full transition-colors"
                          style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent)';
                            e.currentTarget.style.color = 'var(--foreground)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--muted)';
                            e.currentTarget.style.color = 'var(--muted-foreground)';
                          }}
                        >
                          {topic.title}
                        </Link>
                      ))}
                      {/* Handle modules with subModules - show subModule titles */}
                      {module.subModules?.map((subModule, subIdx) => (
                        <span
                          key={subIdx}
                          className="text-sm px-3 py-1 rounded-full"
                          style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
                        >
                          {subModule.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div
          className="mt-12 p-6 rounded-xl border text-center"
          style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Use the sidebar to navigate through topics or click on any topic above to start learning.
          </p>
        </div>
      </div>
    </div>
  );
}

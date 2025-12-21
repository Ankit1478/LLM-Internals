'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Menu, X, Sun, Moon, BookOpen } from 'lucide-react';
import { docsRoadmap } from '@/lib/content/index';
import { useTheme } from '@/components/theme-provider';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [expandedSubModules, setExpandedSubModules] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const toggleSection = (module: number) => {
    setExpandedSections(prev =>
      prev.includes(module) ? prev.filter(s => s !== module) : [...prev, module]
    );
  };

  const toggleSubModule = (key: string) => {
    setExpandedSubModules(prev =>
      prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]
    );
  };

  const isActiveTopic = (module: number, slug: string) => {
    return pathname === `/docs/${module}/${slug}`;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Top Navbar */}
      <nav className="flex-shrink-0 z-20 border-b" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left - Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg transition-colors"
                style={{ color: 'var(--foreground)' }}
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link href="/docs" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--foreground)' }}>
                  <BookOpen className="w-5 h-5" style={{ color: 'var(--background)' }} />
                </div>
                <span className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>AI Course</span>
              </Link>
            </div>

            {/* Right - Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ background: 'var(--muted)', color: 'var(--foreground)' }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
            fixed lg:static
            w-72
            flex flex-col h-[calc(100vh-64px)]
            transition-transform duration-300
            z-10 border-r
          `}
          style={{ background: 'var(--sidebar)', borderColor: 'var(--sidebar-border)' }}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
            <div className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
              Documentation
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {docsRoadmap.map((section) => (
              <div key={section.module} className="mb-2">
                <button
                  onClick={() => toggleSection(section.module)}
                  className="w-full flex items-center gap-2 py-2 px-2 rounded-lg text-left transition-colors"
                  style={{ color: 'var(--foreground)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--sidebar-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                    {section.module + 1}
                  </span>
                  <span className="font-semibold text-sm flex-1">{section.title}</span>
                  {expandedSections.includes(section.module) ? (
                    <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                  ) : (
                    <ChevronRight className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                  )}
                </button>

                {expandedSections.includes(section.module) && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 pl-4" style={{ borderColor: 'var(--border)' }}>
                    {/* Render regular topics */}
                    {section.topics?.map((topic, idx) => {
                      const isActive = isActiveTopic(section.module, topic.slug);
                      return (
                        <Link
                          key={idx}
                          href={`/docs/${section.module}/${topic.slug}`}
                          onClick={() => setSidebarOpen(false)}
                          className="block py-1.5 px-2 text-sm rounded transition-colors"
                          style={{
                            background: isActive ? 'var(--accent)' : 'transparent',
                            color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                            fontWeight: isActive ? 600 : 400,
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'var(--sidebar-hover)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          {topic.title}
                        </Link>
                      );
                    })}

                    {/* Render subModules (nested) */}
                    {section.subModules?.map((subModule, subIdx) => {
                      const subKey = `${section.module}-${subIdx}`;
                      const isSubExpanded = expandedSubModules.includes(subKey);
                      return (
                        <div key={subIdx} className="mt-1">
                          <button
                            onClick={() => toggleSubModule(subKey)}
                            className="w-full flex items-center gap-2 py-1.5 px-2 rounded text-left transition-colors text-sm"
                            style={{ color: 'var(--foreground)' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--sidebar-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            {isSubExpanded ? (
                              <ChevronDown className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
                            ) : (
                              <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
                            )}
                            <span className="font-medium">{subModule.title}</span>
                          </button>

                          {isSubExpanded && (
                            <div className="ml-4 mt-1 space-y-1 border-l-2 pl-3" style={{ borderColor: 'var(--border)' }}>
                              {subModule.topics.map((topic, topicIdx) => {
                                const isActive = isActiveTopic(section.module, topic.slug);
                                return (
                                  <Link
                                    key={topicIdx}
                                    href={`/docs/${section.module}/${topic.slug}`}
                                    onClick={() => setSidebarOpen(false)}
                                    className="block py-1 px-2 text-xs rounded transition-colors"
                                    style={{
                                      background: isActive ? 'var(--accent)' : 'transparent',
                                      color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                                      fontWeight: isActive ? 600 : 400,
                                    }}
                                    onMouseEnter={(e) => {
                                      if (!isActive) e.currentTarget.style.background = 'var(--sidebar-hover)';
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!isActive) e.currentTarget.style.background = 'transparent';
                                    }}
                                  >
                                    {topic.title}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-0"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

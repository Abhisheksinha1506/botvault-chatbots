'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Mail, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Toast component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}>
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <span className="font-medium">{message}</span>
    </div>
  )
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);

  // Check if email already exists in database
  const isEmailDuplicate = async (emailToCheck: string) => {
    const normalizedEmail = emailToCheck.toLowerCase()

    try {
      const { data, error } = await supabase
        .from('botvault_signups')
        .select('email')
        .eq('email', normalizedEmail)
        .limit(1)

      if (error) {
        console.error('Error checking database for duplicate:', error)
        throw error
      }

      return data && data.length > 0
    } catch (error) {
      console.error('Unexpected error checking database:', error)
      throw error
    }
  }

  // Track visitor on page load
  const trackVisitor = async () => {
    try {
      await supabase
        .from('botvault_visitors')
        .insert([
          {
            page_url: window.location.href,
            user_agent: navigator.userAgent,
            project_name: 'botvault'
          }
        ])
    } catch (error) {
      console.error('Error tracking visitor:', error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    trackVisitor()
  }, [])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setToast({ message: 'Please enter a valid email address', type: 'error' })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setToast({ message: 'Please enter a valid email address', type: 'error' })
      return
    }

    try {
      // Check for duplicate in database
      setIsCheckingDuplicate(true)
      const duplicate = await isEmailDuplicate(email)
      setIsCheckingDuplicate(false)

      if (duplicate) {
        setToast({ message: 'This email is already registered', type: 'error' })
        return
      }

      // Save to Supabase database
      const { error } = await supabase
        .from('botvault_signups')
        .insert([
          {
            email: email.toLowerCase(),
            project_name: 'botvault'
          }
        ])

      if (error) {
        console.error('Error saving email to database:', error)
        setToast({ message: 'Failed to register email. Please try again.', type: 'error' })
        return
      }

      setSubmitted(true);
      setEmail('');
      setToast({ message: 'Successfully registered!', type: 'success' })
      setTimeout(() => setSubmitted(false), 3000);

    } catch (error) {
      console.error('Unexpected error:', error)
      setIsCheckingDuplicate(false)
      setToast({ message: 'Registration failed. Please try again.', type: 'error' })
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Hero Section */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Zero Hallucination Bots for Regulated Industries
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
              Deploy RiveScript-based chatbots with 100% deterministic responses. Perfect for healthcare, finance, and legal compliance where accuracy matters more than creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Top Registration Form */}
      <section className="py-2 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary mb-3">Deploy Your First Bot Free</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Early access — no credit card required
            </p>

            <form onSubmit={handleWaitlistSubmit} className="flex gap-3 mb-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                disabled={submitted}
              >
                {submitted ? 'Email Registered!' : 'Deploy Bot'}
              </Button>
            </form>

            {submitted && (
              <p className="text-accent mt-4 text-sm font-medium">
                Email successfully registered!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 lg:py-32 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-primary mb-4">The Problem</h3>
            <p className="text-lg text-foreground leading-relaxed mb-4">
              Large language models in regulated industries are a liability. One wrong answer to a
              patient about treatment options, a client about contract terms, or a customer about
              refunds is a lawsuit. Banks can't afford hallucinations. Healthcare systems can't.
              Law firms can't. Neither can you.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-primary mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-accent-foreground rounded font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Upload Your Rules</h4>
                <p className="text-muted-foreground">
                  Upload your RiveScript .rs rule files defining exact bot behaviors and responses.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-accent-foreground rounded font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Get Your API Endpoint</h4>
                <p className="text-muted-foreground">
                  Instantly receive a secure REST API endpoint for your bot with full conversation
                  logging.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-accent-foreground rounded font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Embed the Widget</h4>
                <p className="text-muted-foreground">
                  Add our embeddable chat widget to your site. No coding required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mock Conversation */}
      <section className="py-24 lg:py-32 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-primary mb-8">Deterministic by Design</h3>
          <Card className="border border-border bg-card">
            <div className="p-6 space-y-4">
              <div className="flex justify-end">
                <div className="bg-accent text-accent-foreground rounded-lg px-4 py-2 max-w-md text-right">
                  <p className="text-sm">What are your refund policy terms?</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-muted text-foreground rounded-lg px-4 py-2 max-w-md">
                  <p className="text-sm">
                    Our refund policy allows returns within 30 days of purchase with original
                    receipt. No exceptions apply outside this window.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-accent text-accent-foreground rounded-lg px-4 py-2 max-w-md text-right">
                  <p className="text-sm">Can you make an exception?</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-muted text-foreground rounded-lg px-4 py-2 max-w-md">
                  <p className="text-sm">
                    I'm not able to make exceptions to this policy. Please contact
                    support@company.com for further assistance.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground italic">
                  ✓ This response is identical every single time. Always. No matter what.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-primary mb-8">LLM Bots Guess. Rule Bots Don't.</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="border-r border-border px-4 py-3 text-left font-semibold text-primary">
                    Feature
                  </th>
                  <th className="border-r border-border px-4 py-3 text-left font-semibold text-primary">
                    BotVault (RiveScript)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-primary">LLM Chatbot</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="border-r border-border px-4 py-3 font-medium text-foreground">
                    Response consistency
                  </td>
                  <td className="border-r border-border px-4 py-3 text-foreground">
                    Always identical
                  </td>
                  <td className="px-4 py-3 text-foreground">Varies every time</td>
                </tr>
                <tr className="border-b border-border bg-secondary/10">
                  <td className="border-r border-border px-4 py-3 font-medium text-foreground">
                    Auditability
                  </td>
                  <td className="border-r border-border px-4 py-3 text-foreground">Full rule trace</td>
                  <td className="px-4 py-3 text-foreground">Black box</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="border-r border-border px-4 py-3 font-medium text-foreground">
                    Hallucination risk
                  </td>
                  <td className="border-r border-border px-4 py-3 text-foreground">Zero</td>
                  <td className="px-4 py-3 text-foreground">Always present</td>
                </tr>
                <tr className="border-b border-border bg-secondary/10">
                  <td className="border-r border-border px-4 py-3 font-medium text-foreground">
                    Compliance-ready
                  </td>
                  <td className="border-r border-border px-4 py-3 text-foreground">Yes</td>
                  <td className="px-4 py-3 text-foreground">Requires extensive guardrails</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="border-r border-border px-4 py-3 font-medium text-foreground">
                    Setup complexity
                  </td>
                  <td className="border-r border-border px-4 py-3 text-foreground">Low</td>
                  <td className="px-4 py-3 text-foreground">High</td>
                </tr>
                <tr>
                  <td className="border-r border-border px-4 py-3 font-medium text-foreground">
                    Cost predictability
                  </td>
                  <td className="border-r border-border px-4 py-3 text-foreground">Fixed</td>
                  <td className="px-4 py-3 text-foreground">Token-based, variable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 lg:py-32 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-primary mb-12">Purpose-Built for Regulated Industries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-border bg-card p-6">
              <div className="mb-3 text-2xl">⚖️</div>
              <h4 className="font-semibold text-primary mb-2">Legal FAQ Bot</h4>
              <p className="text-sm text-muted-foreground">
                Exact policy responses, zero interpretation of contract terms.
              </p>
            </Card>
            <Card className="border border-border bg-card p-6">
              <div className="mb-3 text-2xl">🏥</div>
              <h4 className="font-semibold text-primary mb-2">Medical Triage Bot</h4>
              <p className="text-sm text-muted-foreground">
                Symptom → {"consult your doctor"}, nothing more. HIPAA-ready.
              </p>
            </Card>
            <Card className="border border-border bg-card p-6">
              <div className="mb-3 text-2xl">🏦</div>
              <h4 className="font-semibold text-primary mb-2">Bank FAQ Bot</h4>
              <p className="text-sm text-muted-foreground">
                Regulatory-approved answers only. Audit trail included.
              </p>
            </Card>
            <Card className="border border-border bg-card p-6">
              <div className="mb-3 text-2xl">👥</div>
              <h4 className="font-semibold text-primary mb-2">HR Policy Bot</h4>
              <p className="text-sm text-muted-foreground">
                Consistent responses to employee policy questions. No surprises.
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* Waitlist CTA */}
      <section id="waitlist" className="py-24 lg:py-32 bg-accent/5">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-primary mb-2">Ready to deploy a rule-based bot?</h3>
          <p className="text-muted-foreground mb-8">
            Early access — no credit card required
          </p>
          <form onSubmit={handleWaitlistSubmit} className="flex gap-3 mb-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button
              type="submit"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8"
            >
              {submitted ? 'Joining...' : 'Deploy Your First Bot Free'}
            </Button>
          </form>
          {submitted && (
            <p className="text-sm text-accent font-medium">
              ✓ Thanks! Check your email for next steps.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="mb-2">Currently in early access · Hosted on Vercel · Migrating to AWS for full launch</p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/abhisheksinha1506/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:abhisheksinha1594@gmail.com"
                className="text-foreground hover:text-accent transition-colors"
                aria-label="Email contact or feedback"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
            <p>&copy; 2026 BotVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

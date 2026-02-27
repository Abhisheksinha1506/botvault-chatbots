'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Mail, Database, Eye, Trash2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

export default function PrivacyPolicy() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 64
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-all duration-300">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-accent-foreground" />
            </div>
            <h1 className="text-xl font-bold text-primary">BotVault</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-accent text-muted-foreground flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-primary">Privacy Policy</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-foreground leading-relaxed mb-8">
            At BotVault, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you deploy chatbots or use our hosting platform.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-6">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'information', title: 'Information We Collect', icon: Database },
              { id: 'usage', title: 'How We Use Your Information', icon: Eye },
              { id: 'sharing', title: 'Information Sharing', icon: Mail },
              { id: 'storage', title: 'Data Storage & Security', icon: Lock },
              { id: 'rights', title: 'Your Rights', icon: Shield },
              { id: 'contact', title: 'Contact Us', icon: Mail }
            ].map((item) => (
              <Button
                key={item.id}
                variant="outline"
                onClick={() => scrollToSection(item.id)}
                className="h-auto p-4 justify-start text-left"
              >
                <item.icon className="w-5 h-5 mr-3 text-accent" />
                <span>{item.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Information We Collect */}
          <div id="information" className="space-y-6">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Database className="w-6 h-6 text-accent" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Email Address</h3>
                <p className="text-muted-foreground">
                  We collect your email address when you sign up for BotVault early access. This is used to send you deployment credentials, service updates, and technical support.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Bot Configuration Data</h3>
                <p className="text-muted-foreground">
                  When you deploy bots, we store your RiveScript rule files, bot configurations, and conversation logs to ensure proper functionality and provide support.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">API Usage Data</h3>
                <p className="text-muted-foreground">
                  We collect technical information about API requests, including endpoints called, IP addresses, and usage patterns to maintain service quality and prevent abuse.
                </p>
              </Card>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div id="usage" className="space-y-6">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Eye className="w-6 h-6 text-accent" />
              How We Use Your Information
            </h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Service Delivery</h3>
                <p className="text-muted-foreground">
                  Your information is used to provide bot hosting services, process API requests, and ensure your chatbots function correctly.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Technical Support</h3>
                <p className="text-muted-foreground">
                  We use conversation logs and configuration data to troubleshoot issues, optimize performance, and provide customer support.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Service Improvement</h3>
                <p className="text-muted-foreground">
                  Usage data helps us understand which features are most valuable, identify performance issues, and plan new capabilities for regulated industries.
                </p>
              </Card>
            </div>
          </div>

          {/* Information Sharing */}
          <div id="sharing" className="space-y-6">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Mail className="w-6 h-6 text-accent" />
              Information Sharing
            </h2>
            <div className="space-y-4">
              <Card className="p-6 border-green-500/20">
                <h3 className="font-semibold text-lg mb-3 text-green-600">We Never Sell Your Data</h3>
                <p className="text-muted-foreground">
                  We do not sell, rent, or trade your personal information or bot conversation data to third parties for marketing purposes.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Bot Conversation Privacy</h3>
                <p className="text-muted-foreground">
                  Your bot conversations are not shared with third parties. They are only used for service delivery, support, and as required by law.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Service Providers</h3>
                <p className="text-muted-foreground">
                  We use trusted third-party services (like Supabase for database storage and Vercel for hosting) that have access to your data only to provide services to us.
                </p>
              </Card>
            </div>
          </div>

          {/* Data Storage & Security */}
          <div id="storage" className="space-y-6">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Lock className="w-6 h-6 text-accent" />
              Data Storage & Security
            </h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Encrypted Storage</h3>
                <p className="text-muted-foreground">
                  Your bot configurations and conversation logs are stored securely using industry-standard encryption. We use Supabase, which provides encrypted data storage and follows security best practices.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">API Security</h3>
                <p className="text-muted-foreground">
                  API endpoints are secured with authentication tokens, rate limiting, and monitoring to prevent unauthorized access to your bots and data.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Data Retention</h3>
                <p className="text-muted-foreground">
                  We retain your bot data while you use our service. Conversation logs are retained for support and performance optimization. You can export or delete your data at any time.
                </p>
              </Card>
            </div>
          </div>

          {/* Your Rights */}
          <div id="rights" className="space-y-6">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Shield className="w-6 h-6 text-accent" />
              Your Rights
            </h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Right to Delete
                </h3>
                <p className="text-muted-foreground">
                  You can request the deletion of your account, bots, and all associated data at any time by emailing us at abhisheksinha1594@gmail.com. We'll process your request within 30 days.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Right to Export</h3>
                <p className="text-muted-foreground">
                  You can export your bot configurations, rule files, and conversation logs at any time through your dashboard or by contacting us.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Right to Opt Out</h3>
                <p className="text-muted-foreground">
                  Every email we send includes an unsubscribe link. You can opt out of marketing communications at any time while maintaining access to your bot services.
                </p>
              </Card>
            </div>
          </div>

          {/* Contact Information */}
          <div id="contact" className="space-y-6">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Mail className="w-6 h-6 text-accent" />
              Contact Us
            </h2>
            <Card className="p-6">
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-foreground">
                  <strong>Email:</strong> abhisheksinha1594@gmail.com
                </p>
                <p className="text-foreground">
                  <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/abhisheksinha1506/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">/in/abhisheksinha1506</a>
                </p>
              </div>
            </Card>
          </div>

          {/* Policy Updates */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Policy Updates</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by emailing the address you provided or by placing a prominent notice on our website.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/20 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="mb-2">© {new Date().getFullYear()} BotVault. All rights reserved.</p>
              <p>This privacy policy is part of our commitment to protecting your privacy.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

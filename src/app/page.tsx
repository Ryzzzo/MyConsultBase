import Link from 'next/link';
import Image from 'next/image';
import {
  Layers, Star, LayoutGrid, FileText, CreditCard, MessageSquare,
  Upload, Mail, Smile, AlertCircle, Check, Shield, Calendar, Users
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <Navigation />
      <Hero />
      <TrustSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonial />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 bg-warm-bg/90 backdrop-blur-xl border-b border-border-light">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/mcb_light_small_wide.png"
            alt="ConsultBase"
            width={240}
            height={56}
            className="h-12 sm:h-14 w-auto"
            priority
          />
        </Link>

        <ul className="hidden md:flex gap-6 lg:gap-10">
          <li><a href="#features" className="text-sm font-medium text-neutral-secondary hover:text-forest transition-colors">Features</a></li>
          <li><a href="#how" className="text-sm font-medium text-neutral-secondary hover:text-forest transition-colors">How It Works</a></li>
          <li><a href="#pricing" className="text-sm font-medium text-neutral-secondary hover:text-forest transition-colors">Pricing</a></li>
        </ul>

        <div className="flex gap-2 sm:gap-4 items-center">
          <Link href="/login" className="btn btn-ghost text-sm sm:text-base">Log In</Link>
          <Link href="/signup" className="btn btn-primary text-sm sm:text-base">Start Free Trial</Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-16 px-8 max-w-[1200px] mx-auto">
      <div className="text-center max-w-[800px] mx-auto mb-16 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-pale border border-forest/20 rounded-full text-sm text-forest mb-6">
          <Star className="w-4 h-4" />
          Built exclusively for consultants
        </div>

        <h1 className="font-display text-4xl md:text-[3.5rem] font-semibold leading-[1.15] tracking-tight mb-6 text-neutral-primary">
          Your clients deserve better than a <span className="text-forest">Google Drive link</span>
        </h1>

        <p className="text-xl text-neutral-secondary leading-relaxed mb-8">
          ConsultBase is the client portal that makes independent consultants look like established firms.
          Branded portals, seamless payments, organized deliverables — all in one place.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/signup" className="btn btn-primary btn-lg">Start Your Free Trial</Link>
          <button className="btn btn-ghost btn-lg">Watch Demo &rarr;</button>
        </div>

        <p className="mt-4 text-sm text-neutral-tertiary">No credit card required &bull; Free 14-day trial</p>
      </div>

      <BrowserMockup />
    </section>
  );
}

function BrowserMockup() {
  return (
    <div className="bg-white rounded-xl shadow-custom-xl overflow-hidden border border-border-light max-w-[1000px] mx-auto animate-fade-in-up">
      <div className="bg-[#F8F8F6] px-4 py-3 flex items-center gap-2 border-b border-border-light">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28CA42]" />
        </div>
        <div className="flex-1 bg-white px-4 py-2 rounded-md text-xs text-neutral-tertiary ml-4 border border-border-light">
          app.consultbase.io/portal/civic-strategy
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[400px]">
        <div className="w-full md:w-[220px] bg-forest p-6 text-white">
          <div className="font-display text-lg font-semibold mb-8 flex items-center gap-2">
            <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            Civic Strategy
          </div>
          <nav className="space-y-1">
            {[
              { icon: LayoutGrid, label: 'Dashboard', active: true },
              { icon: FileText, label: 'Deliverables' },
              { icon: CreditCard, label: 'Invoices' },
              { icon: MessageSquare, label: 'Messages' },
            ].map((item) => (
              <div key={item.label} className={`px-3 py-2.5 rounded-md text-sm flex items-center gap-3 ${item.active ? 'bg-white/15' : 'opacity-70'}`}>
                <item.icon className="w-[18px] h-[18px]" />
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl font-semibold">Dashboard</h2>
            <button className="bg-forest text-white px-4 py-2 rounded-md text-sm">+ New Project</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Active Projects', value: '3' },
              { label: 'Pending Invoices', value: '$4,500' },
              { label: 'This Month', value: '$12,750', highlight: true },
            ].map((stat) => (
              <div key={stat.label} className="bg-warm-cream p-4 rounded-lg">
                <div className="text-xs text-neutral-tertiary mb-1">{stat.label}</div>
                <div className={`text-2xl font-semibold ${stat.highlight ? 'text-forest' : 'text-neutral-primary'}`}>{stat.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-warm-cream rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-sm">Active Projects</span>
              <span className="text-neutral-tertiary text-xs">View all &rarr;</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'GSA Schedule Consulting', client: 'Acme Corp', status: 'In Progress' },
                { name: 'Capability Statement Design', client: 'TechStart Inc', status: 'In Review' },
              ].map((project) => (
                <div key={project.name} className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div>
                    <div className="text-sm font-medium">{project.name}</div>
                    <div className="text-xs text-neutral-tertiary">{project.client}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-medium ${
                    project.status === 'In Progress' ? 'bg-forest-pale text-forest' : 'bg-amber-100 text-amber-800'
                  }`}>{project.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustSection() {
  const companies = ['Strategy Advisors', 'GovCon Partners', 'M&A Consulting', 'HR Solutions Co', 'Finance Advisory'];
  return (
    <section className="py-16 px-8 text-center bg-warm-cream border-y border-border-light">
      <div className="text-xs uppercase tracking-widest text-neutral-tertiary mb-6">
        Trusted by consultants across industries
      </div>
      <div className="flex justify-center items-center gap-12 flex-wrap opacity-60">
        {companies.map((company) => (
          <span key={company} className="font-display text-xl font-semibold text-neutral-secondary">{company}</span>
        ))}
      </div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    { icon: Upload, title: 'The Google Drive Embarrassment', desc: 'Sending clients a messy folder link doesn\'t exactly scream "premium consultant." You know it. They know it.' },
    { icon: Mail, title: 'Email Chaos', desc: '"Did you get my invoice?" "Where\'s that deliverable?" Your inbox is a graveyard of client confusion.' },
    { icon: Smile, title: 'Tool Juggling', desc: 'Stripe for payments. Calendly for scheduling. Dropbox for files. You\'re the consultant, not an IT department.' },
    { icon: AlertCircle, title: 'Renewal Anxiety', desc: 'When does that retainer end? Did they pay last month? You shouldn\'t need a spreadsheet to track your business.' },
  ];

  return (
    <section className="py-24 px-8 max-w-[1000px] mx-auto">
      <div className="section-label">The Problem</div>
      <h2 className="font-display text-3xl md:text-[2.5rem] font-semibold leading-tight mb-4">
        You&apos;re great at consulting.<br />Your tools? Not so much.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {problems.map((problem) => (
          <div key={problem.title} className="card card-hover p-8">
            <div className="w-12 h-12 bg-red-100 rounded-[10px] flex items-center justify-center mb-4 text-red-600">
              <problem.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{problem.title}</h3>
            <p className="text-neutral-secondary text-[15px] leading-relaxed">{problem.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-24 px-8 bg-warm-cream" id="features">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <div className="section-label">Features</div>
          <h2 className="font-display text-3xl md:text-[2.5rem] font-semibold leading-tight mb-4">
            Everything you need to run a professional practice
          </h2>
          <p className="text-neutral-secondary text-lg">One platform. Zero tool-juggling. Complete peace of mind.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Users, title: 'Branded Client Portal', desc: 'Your brand. Your portal. Their experience.' },
            { icon: CreditCard, title: 'Integrated Payments', desc: 'Get paid without the awkward follow-ups.' },
            { icon: FileText, title: 'Deliverable Management', desc: 'Organized deliverables, happy clients.' },
            { icon: Shield, title: 'Enterprise Security', desc: 'Bank-level protection for your data.' },
            { icon: Calendar, title: 'Smart Scheduling', desc: 'Book meetings, not headaches.' },
            { icon: LayoutGrid, title: 'Business Analytics', desc: 'Know your numbers without spreadsheets.' },
          ].map((feature) => (
            <div key={feature.title} className="card card-hover p-6">
              <div className="w-12 h-12 bg-forest-pale rounded-lg flex items-center justify-center mb-4 text-forest">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-secondary text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: 1, title: 'Create Your Portal', desc: 'Add your logo, colors, and domain. Your branded client portal is ready in under 5 minutes.' },
    { num: 2, title: 'Invite Your Clients', desc: 'Send a beautiful invite email. Clients get instant access to their dedicated space.' },
    { num: 3, title: 'Run Your Business', desc: 'Share deliverables, send invoices, track engagement. Everything in one place.' },
  ];

  return (
    <section className="py-24 px-8 max-w-[1000px] mx-auto" id="how">
      <div className="text-center mb-16">
        <div className="section-label">How It Works</div>
        <h2 className="font-display text-3xl md:text-[2.5rem] font-semibold leading-tight">
          Up and running in minutes, not months
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.num} className="text-center">
            <div className="w-12 h-12 bg-forest text-white rounded-full flex items-center justify-center font-display font-semibold text-xl mx-auto mb-5">
              {step.num}
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-neutral-secondary text-[15px]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="py-24 px-8 bg-forest text-white">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="font-display text-2xl md:text-[2rem] font-normal italic leading-relaxed mb-8">
          &ldquo;ConsultBase transformed how I run my practice. My clients think I hired a whole operations team. It&apos;s just me and ConsultBase.&rdquo;
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6" fill="white" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-lg">Early Beta User</div>
            <div className="opacity-80 text-sm">Government Consulting</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Solo', desc: 'Perfect for independent consultants', price: 29, features: ['Up to 5 active clients', 'Branded client portal', 'Invoicing & payments', 'Deliverable management', 'Email support'], cta: 'Start Free Trial' },
    { name: 'Team', desc: 'For growing consulting practices', price: 79, features: ['Up to 25 active clients', 'Everything in Solo, plus:', 'Custom domain', 'Team collaboration (3 users)', 'Advanced analytics', 'Priority support'], cta: 'Start Free Trial', featured: true },
    { name: 'Firm', desc: 'For established consulting firms', price: 149, features: ['Unlimited clients', 'Everything in Team, plus:', 'Unlimited team members', 'White-label branding', 'API access', 'Dedicated success manager'], cta: 'Contact Sales' },
  ];

  return (
    <section className="py-24 px-8" id="pricing">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <div className="section-label">Pricing</div>
          <h2 className="font-display text-3xl md:text-[2.5rem] font-semibold leading-tight mb-4">
            Simple pricing for every stage
          </h2>
          <p className="text-neutral-secondary text-lg">Start free, upgrade when you need more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={`card card-hover p-10 relative ${plan.featured ? 'border-2 border-forest' : ''}`}>
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-forest text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-2xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-neutral-tertiary text-sm mb-6">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="text-neutral-tertiary text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-neutral-secondary">
                    <Check className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className={`btn w-full text-center ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-8 bg-warm-cream">
      <div className="max-w-[700px] mx-auto text-center">
        <h2 className="font-display text-3xl md:text-[2.5rem] font-semibold leading-tight mb-4">
          Ready to look like an established firm?
        </h2>
        <p className="text-neutral-secondary text-lg mb-8">
          Join hundreds of consultants who stopped apologizing for their tools and started impressing their clients.
        </p>
        <Link href="/signup" className="btn btn-primary btn-lg">Start Your Free Trial</Link>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Integrations', 'Changelog'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Security'],
  };

  return (
    <footer className="pt-16 pb-8 px-8 bg-neutral-primary text-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between pb-12 border-b border-white/10 mb-8 gap-8">
          <div className="max-w-[300px]">
            <div className="mb-4">
              <Image
                src="/mcb_light_small_wide.png"
                alt="ConsultBase"
                width={150}
                height={34}
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              The client portal that makes independent consultants look like established firms.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">{category}</h4>
                <ul className="space-y-3">
                  {items.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/80 text-sm hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/50 gap-4">
          <span>2025 ConsultBase. All rights reserved.</span>
          <span>Made with care for consultants everywhere.</span>
        </div>
      </div>
    </footer>
  );
}

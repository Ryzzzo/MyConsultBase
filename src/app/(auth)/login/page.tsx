'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser, useToast } from '@/components/providers';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsTestUser } = useUser();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        addToast('success', 'Welcome back!');
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestUserLogin = () => {
    loginAsTestUser();
    addToast('success', 'Welcome, Ryan!');
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-custom-lg border border-border-light p-8">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/mcb_light_small_wide.png"
            alt="ConsultBase"
            width={160}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </div>

        <h1 className="font-display text-xl font-semibold text-center text-neutral-primary mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-neutral-secondary text-center mb-6">
          Sign in to your account to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="relative">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
            <Mail className="w-4 h-4 text-neutral-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
            />
            <Lock className="w-4 h-4 text-neutral-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-forest hover:text-forest-light">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Sign in
          </Button>

          <button
            type="button"
            className="w-full py-2.5 text-sm text-neutral-secondary hover:text-neutral-primary transition-colors"
          >
            Sign in with magic link
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border-light">
          <button
            onClick={handleTestUserLogin}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-forest-pale text-forest font-medium text-sm hover:bg-forest/10 transition-colors"
          >
            Continue as Test User
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-neutral-tertiary text-center mt-2">
            Skip login and explore the dashboard
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border-light text-center">
          <p className="text-sm text-neutral-secondary">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-forest font-medium hover:text-forest-light">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

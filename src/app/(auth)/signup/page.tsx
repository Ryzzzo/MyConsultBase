'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser, useToast } from '@/components/providers';

export default function SignupPage() {
  const router = useRouter();
  const { login, updateUser } = useUser();
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        updateUser({ name, email });
        addToast('success', 'Account created successfully!');
        router.push('/dashboard/onboarding');
      } else {
        setError('Failed to create account');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
          Create your account
        </h1>
        <p className="text-sm text-neutral-secondary text-center mb-6">
          Start managing your clients professionally
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="relative">
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="pl-10"
            />
            <User className="w-4 h-4 text-neutral-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

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
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
            />
            <Lock className="w-4 h-4 text-neutral-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Create account
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border-light text-center">
          <p className="text-sm text-neutral-secondary">
            Already have an account?{' '}
            <Link href="/login" className="text-forest font-medium hover:text-forest-light">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

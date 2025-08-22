'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function LoginModal({ triggerLabel = 'Login' }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post(
            '/member/login',
            { email, password },
            {
                preserveScroll: true,
                onError: (errs) => {
                    setLoading(false);
                    setErrors(errs);
                },
                onSuccess: () => {
                    setLoading(false);
                    setOpen(false); // Close modal on success
                },
            },
        );
    };

    // Reset modal on close
    const handleOpenChange = (value) => {
        setOpen(value);
        if (!value) {
            setEmail('');
            setPassword('');
            setErrors({});
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">{triggerLabel}</Button>
            </DialogTrigger>

            <DialogContent className="w-[90vw] sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Member Login</DialogTitle>
                    <DialogDescription>Login to your account.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="w-full"
                        />
                        {errors?.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="w-full"
                        />
                        {errors?.password && <p className="text-sm text-red-500">{errors.password[0]}</p>}
                    </div>

                    {/* General Errors */}
                    {errors?.general && <p className="text-sm text-red-500">{errors.general[0]}</p>}

                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

import LoginModal from '@/Components/client/login-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, Menu } from 'lucide-react';
import AppLogo from '@/Components/app-logo';
import AppNotification from '../../components/app-notification';

export default function ClientHeaderLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="flex min-h-screen flex-col">
            {/* App Bar */}
            <header className="sticky top-0 z-50 border-b bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-end gap-1">
                        <AppLogo />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-6 md:flex">
                        <Link href="/" className="hover:underline">
                            Dashboard
                        </Link>
                        <Link href="/" className="hover:underline">
                            Projects
                        </Link>
                        <Link href="/" className="hover:underline">
                            About
                        </Link>
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* Mobile menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 px-4">
                                <div className="mt-6 flex flex-col gap-4">
                                    <Link href="/dashboard">Dashboard</Link>
                                    <Link href="/projects">Projects</Link>
                                    <Link href="/about">About</Link>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* User menu or login modal */}
                        {auth?.member ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-8 w-8 cursor-pointer">
                                        <AvatarImage src={auth.member.avatar_url || ''} />
                                        <AvatarFallback>{auth.member.name?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link method="get" href="/member/logout" className="flex items-center text-red-600">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <LoginModal triggerLabel="Login" />
                        )}
                    </div>
                </div>
            </header>
            <AppNotification />

            {/* Page Content */}
            <main className="flex-1">{children}</main>
        </div>
    );
}

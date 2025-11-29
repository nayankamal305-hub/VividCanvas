import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Zap, LayoutDashboard, LogOut, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      ]
    : [];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover-elevate rounded-lg px-2 py-1" data-testid="link-home">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                PlacementPanic
              </span>
            </a>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover-elevate rounded-lg px-3 py-2",
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-2"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <Link href="/interview/setup">
                  <Button
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    data-testid="button-start-interview"
                  >
                    Start Interview
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" data-testid="button-login">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    data-testid="button-signup"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg",
                      location === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                  <Link href="/interview/setup">
                    <Button
                      className="mt-2 w-full bg-gradient-to-r from-primary to-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Start Interview
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <a
                      className="px-4 py-2 text-sm font-medium text-muted-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </a>
                  </Link>
                  <Link href="/signup">
                    <Button
                      className="mt-2 w-full bg-gradient-to-r from-primary to-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Zap className="h-6 w-6 text-primary" />
          <span>​SnapFetch</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/tools" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Tools</Link>
          <Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Blog</Link>
          <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open &&
      <div className="border-t border-border bg-background px-4 pb-4 md:hidden animate-fade-in">
          <Link to="/tools" onClick={() => setOpen(false)} className="block py-3 text-muted-foreground">Tools</Link>
          <Link to="/blog" onClick={() => setOpen(false)} className="block py-3 text-muted-foreground">Blog</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block py-3 text-muted-foreground">About</Link>
        </div>
      }
    </nav>);

};

export default Navbar;
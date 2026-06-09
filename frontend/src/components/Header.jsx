import { Link, NavLink, useNavigate } from "react-router-dom";
import { Phone, Clock, Menu, X, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { HOSPITAL } from "../data/site";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experts", label: "Experts" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Emergency top strip */}
      <div className="bg-[#0A0F0D] text-white text-sm" data-testid="emergency-strip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-red-500 pulse-emergency"></span>
            <span className="font-medium tracking-wide">24x7 Emergency Services Available</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${HOSPITAL.tollFree.replace(/\s/g, "")}`}
              data-testid="header-tollfree-link"
              className="inline-flex items-center gap-2 hover:text-[#34D399] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Toll-Free: {HOSPITAL.tollFree}</span>
            </a>
            <span className="hidden md:inline opacity-60">|</span>
            <a
              href={`tel:${HOSPITAL.phones[0]}`}
              data-testid="header-reception-link"
              className="hidden md:inline hover:text-[#34D399] transition-colors"
            >
              Reception: {HOSPITAL.phones[0]}, {HOSPITAL.phones[1]}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" data-testid="logo-link" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-xl bg-[#0D9B6B] text-white grid place-items-center group-hover:bg-[#0a8259] transition-colors">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl font-semibold text-[#0A0F0D]">Devishiv Hospital</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#0D9B6B] font-medium">NABH Certified</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive ? "bg-[#D1FAE5] text-[#0D9B6B]" : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${HOSPITAL.tollFree.replace(/\s/g, "")}`}
              data-testid="header-call-emergency"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#DC2626] hover:text-[#b91c1c]"
            >
              <Phone className="h-4 w-4" />
              Emergency
            </a>
            <Button
              data-testid="header-book-appointment"
              onClick={() => navigate("/appointment")}
              className="rounded-full bg-[#0D9B6B] hover:bg-[#0a8259] text-white px-6 transition-all"
            >
              Book Appointment
            </Button>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-border bg-white" data-testid="mobile-menu">
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg text-sm font-medium ${
                      isActive ? "bg-[#D1FAE5] text-[#0D9B6B]" : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button
                onClick={() => {
                  setOpen(false);
                  navigate("/appointment");
                }}
                data-testid="mobile-book-appointment"
                className="mt-3 rounded-full bg-[#0D9B6B] hover:bg-[#0a8259] text-white"
              >
                Book Appointment
              </Button>
              <a
                href={`tel:${HOSPITAL.tollFree.replace(/\s/g, "")}`}
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-[#DC2626] text-[#DC2626] font-semibold"
              >
                <Phone className="h-4 w-4" /> Call Emergency
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

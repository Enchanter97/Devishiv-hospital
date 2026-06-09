import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { submitContact } from "../lib/api";
import { HOSPITAL } from "../data/site";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("Message sent! Our team will reach out shortly.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Could not send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(HOSPITAL.mapsQuery)}&output=embed`;

  return (
    <div data-testid="contact-page">
      <section className="bg-[#34D399] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-black font-medium mb-4">Contact & location</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0A0F0D] max-w-4xl leading-tight">
            We&apos;re here, 24x7 — let&apos;s talk.
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="bg-white rounded-3xl border border-border p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl font-medium text-[#0A0F0D] mb-2">Send us a message</h2>
            <p className="text-slate-600 mb-8">Have a question or need to share medical history before a visit? Use the form below.</p>

            <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
              <div>
                <Label htmlFor="c-name">Full name</Label>
                <Input
                  id="c-name"
                  data-testid="contact-name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="rounded-xl mt-2 h-11"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="c-phone">Phone</Label>
                  <Input
                    id="c-phone"
                    data-testid="contact-phone"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+91"
                    className="rounded-xl mt-2 h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="c-email">Email</Label>
                  <Input
                    id="c-email"
                    type="email"
                    data-testid="contact-email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className="rounded-xl mt-2 h-11"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="c-message">Message / Reason for appointment</Label>
                <Textarea
                  id="c-message"
                  data-testid="contact-message"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="rounded-xl mt-2"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                data-testid="contact-submit"
                className="rounded-full bg-[#0D9B6B] hover:bg-[#083358] text-white h-12 px-7 w-full sm:w-auto"
              >
                {loading ? "Sending..." : "Send message"}
              </Button>
            </form>
          </div>

          {/* Details + Map */}
          <div className="space-y-6">
            <div className="bg-[#0D9B6B] text-white rounded-3xl p-8 md:p-10">
              <h3 className="font-display text-2xl font-medium mb-6">Visit us</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-[#0D9B6B] flex-shrink-0" />
                  <span className="text-white/90 leading-relaxed">{HOSPITAL.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 text-[#0D9B6B] flex-shrink-0" />
                  <div>
                    <div className="text-white/90">Toll-Free: <span className="font-semibold">{HOSPITAL.tollFree}</span></div>
                    <div className="text-white/90">Reception: {HOSPITAL.phones.join(", ")}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-[#0D9B6B] flex-shrink-0" />
                  <div>
                    <div className="text-white/90 font-semibold">Open 24 Hours</div>
                    <div className="text-sm text-[#0D9B6B]">Emergency services available round-the-clock</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl overflow-hidden border border-border" data-testid="map-container">
              <iframe
                title="Devishiv Hospital location"
                src={mapsSrc}
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


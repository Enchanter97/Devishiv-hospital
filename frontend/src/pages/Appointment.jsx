import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { createAppointment } from "../lib/api";
import { DOCTORS, TIME_SLOTS } from "../data/site";
import { cn } from "../lib/utils";

export default function Appointment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preDoctor = searchParams.get("doctor") || "";

  const [form, setForm] = useState(() => ({
    patient_name: "",
    phone: "",
    email: "",
    doctor: preDoctor,
    date: undefined,
    time_slot: "",
    reason: "",
  }));
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(null);

  const update = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.patient_name || !form.phone || !form.doctor || !form.date || !form.time_slot) {
      toast.error("Please complete all required fields.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        patient_name: form.patient_name,
        phone: form.phone,
        email: form.email || undefined,
        doctor: form.doctor,
        date: format(form.date, "yyyy-MM-dd"),
        time_slot: form.time_slot,
        reason: form.reason || undefined,
      };
      const res = await createAppointment(payload);
      toast.success("Appointment request received!");
      setDone(res);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Could not book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div data-testid="appointment-success" className="py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="h-16 w-16 rounded-full bg-[#E4F4E4] grid place-items-center mx-auto mb-6">
            <Check className="h-8 w-8 text-[#0A4273]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-[#0F172A] mb-3">
            Appointment requested
          </h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you, <strong>{done.patient_name}</strong>. Your appointment with <strong>{done.doctor}</strong> on <strong>{done.date}</strong> at <strong>{done.time_slot}</strong> has been recorded. Our reception will call <strong>{done.phone}</strong> shortly to confirm.
          </p>
          <div className="rounded-2xl border border-border p-6 bg-surface text-left mb-8">
            <div className="text-xs uppercase tracking-[0.18em] text-[#7ACBA5] font-medium mb-2">Reference ID</div>
            <div className="font-mono text-sm text-[#0F172A] break-all">{done.id}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="rounded-full bg-[#0A4273] hover:bg-[#083358] text-white h-12 px-7"
            >
              Back to home
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setDone(null);
                setForm({ patient_name: "", phone: "", email: "", doctor: "", date: undefined, time_slot: "", reason: "" });
              }}
              className="rounded-full h-12 px-7 border-[#0A4273] text-[#0A4273]"
            >
              Book another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="appointment-page">
      <section className="bg-surface py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[#7ACBA5] font-medium mb-4">Book an appointment</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F172A] max-w-4xl leading-tight">
            Schedule a consultation with our specialists.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mt-6">
            Pick a doctor, choose a convenient date and time, and we&apos;ll call to confirm. For emergencies, please dial <span className="text-[#DC2626] font-semibold">1800 274 8000</span> directly.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <form onSubmit={submit} className="bg-white rounded-3xl border border-border p-8 md:p-10 space-y-6" data-testid="appointment-form">
            <div>
              <Label htmlFor="ap-name">Patient name *</Label>
              <Input
                id="ap-name"
                data-testid="appt-patient-name"
                value={form.patient_name}
                onChange={(e) => update("patient_name")(e.target.value)}
                placeholder="Full name"
                className="rounded-xl mt-2 h-11"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ap-phone">Phone *</Label>
                <Input
                  id="ap-phone"
                  data-testid="appt-phone"
                  value={form.phone}
                  onChange={(e) => update("phone")(e.target.value)}
                  placeholder="+91"
                  className="rounded-xl mt-2 h-11"
                />
              </div>
              <div>
                <Label htmlFor="ap-email">Email (optional)</Label>
                <Input
                  id="ap-email"
                  type="email"
                  data-testid="appt-email"
                  value={form.email}
                  onChange={(e) => update("email")(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-xl mt-2 h-11"
                />
              </div>
            </div>

            <div>
              <Label>Choose doctor *</Label>
              <Select value={form.doctor} onValueChange={update("doctor")}>
                <SelectTrigger data-testid="appt-doctor" className="rounded-xl mt-2 h-11">
                  <SelectValue placeholder="Select a specialist" />
                </SelectTrigger>
                <SelectContent>
                  {DOCTORS.map((d) => (
                    <SelectItem key={d.id} value={d.name} data-testid={`doc-opt-${d.id}`}>
                      {d.name} — {d.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      data-testid="appt-date-trigger"
                      className={cn(
                        "rounded-xl mt-2 h-11 w-full justify-start text-left font-normal",
                        !form.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.date ? format(form.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.date}
                      onSelect={update("date")}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Time slot *</Label>
                <Select value={form.time_slot} onValueChange={update("time_slot")}>
                  <SelectTrigger data-testid="appt-time-slot" className="rounded-xl mt-2 h-11">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((t) => (
                      <SelectItem key={t} value={t} data-testid={`slot-${t.replace(/[^a-z0-9]+/gi, "-")}`}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="ap-reason">Reason for visit (optional)</Label>
              <Textarea
                id="ap-reason"
                data-testid="appt-reason"
                value={form.reason}
                onChange={(e) => update("reason")(e.target.value)}
                placeholder="Briefly describe your concern"
                rows={4}
                className="rounded-xl mt-2"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              data-testid="appt-submit"
              className="rounded-full bg-[#0A4273] hover:bg-[#083358] text-white h-12 px-7 w-full sm:w-auto"
            >
              {loading ? "Booking..." : "Request appointment"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

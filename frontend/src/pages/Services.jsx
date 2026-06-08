import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Check, Stethoscope, FlaskConical, LifeBuoy } from "lucide-react";
import { SERVICES } from "../data/site";

const TAB_META = {
  clinical: { icon: Stethoscope, color: "#0A4273", desc: "Out-patient and in-patient clinical care delivered by senior consultants." },
  diagnostic: { icon: FlaskConical, color: "#0A4273", desc: "Modern diagnostic imaging, endoscopy and pathology — accurate and quick." },
  allied: { icon: LifeBuoy, color: "#0A4273", desc: "Round-the-clock support services for a complete care experience." },
};

export default function Services() {
  return (
    <div data-testid="services-page">
      <section className="bg-surface py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[#7ACBA5] font-medium mb-4">Scope of services</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F172A] max-w-4xl leading-tight">
            Comprehensive medical care, organised for clarity.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mt-6">
            From day-care OPD consultations to advanced surgery and 24/7 diagnostics — explore the full scope of services available at Devishiv Hospital.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Tabs defaultValue="clinical" className="w-full" data-testid="services-tabs">
            <TabsList className="bg-[#F0FDF4] p-1.5 rounded-full h-auto inline-flex flex-wrap gap-1">
              <TabsTrigger value="clinical" data-testid="tab-clinical" className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#0A4273] data-[state=active]:text-white">
                Clinical (OPD + IPD)
              </TabsTrigger>
              <TabsTrigger value="diagnostic" data-testid="tab-diagnostic" className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#0A4273] data-[state=active]:text-white">
                Diagnostics
              </TabsTrigger>
              <TabsTrigger value="allied" data-testid="tab-allied" className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#0A4273] data-[state=active]:text-white">
                Allied / Support
              </TabsTrigger>
            </TabsList>

            {Object.entries(SERVICES).map(([key, group]) => {
              const meta = TAB_META[key];
              const Icon = meta.icon;
              return (
                <TabsContent key={key} value={key} className="mt-10">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                      <div className="h-14 w-14 rounded-2xl bg-[#0A4273] text-white grid place-items-center mb-5">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#0F172A] mb-3">{group.title}</h2>
                      <p className="text-base text-slate-600 leading-relaxed">{meta.desc}</p>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {group.items.map((item) => (
                        <div
                          key={item}
                          data-testid={`service-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/,"")}`}
                          className="flex items-start gap-3 p-5 rounded-2xl border border-border bg-white hover:bg-[#F0FDF4] transition-colors"
                        >
                          <div className="h-7 w-7 rounded-full bg-[#E4F4E4] grid place-items-center flex-shrink-0 mt-0.5">
                            <Check className="h-4 w-4 text-[#0A4273]" />
                          </div>
                          <span className="text-base text-slate-800 leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* All three at-a-glance */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="font-display text-2xl md:text-3xl font-medium text-[#0F172A] mb-10">All services at a glance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(SERVICES).map(([key, group]) => (
              <div key={key} className="p-8 rounded-3xl bg-white border border-border">
                <h4 className="font-display text-xl font-medium text-[#0A4273] mb-5">{group.title}</h4>
                <ul className="space-y-2.5">
                  {group.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7ACBA5] mt-2 flex-shrink-0"></span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

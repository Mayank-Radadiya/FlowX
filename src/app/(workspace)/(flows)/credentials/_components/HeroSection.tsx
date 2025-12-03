import {
  KeyRound,
  Lock,
  ShieldCheck,
  Fingerprint,
  Webhook,
  Database,
  Cloud,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "End-to-End Encryption",
    description: "AES-256 encryption at rest and TLS 1.3 in transit",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Fingerprint,
    title: "Zero-Knowledge Architecture",
    description: "Your secrets are encrypted before they reach our servers",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Lock,
    title: "Secure Vault",
    description: "Isolated storage with automatic secret rotation",
    gradient: "from-emerald-500 to-green-500",
  },
];

export const HeroSection = () => {
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/50 font-mono">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5" />
        <div className="absolute -left-40 -top-40 size-80 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-80 animate-pulse rounded-full bg-cyan-500/10 blur-3xl [animation-delay:1s]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,rgba(255,255,255,0.02)_50%,transparent_51%,transparent_100%),linear-gradient(to_bottom,transparent_0%,transparent_49%,rgba(255,255,255,0.02)_50%,transparent_51%,transparent_100%)] bg-size-[32px_32px]" />

        <div className="relative px-6 py-16 sm:px-12 sm:py-20">
          <div className="flex flex-col items-center text-center">
            {/* Animated lock icon */}
            <div className="relative">
              <div className="absolute -inset-6 animate-pulse rounded-full bg-linear-to-r from-blue-500/20 to-cyan-500/20 blur-2xl" />
              <div className="relative flex size-24 items-center justify-center rounded-3xl bg-linear-to-br from-blue-500 to-cyan-600 shadow-2xl shadow-blue-500/30">
                <Lock className="size-12 text-white" />
              </div>
            </div>

            <h3 className="mt-8 text-2xl font-bold sm:text-3xl">
              Secure your connections
            </h3>
            <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
              Add credentials to securely connect your workflows to external
              services. All secrets are encrypted and never exposed.
            </p>
          </div>
        </div>
      </div>
      ;{/* Security Features */}
      <div className="grid gap-6 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-border hover:shadow-lg"
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              <div
                className={`flex size-12 items-center justify-center rounded-xl bg-linear-to-br ${feature.gradient} shadow-lg`}
              >
                <feature.icon className="size-6 text-white" />
              </div>
              <h4 className="mt-4 font-semibold">{feature.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      ;{/* Supported Services */}
      <div className="rounded-2xl border border-border/50 bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="size-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">200+ Integrations Available</h3>
            <p className="text-sm text-muted-foreground">
              Connect to popular services with just a few clicks
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Cloud, label: "Cloud Services" },
            { icon: Database, label: "Databases" },
            { icon: Webhook, label: "Webhooks" },
            { icon: KeyRound, label: "OAuth 2.0" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 p-3 transition-colors hover:bg-muted/50"
            >
              <item.icon className="size-5 text-muted-foreground" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

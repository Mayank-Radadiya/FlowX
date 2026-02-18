/**
 * CredentialSkeleton Component
 * ----------------------------
 * Premium loading skeleton matching the grid layout.
 */

function CredentialSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 h-32" />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 h-24" />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 h-24" />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 h-24" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 h-40"
          >
            {/* Shimmer */}
            <div
              className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(128,128,128,0.08), transparent)",
              }}
            />
            <div className="flex items-start justify-between">
              <div className="size-12 rounded-xl bg-white/10" />
              <div className="size-8 rounded-lg bg-white/5" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-5 w-32 rounded bg-white/10" />
              <div className="h-4 w-20 rounded-full bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CredentialSkeleton;

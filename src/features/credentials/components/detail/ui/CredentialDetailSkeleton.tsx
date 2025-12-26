/**
 * Skeleton loading state for credential detail page.
 */

export function CredentialDetailSkeleton() {
  return (
    <div className="w-[500px] mx-auto space-y-6 animate-pulse">
      <div className="h-5 w-24 rounded bg-neutral-200 dark:bg-white/5" />
      <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
        <div className="h-24 bg-neutral-200 dark:bg-white/10" />
        <div className="p-6 pt-14">
          <div className="h-8 w-48 rounded bg-neutral-200 dark:bg-white/10 mb-4" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="col-span-2 h-20 rounded-xl bg-neutral-100 dark:bg-white/5" />
            <div className="h-20 rounded-xl bg-neutral-100 dark:bg-white/5" />
            <div className="h-20 rounded-xl bg-neutral-100 dark:bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

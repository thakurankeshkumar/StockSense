export default function StatCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <div className="border border-[#dce2e7] bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#66727d]">
            {title}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#16202a]">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-[#66727d]">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#e5f3f0] font-mono text-sm font-semibold text-[#0f766e]">
          {icon}
        </div>
      </div>
    </div>
  );
}
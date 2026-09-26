export function PageTitle({ title, description }) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0f766e]">Inventory operations</p>
      <h2 className="text-2xl font-semibold tracking-tight text-[#16202a]">{title}</h2>
      <p className="mt-1 text-sm text-[#66727d]">{description}</p>
    </div>
  );
}

export function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#3d4a55]">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-md border border-[#dce2e7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#e5f3f0]"
      />
    </label>
  );
}

export function Select({ label, options = [], ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#3d4a55]">
        {label}
      </span>

      <select
        {...props}
        className="w-full rounded-md border border-[#dce2e7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#e5f3f0]"
      >
        <option value="">Select...</option>

        {options.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name || item.sku}
          </option>
        ))}
      </select>
    </label>
  );
}

export function OperationForm({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 grid gap-4 border border-[#dce2e7] bg-white p-6 sm:grid-cols-2"
    >
      {children}
    </form>
  );
}

export function OperationTable({ title, columns, rows }) {
  return (
    <div className="overflow-hidden border border-[#dce2e7] bg-white">
      <div className="border-b border-[#dce2e7] px-6 py-4">
        <h3 className="font-semibold text-[#16202a]">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f4f6f8]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-[#66727d]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 text-sm text-slate-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
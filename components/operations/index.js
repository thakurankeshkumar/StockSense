export function PageTitle({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
      />
    </label>
  );
}

export function Select({ label, options = [], ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <select
        {...props}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm"
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
      className="mb-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
    >
      {children}
    </form>
  );
}

export function OperationTable({ title, columns, rows }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500"
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
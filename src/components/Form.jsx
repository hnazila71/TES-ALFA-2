export function FormRow({ label, children }) {
  return (
    <div className="flex items-start mb-3">
      <label className="w-32 mr-3 pt-1 text-sm text-right">{label}</label>
      {children}
    </div>
  );
}


export function FormInput(props) {
  return (
    <input
      {...props}
      className={`w-48 h-8 px-2 border rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 ${props.className}`}
    />
  );
}

export function FormSelect(props) {
  return (
    <select
      {...props}
      className={`w-48 h-8 px-2 border rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 ${props.className}`}
    />
  );
}

export function FormButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-6 py-1 mr-4 rounded-sm border border-gray-600 bg-green-100 font-semibold text-sm hover:bg-green-200"
    >
      {children}
    </button>
  );
}

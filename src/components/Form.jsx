export function FormRow({ label, children }) {
  return (
    <div className="flex items-center mb-5">
      <label className="w-28 shrink-0 text-base text-left">{label}</label>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

export function FormInput(props) {
  return (
    <input
      {...props}
      className={`h-7 px-2 border-2 bg-white focus:outline-none disabled:bg-gray-200 text-sm border-t-gray-700 border-l-gray-700 border-b-white border-r-white ${props.className}`}
    />
  );
}

export function FormSelect(props) {
  return (
    <select
      {...props}
      className={`h-7 px-1 border-2 bg-white focus:outline-none text-sm border-t-gray-700 border-l-gray-700 border-b-white border-r-white ${props.className}`}
    />
  );
}

export function FormButton({ children, onClick, ...props }) {
  return (
    <button onClick={onClick} className="px-6 py-1 border-2 bg-[#c0c0c0] hover:bg-gray-400 text-sm border-t-white border-l-white border-r-black border-b-black active:border-t-black active:border-l-black active:border-r-white active:border-b-white disabled:text-gray-400 disabled:border-gray-400" {...props}>
      {children}
    </button>
  );
}
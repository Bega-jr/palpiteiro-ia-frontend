export default function PalpiteGrid({ numbers = [] }) {
  const full = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-5 gap-2">
      {full.map((n) => {
        const active = numbers.includes(n);
        return (
          <div
            key={n}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold 
              ${active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {String(n).padStart(2, "0")}
          </div>
        );
      })}
    </div>
  );
}

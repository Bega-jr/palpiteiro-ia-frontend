export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="grid grid-cols-5 gap-2 mt-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-gray-300 rounded-full"
          ></div>
        ))}
      </div>
    </div>
  );
}

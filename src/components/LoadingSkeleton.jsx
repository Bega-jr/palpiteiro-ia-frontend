export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
      <div className="grid grid-cols-5 gap-2">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>
        ))}
      </div>
    </div>
  );
}

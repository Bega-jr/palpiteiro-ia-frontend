export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  );
}

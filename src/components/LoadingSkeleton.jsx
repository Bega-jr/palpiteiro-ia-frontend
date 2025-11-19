export default function LoadingSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-2 animate-pulse">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="w-10 h-10 bg-gray-300 rounded-full"
        ></div>
      ))}
    </div>
  );
}

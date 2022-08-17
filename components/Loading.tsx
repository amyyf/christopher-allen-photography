export default function Loading() {
  return (
    <div className="text-center">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        height="40"
        width="40"
        className="animate-spin inline"
      >
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="25%" stopColor="black" />
            <stop offset="95%" stopColor="gray" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="url('#myGradient')"
          strokeWidth="10"
        />
      </svg>
    </div>
  );
}

import { Card } from '../ui/Card';

function CircularProgress({ score, max = 100, size = 120, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / max) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-[#AEE2FF]"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-[#9FA1FF] transition-all duration-1000 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-semibold text-[#2F3A44] leading-none">{score}</span>
      </div>
    </div>
  );
}

export function ProductivityCard({ analytics }) {
  const score = analytics?.productivityScore ?? 0;
  const rating = analytics?.productivityScoreDetails?.overallRating ?? 'Neutral';
  
  return (
    <Card className="flex flex-col justify-center items-center text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9FA1FF] w-full text-left mb-4">Productivity</p>
      
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <CircularProgress score={score} max={100} size={110} strokeWidth={8} />
        
        <p className="mt-4 text-sm font-semibold text-[#2F3A44]">Rating: {rating}</p>
        <p className="mt-1 text-xs text-[#6D7B87] max-w-[200px]">
          Based on your balance of productive vs distracting sites.
        </p>
      </div>

      <div className="mt-4 w-full rounded-xl bg-[#F7FAFC] p-3 flex justify-between items-center text-xs text-[#6D7B87]">
        <span>Weekly trend</span>
        <span className="font-semibold text-[#2F3A44]">
          {analytics?.weeklyVisits ?? 0} visits this week
        </span>
      </div>
    </Card>
  );
}

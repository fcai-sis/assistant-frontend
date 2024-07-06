export default function RadialProgress({
  value,
  max,
  colorize = false,
}: {
  value: number;
  max: number;
  colorize: boolean;
}) {
  const progress = (value / max) * 100;
  const color = !colorize
    ? "text-blue-400"
    : progress > 66
    ? "text-green-400"
    : progress > 33
    ? "text-yellow-400"
    : "text-red-400";
  const trackColor = colorize ? "text-slate-100" : "text-blue-100";

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className={`${trackColor} stroke-current`}
          strokeWidth="6"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className={`${color} progress-ring__circle stroke-current`}
          strokeWidth="6"
          strokeLinecap="butt"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={`calc(251.2px - (251.2px * ${progress}) / 100)`}
        ></circle>

        <text
          x="50"
          y="50"
          textAnchor="middle"
          alignmentBaseline="middle"
          className="text-slate-600"
        >
          {value}/{max}
        </text>
      </svg>
    </div>
  );
}

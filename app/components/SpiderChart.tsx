type SkillField = {
  label: string;
  value: number;
};

// Edit these values to update the chart.
const FIELDS: SkillField[] = [
  { label: "Systems", value: 90 },
  { label: "Backend", value: 85 },
  { label: "Frontend", value: 76 },
  { label: "Data", value: 68 },
  { label: "LeetCode", value: 58 },
  { label: "ML / AI", value: 64 },
];

const SIZE = 520;
const CENTER = SIZE / 2;
const RADIUS = 175;
const LEVELS = 5;

function polar(angle: number, radius: number) {
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function toPath(points: { x: number; y: number }[]) {
  return `${points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`)
    .join(" ")} Z`;
}

export function SpiderChart() {
  const angles = FIELDS.map((_, index) => (2 * Math.PI * index) / FIELDS.length - Math.PI / 2);
  const dataPoints = FIELDS.map((field, index) => polar(angles[index], (field.value / 100) * RADIUS));
  const dataPath = toPath(dataPoints);

  return (
    <section className="w-full max-w-[34rem] text-zinc-900">
      <div className="flex justify-center">
        <svg
          className="h-auto w-full max-w-[520px]"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label="Editable skills radar chart"
        >
          {Array.from({ length: LEVELS }).map((_, levelIndex) => {
            const radius = (RADIUS * (levelIndex + 1)) / LEVELS;
            const points = angles.map((angle) => polar(angle, radius));

            return (
              <path
                key={levelIndex}
                d={toPath(points)}
                fill="none"
                stroke="#d4d4d8"
                strokeWidth="0.7"
              />
            );
          })}

          {angles.map((angle, index) => {
            const outer = polar(angle, RADIUS);

            return (
              <line
                key={index}
                x1={CENTER}
                y1={CENTER}
                x2={outer.x.toFixed(2)}
                y2={outer.y.toFixed(2)}
                stroke="#d4d4d8"
                strokeWidth="0.7"
              />
            );
          })}

          <path
            d={dataPath}
            fill="rgba(24,24,27,0.08)"
            stroke="#18181b"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {dataPoints.map((point, index) => (
            <circle key={index} cx={point.x.toFixed(2)} cy={point.y.toFixed(2)} r="3.5" fill="#18181b" />
          ))}

          {FIELDS.map((field, index) => {
            const labelPoint = polar(angles[index], RADIUS + 48);
            const anchor = labelPoint.x < CENTER - 4 ? "end" : labelPoint.x > CENTER + 4 ? "start" : "middle";

            return (
              <text
                key={`${field.label}-${index}`}
                x={labelPoint.x.toFixed(2)}
                y={labelPoint.y.toFixed(2)}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize="15"
                fill="#52525b"
                fontFamily="monospace"
              >
                {field.label}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

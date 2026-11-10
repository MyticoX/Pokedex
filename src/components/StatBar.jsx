import { STAT_MAX } from '../utils/pokemon'
import '../css/StatBar.css'

function StatBar({ label, icon, value, color }) {
  const percent = Math.min(100, (value / STAT_MAX) * 100)
  return (
    <div className="stat">
      <span className="stat__label">
        <span aria-hidden="true">{icon}</span> {label}
      </span>
      <span className="stat__value">{value}</span>
      <div
        className="stat__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={STAT_MAX}
        aria-label={label}
      >
        <div
          className="stat__fill"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
    </div>
  )
}

export default StatBar

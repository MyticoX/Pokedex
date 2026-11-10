import '../css/Backdrop.css'

// Pokébolas flutuando ao fundo (puro CSS, sem custo de JS).
const BALLS = [
  { size: 90, left: '6%', top: '14%', dur: 18, delay: 0 },
  { size: 150, left: '84%', top: '10%', dur: 24, delay: -6 },
  { size: 60, left: '22%', top: '62%', dur: 15, delay: -3 },
  { size: 120, left: '70%', top: '58%', dur: 21, delay: -9 },
  { size: 70, left: '92%', top: '82%', dur: 17, delay: -4 },
  { size: 110, left: '40%', top: '86%', dur: 26, delay: -12 },
  { size: 50, left: '55%', top: '30%', dur: 14, delay: -7 },
]

function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      {BALLS.map((b, i) => (
        <img
          key={i}
          src="/pokeball.svg"
          alt=""
          className="backdrop__ball"
          style={{
            width: b.size,
            left: b.left,
            top: b.top,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Backdrop

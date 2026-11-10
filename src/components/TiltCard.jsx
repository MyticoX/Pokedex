import useTilt from '../hooks/useTilt'
import '../css/TiltCard.css'

// Envolve qualquer conteúdo (carta oficial ou carta gerada) com inclinação 3D,
// brilho que segue o mouse e efeito holográfico. Com `idle`, a carta se anima
// sozinha (balanço + brilho) enquanto o mouse não está sobre ela.
function TiltCard({ children, className = '', max = 20, idle = false }) {
  const { ref, handlers } = useTilt({ max })

  return (
    <div className="tilt-stage">
      <div ref={ref} className={`tilt ${idle ? 'tilt--idle' : ''} ${className}`} {...handlers}>
        <div className="tilt__content">{children}</div>
        <div className="tilt__holo" aria-hidden="true" />
        <div className="tilt__glare" aria-hidden="true" />
      </div>
    </div>
  )
}

export default TiltCard

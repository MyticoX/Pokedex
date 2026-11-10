import { useCallback, useRef } from 'react'

/**
 * Efeito de inclinação 3D que segue o mouse.
 * Não usa estado: grava CSS variables direto no elemento (--rx, --ry, --mx, --my, --glare),
 * então não causa re-render a cada movimento do mouse.
 */
export default function useTilt({ max = 12 } = {}) {
  const ref = useRef(null)

  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current
      // O efeito segue o mouse (ação do usuário), então vale mesmo com "reduzir movimento".
      if (!el || e.pointerType === 'touch') return

      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height

      el.dataset.tilting = 'true'
      el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`)
      el.style.setProperty('--rx', `${-(py - 0.5) * 2 * max}deg`)
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
      el.style.setProperty('--glare', '1')
      el.style.setProperty('--lift', '1.05')
    },
    [max],
  )

  const onPointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.dataset.tilting = 'false'
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--glare', '0')
    el.style.setProperty('--lift', '1')
  }, [])

  return { ref, handlers: { onPointerMove, onPointerLeave } }
}

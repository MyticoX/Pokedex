import Modal from './Modal'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import { STATS, getPalette, formatId, totalStats } from '../utils/pokemon'
import '../css/ComparePanel.css'

// Barra flutuante com os selecionados + modal de comparação lado a lado.
export function CompareBar({ selected, onRemove, onOpen, onClear }) {
  if (selected.length === 0) return null
  return (
    <div className="compare-bar">
      <span className="compare-bar__title">⚔️ Comparar:</span>
      {selected.map((p) => (
        <span key={p.id} className="compare-bar__chip">
          {p.name}
          <button onClick={() => onRemove(p.id)} aria-label={`Remover ${p.name}`}>
            ✕
          </button>
        </span>
      ))}
      {selected.length < 2 && <span className="compare-bar__hint">escolha mais 1</span>}
      <button
        className="btn btn--accent"
        disabled={selected.length < 2}
        onClick={onOpen}
      >
        Comparar
      </button>
      <button className="btn btn--ghost" onClick={onClear}>
        Limpar
      </button>
    </div>
  )
}

export function CompareModal({ a, b, onClose }) {
  const totalA = totalStats(a)
  const totalB = totalStats(b)

  const cell = (va, vb) => {
    if (va === vb) return ['', '']
    return va > vb ? ['win', 'lose'] : ['lose', 'win']
  }

  return (
    <Modal onClose={onClose} wide>
      <div className="compare">
        <h2>⚔️ Comparação</h2>
        <div className="compare__grid">
          {[a, b].map((p) => (
            <div
              key={p.id}
              className="compare__head"
              style={{ '--c1': getPalette(p).c1 }}
            >
              <PokemonImage pokemon={p} className="compare__img" />
              <h3>
                {p.name} <small>{formatId(p.id)}</small>
              </h3>
              <div className="compare__types">
                {p.types.map((t) => (
                  <TypeBadge key={t.id} name={t.name} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <table className="compare__table">
          <tbody>
            {STATS.map((s) => {
              const [ca, cb] = cell(a.stats[s.key], b.stats[s.key])
              return (
                <tr key={s.key}>
                  <td className={ca}>{a.stats[s.key]}</td>
                  <th>{s.icon} {s.label}</th>
                  <td className={cb}>{b.stats[s.key]}</td>
                </tr>
              )
            })}
            <tr className="compare__total">
              <td className={cell(totalA, totalB)[0]}>{totalA}</td>
              <th>Total</th>
              <td className={cell(totalA, totalB)[1]}>{totalB}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

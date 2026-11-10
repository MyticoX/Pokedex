import { typeColor, TYPE_EMOJI } from '../utils/pokemon'
import '../css/TypeBadge.css'

function TypeBadge({ name, onClick, active = false }) {
  const Tag = onClick ? 'button' : 'span'
  return (
    <Tag
      className={`type-badge ${onClick ? 'type-badge--button' : ''} ${active ? 'is-active' : ''}`}
      style={{ '--type-color': typeColor(name) }}
      onClick={onClick}
    >
      <span aria-hidden="true">{TYPE_EMOJI[name]}</span> {name}
    </Tag>
  )
}

export default TypeBadge

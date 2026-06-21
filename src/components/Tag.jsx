export default function Tag({ label, variant = 'pink' }) {
  return (
    <span className={`tag tag--${variant}`}>{label}</span>
  )
}

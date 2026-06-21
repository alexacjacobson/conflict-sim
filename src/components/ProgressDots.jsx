export default function ProgressDots({ total, current }) {
  return (
    <div className="progress-dots">
      {Array.from({ length: total }, (_, i) => {
        let className = 'progress-dot'
        if (i === current) className += ' progress-dot--active'
        else if (i < current) className += ' progress-dot--complete'
        return <div key={i} className={className} />
      })}
    </div>
  )
}

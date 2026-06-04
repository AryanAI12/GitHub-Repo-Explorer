function SkeletonLoader() {
  return (
    <div className="skeleton-wrap">
      <div className="skeleton-profile">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line w60"></div>
          <div className="skeleton-line w40"></div>
          <div className="skeleton-line w80"></div>
        </div>
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-line w50"></div>
          <div className="skeleton-line w90"></div>
          <div className="skeleton-line w30"></div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
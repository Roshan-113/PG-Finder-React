// Enhanced compatibility meter with animations - Day 12
export function CompatibilityMeter({ score }) {
  const getColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 500 }}>Compatibility Score</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getColor(score) }}>
          {score}%
        </span>
      </div>
      <div style={{ 
        width: '100%', 
        height: '8px', 
        backgroundColor: '#e5e7eb', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${score}%`, 
          height: '100%', 
          backgroundColor: getColor(score),
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );
}

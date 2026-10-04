export default function Breadcrumbs({ items, onNavigate }) {
  if (!items || items.length <= 1) return null;

  const handleClick = (e, item) => {
    if (onNavigate && item.url) {
      try {
        const urlObj = new URL(item.url, "https://www.hotelpumerai.com");
        const route = urlObj.pathname;
        e.preventDefault();
        onNavigate({ route });
      } catch (err) {
        // Fallback to normal anchor click
      }
    }
  };

  return (
    <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
      <div className="section-container">
        <ol className="breadcrumbs-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.url || index} className="breadcrumb-item">
                {isLast ? (
                  <span className="breadcrumb-current" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <a
                      href={item.url}
                      className="breadcrumb-link"
                      onClick={(e) => handleClick(e, item)}
                    >
                      {item.name}
                    </a>
                    <span className="breadcrumb-separator" aria-hidden="true">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

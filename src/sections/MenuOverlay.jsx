import { useEffect, useRef, useState } from "react";
import { menusData } from "../data/menus.js";

function VegMark({ className = "" }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-label="Vegetarian"
      role="img"
    >
      <rect x="1" y="1" width="14" height="14" rx="2" stroke="#2E7D32" strokeWidth="2" />
      <circle cx="8" cy="8" r="4" fill="#2E7D32" />
    </svg>
  );
}

function NonVegMark({ className = "" }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-label="Non-Vegetarian"
      role="img"
    >
      <rect x="1" y="1" width="14" height="14" rx="2" stroke="#D32F2F" strokeWidth="2" />
      <circle cx="8" cy="8" r="4" fill="#D32F2F" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4B978"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function MenuOverlay({
  isOpen,
  menuKey = "veg",
  onClose,
  selections = {},
  onUpdateQty,
  onClearSelection,
  triggerButtonRef,
}) {
  const dialogRef = useRef(null);
  const menu = menusData[menuKey] || menusData.veg;
  const isVegMenu = menuKey === "veg";

  const currentSelection = selections[menuKey] || {};
  const totalCount = Object.values(currentSelection).reduce((sum, q) => sum + (q || 0), 0);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Focus trap & Escape key
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus initial element
    const dialog = dialogRef.current;
    if (dialog) {
      const focusableElements = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus({ preventScroll: true });
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && dialog) {
        const focusables = dialog.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (triggerButtonRef?.current) {
        triggerButtonRef.current.focus({ preventScroll: true });
      }
    };
  }, [isOpen, onClose, triggerButtonRef]);

  if (!isOpen) return null;

  const handleOrderNow = () => {
    if (totalCount === 0) return;

    // Build items list
    const itemsLines = [];
    menu.categories.forEach((cat) => {
      cat.items.forEach((item) => {
        const qty = currentSelection[item.id];
        if (qty && qty > 0) {
          itemsLines.push(`- ${item.name} x ${qty}`);
        }
      });
    });

    const msg = `Hi Hotel Pumerai, I would like to place an order from ${menu.restaurant}:\n${itemsLines.join("\n")}`;
    const url = `https://wa.me/919845423223?text=${encodeURIComponent(msg)}`;

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="menu-overlay-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className={`menu-overlay-panel ${isVegMenu ? "is-veg-theme" : "is-nonveg-theme"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-dialog-title"
      >
        {/* Header */}
        <header className="menu-overlay-header">
          <div className="menu-header-titles">
            <h2 id="menu-dialog-title" className="menu-overlay-title">
              {menu.restaurant}
            </h2>
            <p className="menu-overlay-hours">{menu.hours}</p>
          </div>
          <button
            type="button"
            className="menu-overlay-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        {/* Sticky Action Row: Big Order Button + Clear link */}
        <div className="menu-sticky-order-bar">
          <div className="menu-order-btn-row">
            <button
              type="button"
              className={`menu-order-now-btn ${totalCount === 0 ? "is-disabled" : ""}`}
              onClick={handleOrderNow}
              disabled={totalCount === 0}
              aria-disabled={totalCount === 0}
              aria-label={totalCount > 0 ? `Order now, ${totalCount} dishes selected` : "Select dishes to order"}
            >
              <span>{totalCount > 0 ? `Order now (${totalCount})` : "Select dishes to order"}</span>
            </button>
            {totalCount > 0 && (
              <button
                type="button"
                className="menu-clear-selection-btn"
                onClick={() => onClearSelection(menuKey)}
                aria-label="Clear all selected dishes"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs (shown only if > 1 category) */}
          {menu.categories.length > 1 && (
            <div className="menu-category-tabs-strip" role="tablist" aria-label="Menu categories">
              {menu.categories.map((cat, idx) => {
                const isActive = idx === activeCategoryIndex;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    role="tab"
                    id={`menu-cat-tab-${idx}`}
                    aria-selected={isActive}
                    className={`menu-category-tab ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveCategoryIndex(idx)}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Scrollable Content: Categories & Dishes */}
        <div className="menu-dishes-scroll-content">
          {menu.categories.map((cat, catIdx) => {
            // If category tabs exist, show only active category
            if (menu.categories.length > 1 && catIdx !== activeCategoryIndex) {
              return null;
            }

            return (
              <section key={cat.name} className="menu-category-section">
                {menu.categories.length > 1 && (
                  <h3 className="menu-category-name">{cat.name}</h3>
                )}

                <div className="menu-dishes-list" role="list">
                  {cat.items.map((item) => {
                    const qty = currentSelection[item.id] || 0;
                    const isSelected = qty > 0;

                    return (
                      <article
                        key={item.id}
                        className={`menu-dish-card ${isSelected ? "is-selected" : ""}`}
                        aria-pressed={isSelected}
                        role="listitem"
                      >
                        <div className="dish-info-col">
                          <div className="dish-title-row">
                            <span className="dish-food-mark" aria-hidden="true">
                              {item.isVeg ? <VegMark /> : <NonVegMark />}
                            </span>
                            <h4 className="dish-name">{item.name}</h4>
                            {isSelected && (
                              <span className="dish-selected-badge" title="Selected" aria-hidden="true">
                                <CheckIcon />
                              </span>
                            )}
                          </div>
                          <p className="dish-desc">{item.description}</p>
                          {menu.showPrices && item.price && (
                            <span className="dish-price">{item.price}</span>
                          )}
                        </div>

                        <div className="dish-action-col">
                          {qty === 0 ? (
                            <button
                              type="button"
                              className="dish-add-btn"
                              onClick={() => onUpdateQty(menuKey, item.id, 1)}
                              aria-label={`Add ${item.name}`}
                            >
                              Add
                            </button>
                          ) : (
                            <div className="dish-qty-stepper" aria-label={`Quantity for ${item.name}`}>
                              <button
                                type="button"
                                className="stepper-btn stepper-minus"
                                onClick={() => onUpdateQty(menuKey, item.id, qty - 1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                &minus;
                              </button>
                              <span className="stepper-value" aria-live="polite">
                                {qty}
                              </span>
                              <button
                                type="button"
                                className="stepper-btn stepper-plus"
                                onClick={() => onUpdateQty(menuKey, item.id, Math.min(20, qty + 1))}
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                &#43;
                              </button>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

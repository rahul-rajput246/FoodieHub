import React, { useState, useEffect, useCallback } from "react";
import VegBadge from "./VegBadge";
import "./CustomiseItemModal.css";
import { normalizeImageUrl } from "../config";

export default function CustomiseItemModal({ isOpen, item, onClose, onAddToCart }) {
  const variations = Array.isArray(item?.variations) ? item.variations : [];
  const addons = Array.isArray(item?.addons) ? item.addons : [];

  // Default variation to first option if variations exist
  const [selectedVariation, setSelectedVariation] = useState(() => {
    return variations.length > 0 ? variations[0] : null;
  });

  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleClose = useCallback(() => {
    document.body.style.removeProperty("overflow");
    if (typeof onClose === "function") {
      onClose();
    }
  }, [onClose]);

  // Lock body scroll while modal is active, and cleanly unlock on unmount/close
  useEffect(() => {
    if (!isOpen || !item) {
      document.body.style.removeProperty("overflow");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (previousOverflow) {
        document.body.style.overflow = previousOverflow;
      } else {
        document.body.style.removeProperty("overflow");
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, item, handleClose]);

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  // Safe early return AFTER all hooks
  if (!isOpen || !item) {
    return null;
  }

  // Pricing calculations
  const basePrice = Number(item.food_price || 0);
  const variationDelta = selectedVariation ? Number(selectedVariation.price || 0) : 0;
  const addonsDelta = selectedAddons.reduce((sum, a) => sum + Number(a.price || 0), 0);
  const unitPrice = basePrice + variationDelta + addonsDelta;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const varKey = selectedVariation ? `v_${selectedVariation.id}` : "v_std";
    const addonKey =
      selectedAddons.length > 0
        ? `a_${selectedAddons
            .map((a) => a.id)
            .sort((a, b) => String(a).localeCompare(String(b)))
            .join("_")}`
        : "a_none";

    const cartKey = `item_${item.id}_${varKey}_${addonKey}`;

    // Ensure scrolling is restored immediately
    document.body.style.removeProperty("overflow");

    if (typeof onAddToCart === "function") {
      onAddToCart({
        id: item.id,
        cart_key: cartKey,
        qty: quantity,
        selected_variation: selectedVariation,
        selected_addons: selectedAddons,
        item_price: unitPrice,
        food_item: item,
      });
    }

    handleClose();
  };

  return (
    <div
      className="customise_modal_overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="customise_modal_dialog">
        {/* Banner with image */}
        {item.image_url && (
          <div className="customise_modal_hero">
            <img
              src={normalizeImageUrl(item.image_url)}
              alt={item.food_name}
              loading="eager"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/assets/images/burger.png";
              }}
            />
            <button
              className="customise_modal_close_btn"
              onClick={handleClose}
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}

        {/* Modal Header */}
        <div className="customise_modal_header">
          {!item.image_url && (
            <button
              className="customise_modal_close_btn"
              onClick={handleClose}
              aria-label="Close"
              style={{ position: "relative", top: 0, right: 0, float: "right" }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}

          <div className="customise_modal_title_row">
            <div className="customise_modal_title_box">
              <VegBadge isVeg={item.is_veg} dietaryType={item.dietary_type} size="md" />
              <h3 className="customise_modal_title">{item.food_name}</h3>
            </div>
            <span className="customise_modal_base_price">₹{basePrice}</span>
          </div>

          {item.food_subtitle && (
            <p className="customise_modal_desc">{item.food_subtitle}</p>
          )}
        </div>

        {/* Scrollable Customization Options */}
        <div className="customise_modal_body">
          {/* Variations Section */}
          {variations.length > 0 && (
            <div className="customise_section">
              <div className="customise_section_head">
                <h4 className="customise_section_title">
                  <i className="bi bi-layers text-danger"></i> Choose Variation / Size
                </h4>
                <span className="customise_section_pill required">Required • 1 Option</span>
              </div>

              <div className="customise_option_list">
                {variations.map((v) => {
                  const isSelected = selectedVariation && selectedVariation.id === v.id;
                  const priceDelta = Number(v.price || 0);

                  return (
                    <div
                      key={v.id}
                      className={`customise_option_card ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedVariation(v)}
                    >
                      <div className="customise_option_left">
                        <div className="customise_indicator">
                          {isSelected && <span className="customise_indicator_dot"></span>}
                        </div>
                        <span className="customise_option_name">{v.name}</span>
                      </div>

                      <span className="customise_option_price">
                        {priceDelta > 0 ? `+ ₹${priceDelta}` : "Included"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons Section */}
          {addons.length > 0 && (
            <div className="customise_section">
              <div className="customise_section_head">
                <h4 className="customise_section_title">
                  <i className="bi bi-plus-circle text-danger"></i> Add-ons & Extras
                </h4>
                <span className="customise_section_pill optional">Optional</span>
              </div>

              <div className="customise_option_list">
                {addons.map((a) => {
                  const isSelected = selectedAddons.some((addon) => addon.id === a.id);
                  const addonPrice = Number(a.price || 0);

                  return (
                    <div
                      key={a.id}
                      className={`customise_option_card ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleAddon(a)}
                    >
                      <div className="customise_option_left">
                        <div className="customise_indicator checkbox">
                          {isSelected && (
                            <span className="customise_indicator_check">✓</span>
                          )}
                        </div>
                        <VegBadge isVeg={a.is_veg !== false} size="sm" />
                        <span className="customise_option_name">{a.name}</span>
                      </div>

                      <span className="customise_option_price">
                        + ₹{addonPrice}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer */}
        <div className="customise_modal_footer">
          {/* Quantity Controls */}
          <div className="customise_qty_picker">
            <button
              className="customise_qty_btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="customise_qty_value">{quantity}</span>
            <button
              className="customise_qty_btn"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button className="customise_submit_btn" onClick={handleConfirm}>
            <span>Add to Cart</span>
            <span>•</span>
            <span>₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

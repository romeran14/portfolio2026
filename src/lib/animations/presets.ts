import { gsap } from "gsap";

/**
 * Common GSAP animation presets to maintain consistency across the portfolio
 */
export const animationPresets = {
  /**
   * Fade in and move up (ideal for headings, paragraphs, cards)
   */
  fadeInUp: (element: Element | string, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay }
    );
  },

  /**
   * Staggered fade in (ideal for lists, grids, tags)
   */
  staggerFadeInUp: (elements: Element[] | string, stagger = 0.1) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger }
    );
  },

  /**
   * Reveal text line by line (requires text splitting)
   */
  revealText: (element: Element | string) => {
    return gsap.fromTo(
      element,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, ease: "power4.out", stagger: 0.05 }
    );
  },

  /**
   * Standard parallax effect for background elements
   */
  parallax: (element: Element | string, yPercent = -30) => {
    return gsap.to(element, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },
};

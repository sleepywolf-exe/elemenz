import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Initialize GSAP animations for the horizontal scroll layout
 * @param container - The container reference
 * @param sections - The sections container reference
 */
export const initHorizontalScroll = (
  container: HTMLElement,
  sections: HTMLElement
): ScrollTrigger => {
  // Calculate the total width of all sections
  const totalWidth = Array.from(sections.children).reduce(
    (acc, section) => acc + section.clientWidth,
    0
  );

  // Set the container width equal to the sum of all sections
  gsap.set(sections, {
    width: totalWidth,
  });

  // Create the horizontal scrolling effect
  const scrollTrigger = ScrollTrigger.create({
    trigger: sections,
    pin: true,
    start: "top top",
    end: () => `+=${totalWidth - window.innerWidth}`,
    scrub: 1,
    onUpdate: (self) => {
      // Dispatch custom event for progress bar
      const event = new CustomEvent('scrollProgressUpdate', { 
        detail: { progress: self.progress * 100 } 
      });
      window.dispatchEvent(event);
    },
  });

  // Create animations for horizontal movement
  gsap.to(sections, {
    x: () => -(totalWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: scrollTrigger,
  });

  return scrollTrigger;
};

/**
 * Animate hero section elements
 * @param heading - The heading element to animate
 * @param paragraph - The paragraph element to animate
 * @param buttons - The buttons container element to animate
 * @param image - The image element to animate
 */
export const animateHeroSection = (
  heading: HTMLElement,
  paragraph: HTMLElement,
  buttons: HTMLElement,
  image: HTMLElement
): void => {
  const timeline = gsap.timeline();

  // Split text animation for heading (if SplitText is available)
  try {
    if (typeof (window as any).SplitText !== 'undefined') {
      const splitText = new (window as any).SplitText(heading, { type: "words,chars" });
      
      timeline.from(splitText.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.02,
        duration: 0.7,
        ease: "power2.out"
      });
    } else {
      timeline.from(heading, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: "power2.out"
      });
    }
  } catch (error) {
    // Fallback animation if SplitText fails
    timeline.from(heading, {
      opacity: 0,
      y: 50,
      duration: 0.7,
      ease: "power2.out"
    });
  }

  // Animate paragraph
  timeline.from(
    paragraph,
    {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    },
    "-=0.3"
  );

  // Animate buttons
  timeline.from(
    buttons,
    {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    },
    "-=0.3"
  );

  // Animate image
  timeline.from(
    image,
    {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    },
    "-=0.5"
  );
};

/**
 * Creates animations for section elements as they enter the viewport
 * @param trigger - The trigger element for the animation
 * @param elements - The elements to animate
 * @param isMobile - Whether the device is mobile or not
 */
export const createScrollTriggeredAnimation = (
  trigger: HTMLElement,
  elements: HTMLElement | HTMLElement[],
  isMobile: boolean = false
): void => {
  const elementsArray = Array.isArray(elements) ? elements : [elements];

  gsap.from(elementsArray, {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger,
      start: isMobile ? "top 80%" : "left center",
      end: isMobile ? "bottom center" : "right center",
      toggleActions: "play none none reverse"
    }
  });
};

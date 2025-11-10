import { ScrollTrigger } from "gsap/ScrollTrigger";

export function waitForScrollTrigger(id = "horizontalScroll") {
  return new Promise((resolve) => {
    const check = () => {
      const trigger = ScrollTrigger.getById(id);
      if (trigger) return resolve(trigger);
      requestAnimationFrame(check);
    };
    check();
  });
}

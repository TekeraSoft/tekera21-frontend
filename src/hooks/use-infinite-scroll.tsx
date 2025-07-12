import { useEffect, useRef } from "react";

const useInfiniteScroll = (callback: () => void) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasTriggeredInitially = useRef(false);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        // İlk mount'ta değil, gerçekten scroll sonrası tetiklenirse çağır
        if (entry.isIntersecting && hasTriggeredInitially.current) {
          callback();
        } else {
          hasTriggeredInitially.current = true;
        }
      },
      {
        rootMargin: "100px", // biraz buffer bırak
        threshold: 0.1, // %10 görünürlükten sonra tetiklensin
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [callback]);

  return loaderRef;
};

export default useInfiniteScroll;

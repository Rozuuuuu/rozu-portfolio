import { useState, useRef, useEffect, useCallback } from 'react';

/* ─── Long Hover Scroll Image ─── */
const HoverScrollImage = ({ src, alt, className = '' }) => {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const animRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [imageHeight, setImageHeight] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    const maxScroll = Math.max(0, imageHeight - containerHeight);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current && imgRef.current) {
                setContainerHeight(containerRef.current.getBoundingClientRect().height);
                setImageHeight(imgRef.current.getBoundingClientRect().height);
            }
        };
        const img = new Image();
        img.onload = () => setTimeout(updateDimensions, 100);
        img.src = src;
        const observer = new ResizeObserver(updateDimensions);
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [src]);

    const startScroll = useCallback((direction) => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        const speed = 50;
        const animate = () => {
            setScrollY(current => {
                let next = current;
                if (direction === 'down') {
                    next = Math.min(current + speed * 0.016, maxScroll);
                    if (next < maxScroll) animRef.current = requestAnimationFrame(animate);
                } else {
                    next = Math.max(current - speed * 0.016, 0);
                    if (next > 0) animRef.current = requestAnimationFrame(animate);
                }
                return next;
            });
        };
        animate();
    }, [maxScroll]);

    const handleMouseEnter = () => { setIsHovering(true); startScroll('down'); };
    const handleMouseLeave = () => {
        setIsHovering(false);
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setScrollY(0);
    };
    const handleMouseMove = (e) => {
        if (!isHovering || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        if (animRef.current) cancelAnimationFrame(animRef.current);
        if (e.clientY - rect.top < rect.height / 2) startScroll('up');
        else startScroll('down');
    };

    useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden relative cursor-pointer ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {/* [PERF FIX 4] Image lazy loading and dimensions */}
            <img
                ref={imgRef}
                className="w-full h-auto object-cover object-top"
                src={src}
                alt={alt}
                width="800"
                height="450"
                loading="lazy"
                decoding="async"
                style={{
                    transform: `translateY(-${scrollY}px)`,
                    transition: isHovering ? 'none' : 'transform 0.3s ease-out',
                }}
                draggable={false}
            />
        </div>
    );
};

export default HoverScrollImage;

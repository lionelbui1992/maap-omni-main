import { useInView } from 'react-intersection-observer';

const LazyComponent = ({ children }) => {
    const [inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px',
        threshold: [0.5],
    });

    return inView ? children : null;
};

export default LazyComponent;

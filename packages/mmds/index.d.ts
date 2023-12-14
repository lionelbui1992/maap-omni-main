import 'react';

declare module 'react' {
    interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
        jsx?: boolean;
        global?: boolean;
    }
}

declare module '*.module.css' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.css';

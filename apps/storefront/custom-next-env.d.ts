declare module '*.svg' {
    const content:
        | string
        | StaticImport
        | React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
}

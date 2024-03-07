interface ILoaderProps {
    size: number;
}

const Loader = ({ size }: ILoaderProps) => {
    return (
        <span className="loader" style={{ width: `${size}px`, height: `${size}px`}}></span>
    );
};

export default Loader;

export default function Error({ type, message = "" }) {
    return (
        <div className={type}>
            {message}
        </div>
    );
}
export default function ConverterCard({ type, children }) {
    return (
        <div className={`converter-card ${type}-card`}>{children}</div>
    )
}
export default function ConverterForm({ type, children, purpose, caption }) {
    return (
        <div className={type}>
            <div className={purpose}>
                <label>{caption}</label>
                {children}
            </div>
        </div>
    )
}
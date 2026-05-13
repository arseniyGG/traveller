export default function Select({ options }) {
    return (
        <div className={options.type}>
            <label>{options.header}</label>
            <select value={options.value} onChange={options.handler}>
                {options.options.map(option => (
                    <option key={option.code} value={option.code}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    )
}
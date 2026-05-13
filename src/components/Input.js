export default function Input({ options }) {
    return (
        <input
            type={options.type}
            value={options.value}
            onChange={options.changeHandler}
            onFocus={options.focusHandler}
            min={options.minimal}
            step={options.step}
            placeholder={options.caption} />
    )
}
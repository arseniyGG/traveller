export default function SelectorsGroup({ type, children }) {
    return (
        <div className={`${type}-selectors`}>{children}</div>
    )
}
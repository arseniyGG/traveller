export default function Button({ caption, type, id, handler, children }) {
    return (
        <button className={type} id={id} onClick={handler}>{caption}{children}</button>
    )
}
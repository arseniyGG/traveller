export default function ConvertResult({ handler, toVariable }) {
    return (
        <div className="result">
            <h3>Результат:</h3>
            <div className="result-value">
                <span className="amount">{handler}</span>
                <span>{toVariable}</span>
            </div>
        </div>
    )
}
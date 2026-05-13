import '../components/css/ExportToCSV.css';
import Button from './Button';

export default function ExportToCSV({ expenses, total, budgetLimit, categories }) {
    function getCategoryName(categoryCode) {
        const category = categories.find(c => c.code === categoryCode);
        return category ? `${category.icon} ${category.name}` : categoryCode;
    };

    function exportToCSV() {
        const headers = ['Категория', 'Описание', 'Дата', 'Сумма', 'Валюта'];
        const rows = expenses.map(expense => {
            const category = getCategoryName(expense.category);
            const date = new Date(expense.date).toLocaleDateString('ru-RU');
            const amount = expense.amount.toFixed(2);
            return [category, expense.description, date, amount, expense.currency];
        });

        rows.push(['', '', 'ИТОГО:', total.toFixed(2), 'RUB']);
        if (budgetLimit > 0) {
            rows.push(['', '', 'ЛИМИТ:', budgetLimit.toFixed(2), 'RUB']);
            rows.push(['', '', 'ОСТАТОК:', (budgetLimit - total).toFixed(2), 'RUB']);
        }

        let csvContent = headers.join(';') + '\n';

        rows.forEach(row => {
            const escapedRow = row.map(cell => {
                if (typeof cell === 'string' && (cell.includes(';') || cell.includes('"') || cell.includes('\n'))) {
                    return `"${cell.replace(/"/g, '""')}"`;
                }
                return cell;
            });
            csvContent += escapedRow.join(';') + '\n';
        });

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Button handler={exportToCSV} type="export-csv-btn" title={"Экспортировать в CSV"}>📊 Экспорт в CSV (Excel)</Button>
    );
}
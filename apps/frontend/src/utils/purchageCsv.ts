import { Purchase } from '@/pages/dashboard/apis/getPurchases'

export function toPurchaseCsv(rows: Purchase[]) {
  const columns: Array<{
    header: string
    accessor: (row: Purchase) => unknown
  }> = [
    { header: '날짜', accessor: (r) => r.date },
    { header: '고객명', accessor: (r) => r.customerName },
    { header: '상품명', accessor: (r) => r.productName },
    { header: '가격', accessor: (r) => r.price },
    { header: '수량', accessor: (r) => r.quantity },
  ]

  const escapeCell = (value: unknown) => {
    const s = String(value ?? '')
    if (/[",\n]/.test(s)) {
      return `"${s.replace(/"/g, '""')}"`
    }
    return s
  }

  const headerLine = columns.map((c) => escapeCell(c.header)).join(',')

  const bodyLines = rows.map((row) => columns.map((c) => escapeCell(c.accessor(row))).join(','))

  return [headerLine, ...bodyLines].join('\n')
}

export function downloadPurchaseCsv(rows: Purchase[], filename: string) {
  const csv = toPurchaseCsv(rows)

  const BOM = '\uFEFF'
  const csvWithBom = BOM + csv

  const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`

  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

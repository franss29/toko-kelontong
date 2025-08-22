"use client"

import { useEffect, useState } from "react"
import { CalendarIcon, Download, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { InputLaporanDialog } from "@/components/dashboard/inputLaporanDialog"
import { getLaporanSupplier } from "@/utils/api"

// Export tools
import jsPDF from "jspdf"
import "jspdf-autotable"
import * as XLSX from "xlsx"

export default function LaporanPage() {
  const [date, setDate] = useState({
    from: new Date(2023, 0, 20),
    to: new Date(),
  })
  const [transaksiData, setTransaksiData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [openDialog, setOpenDialog] = useState(false)

  // === LOAD DATA ===
  const loadData = async () => {
    try {
      const data = await getLaporanSupplier()
      console.log("Data dari API:", data)
      setTransaksiData(data)
    } catch (err) {
      console.error("Gagal fetch data:", err)
      setTransaksiData([])
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredData = transaksiData.filter((trx) =>
    trx.supplier?.toLowerCase().includes(search.toLowerCase())
  )

  // === EXPORT PDF ===
  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text("Laporan Supplier", 14, 10)
    const tableColumn = ["ID", "Tanggal", "Supplier", "No. Telepon", "Total Item", "Total Harga"]
    const tableRows: any[] = []

    filteredData.forEach((trx) => {
      const rowData = [
        trx.id,
        trx.tanggal,
        trx.supplier,
        trx.nomor_hp,
        trx.total_item,
        trx.total_harga,
      ]
      tableRows.push(rowData)
    })

    // @ts-ignore
    doc.autoTable(tableColumn, tableRows, { startY: 20 })
    doc.save("laporan-supplier.pdf")
  }

  // === EXPORT EXCEL ===
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Supplier")
    XLSX.writeFile(workbook, "laporan-supplier.xlsx")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Laporan
          </Button>
          <Button variant="outline" onClick={exportToPDF}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={exportToExcel}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <Tabs defaultValue="supplier" className="space-y-4">
        <TabsList>
          <TabsTrigger value="supplier">Laporan Supplier</TabsTrigger>
        </TabsList>

        <TabsContent value="supplier" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Supplier</CardTitle>
              <CardDescription>Lihat riwayat transaksi pembelian dari supplier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* Date Picker */}
                <div className="flex items-center space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
                            </>
                          ) : (
                            format(date.from, "dd/MM/yyyy")
                          )
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="range" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Search */}
                <div className="relative ml-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari supplier..."
                    className="pl-8 w-[250px]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>No. Telepon</TableHead>
                      <TableHead>Total Item</TableHead>
                      <TableHead>Total Harga</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((trx) => (
                        <TableRow key={trx.id}>
                          <TableCell>{trx.id}</TableCell>
                          <TableCell>{trx.tanggal}</TableCell>
                          <TableCell>{trx.supplier}</TableCell>
                          <TableCell>{trx.nomor_hp}</TableCell>
                          <TableCell>{trx.total_item}</TableCell>
                          <TableCell>Rp {trx.total_harga}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          Tidak ada data
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog Input Laporan */}
      <InputLaporanDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSuccess={loadData}
      />
    </div>
  )
}

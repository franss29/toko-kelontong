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
import { InputBarangKeluarDialog } from "@/components/dashboard/inputBarangKeluarDialog"
import { fetchBarang, getSuppliers, getBarangKeluar } from "@/utils/api"
import * as XLSX from "xlsx"

export default function LaporanPage() {
  const [date, setDate] = useState({
    from: new Date(2023, 0, 20),
    to: new Date(),
  })
  const [supplierData, setSupplierData] = useState<any[]>([])
  const [barangData, setBarangData] = useState<any[]>([])
  const [barangKeluarData, setBarangKeluarData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [openDialogSupplier, setOpenDialogSupplier] = useState(false)
  const [openDialogBarangKeluar, setOpenDialogBarangKeluar] = useState(false)

  // === LOAD DATA SUPPLIER ===
  const loadSupplier = async () => {
    try {
      const data = await getSuppliers()
      setSupplierData(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Gagal fetch supplier:", err)
      setSupplierData([])
    }
  }

  // === LOAD DATA STOK ===
  const loadBarang = async () => {
    try {
      const data = await fetchBarang()
      setBarangData(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Gagal fetch stok barang:", err)
      setBarangData([])
    }
  }

  // === LOAD DATA BARANG KELUAR ===
  const loadBarangKeluar = async () => {
    try {
      const data = await getBarangKeluar()
      setBarangKeluarData(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Gagal fetch barang keluar:", err)
      setBarangKeluarData([])
    }
  }

  useEffect(() => {
    loadSupplier()
    loadBarang()
    loadBarangKeluar()
  }, [])

  // === Filter supplier (by nama supplier) ===
  const filteredSupplier = supplierData.filter((trx) =>
    trx.supplier?.toLowerCase().includes(search.toLowerCase())
  )

  // === Filter barang keluar (by nama barang) ===
  const filteredBarangKeluar = barangKeluarData.filter((trx) =>
    trx.nama_barang?.toLowerCase().includes(search.toLowerCase())
  )

  // === EXPORT EXCEL SUPPLIER ===
  const exportToExcelSupplier = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSupplier)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Supplier")
    XLSX.writeFile(workbook, "laporan-supplier.xlsx")
  }

  // === EXPORT EXCEL BARANG KELUAR ===
  const exportToExcelBarangKeluar = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredBarangKeluar)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Barang Keluar")
    XLSX.writeFile(workbook, "barang-keluar.xlsx")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <Tabs defaultValue="supplier" className="space-y-4">
        <TabsList>
          <TabsTrigger value="supplier">Laporan Supplier</TabsTrigger>
          <TabsTrigger value="barang_keluar">Barang Keluar</TabsTrigger>
        </TabsList>

        {/* === TAB SUPPLIER === */}
        <TabsContent value="supplier" className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>Laporan Supplier</CardTitle>
                <CardDescription>Riwayat transaksi pembelian dari supplier</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOpenDialogSupplier(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Tambah Laporan
                </Button>
                <Button variant="outline" onClick={exportToExcelSupplier}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari supplier..."
                  className="pl-8 w-[250px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Table Supplier */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Alamat</TableHead>
                      <TableHead>No. Telepon</TableHead>
                      <TableHead>Total Item</TableHead>
                      <TableHead>Total Harga</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSupplier.length > 0 ? (
                      filteredSupplier.map((trx) => (
                        <TableRow key={trx.id}>
                          <TableCell>{trx.id}</TableCell>
                          <TableCell>
                            {trx.tanggal ? format(new Date(trx.tanggal), "dd/MM/yyyy") : "-"}
                          </TableCell>
                          <TableCell>{trx.supplier}</TableCell>
                          <TableCell>{trx.alamat_supplier}</TableCell>
                          <TableCell>{trx.nomor_hp}</TableCell>
                          <TableCell>{trx.total_item}</TableCell>
                          <TableCell>Rp {trx.total_harga}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
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

        {/* === TAB BARANG KELUAR === */}
        <TabsContent value="barang_keluar" className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>Barang Keluar</CardTitle>
                <CardDescription>Riwayat barang keluar (penjualan)</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOpenDialogBarangKeluar(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Tambah Barang Keluar
                </Button>
                <Button variant="outline" onClick={exportToExcelBarangKeluar}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari barang..."
                  className="pl-8 w-[250px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Table Barang Keluar */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead>Total Item</TableHead>
                      <TableHead>Harga Jual</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBarangKeluar.length > 0 ? (
                      filteredBarangKeluar.map((trx) => (
                        <TableRow key={trx.id}>
                          <TableCell>{trx.id}</TableCell>
                          <TableCell>
                            {trx.tanggal ? format(new Date(trx.tanggal), "dd/MM/yyyy") : "-"}
                          </TableCell>
                          <TableCell>{trx.nama_barang}</TableCell>
                          <TableCell>{trx.total_item}</TableCell>
                          <TableCell>Rp {trx.harga_jual}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
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

      {/* Dialog Input Supplier */}
      <InputLaporanDialog
        open={openDialogSupplier}
        onOpenChange={setOpenDialogSupplier}
        onSuccess={loadSupplier}
      />

      {/* Dialog Input Barang Keluar */}
      <InputBarangKeluarDialog
        open={openDialogBarangKeluar}
        onOpenChange={setOpenDialogBarangKeluar}
        onSuccess={loadBarangKeluar}
      />
    </div>
  )
}

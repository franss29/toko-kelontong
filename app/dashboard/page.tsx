"use client"

import { useEffect, useState } from "react"
import { CalendarIcon, Download, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { InputLaporanDialog } from "@/components/dashboard/inputLaporanDialog"
import { InputBarangKeluarDialog } from "@/components/dashboard/inputBarangKeluarDialog"
import { InputBarangMasukDialog } from "@/components/dashboard/inputBarangMasukDialog"
import { fetchBarang, getSuppliers, getBarangKeluar, deleteBarangKeluar, getBarangMasuk, deleteBarangMasuk } from "@/utils/api"
import * as XLSX from "xlsx"
import { Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function LaporanPage() {
  const [supplierData, setSupplierData] = useState<any[]>([])
  const [barangData, setBarangData] = useState<any[]>([])
  const [barangKeluarData, setBarangKeluarData] = useState<any[]>([])
  const [barangMasukData, setBarangMasukData] = useState<any[]>([])
  const [search, setSearch] = useState("")

  const [openDialogSupplier, setOpenDialogSupplier] = useState(false)
  const [openDialogBarangKeluar, setOpenDialogBarangKeluar] = useState(false)
  const [openDialogBarangMasuk, setOpenDialogBarangMasuk] = useState(false)

  const [editData, setEditData] = useState<any | null>(null)
  const [editMasukData, setEditMasukData] = useState<any | null>(null)

  // === LOAD DATA ===
  const loadSupplier = async () => {
    try {
      const data = await getSuppliers()
      setSupplierData(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err); setSupplierData([]) }
  }

  const loadBarang = async () => {
    try {
      const data = await fetchBarang()
      setBarangData(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err); setBarangData([]) }
  }

  const loadBarangKeluar = async () => {
    try {
      const data = await getBarangKeluar()
      setBarangKeluarData(Array.isArray(data.records) ? data.records : [])
    } catch (err) { console.error(err); setBarangKeluarData([]) }
  }

  const loadBarangMasuk = async () => {
    try {
      const data = await getBarangMasuk()
      const records = Array.isArray(data.records) ? data.records : []
      // urutkan dari total_item terbesar
      setBarangMasukData(records.sort((a, b) => b.total_item - a.total_item))
    } catch (err) { console.error(err); setBarangMasukData([]) }
  }

  useEffect(() => {
    loadSupplier()
    loadBarang()
    loadBarangKeluar()
    loadBarangMasuk()
  }, [])

  // === FILTER ===
  const filteredSupplier = supplierData.filter(trx =>
    trx.supplier?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredBarangKeluar = barangKeluarData.filter(trx =>
    trx.nama_barang?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredBarangMasuk = barangMasukData.filter(trx =>
    trx.nama_barang?.toLowerCase().includes(search.toLowerCase())
  )

  // === EXPORT EXCEL ===
  const exportToExcelSupplier = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSupplier)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Supplier")
    XLSX.writeFile(workbook, "laporan-supplier.xlsx")
  }

  const exportToExcelBarangKeluar = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredBarangKeluar)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Barang Keluar")
    XLSX.writeFile(workbook, "barang-keluar.xlsx")
  }

  const exportToExcelBarangMasuk = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredBarangMasuk)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Barang Masuk")
    XLSX.writeFile(workbook, "barang-masuk.xlsx")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      <Tabs defaultValue="supplier" className="space-y-4">
        <TabsList>
          <TabsTrigger value="supplier">Laporan Supplier</TabsTrigger>
          <TabsTrigger value="barang_keluar">Barang Keluar</TabsTrigger>
          <TabsTrigger value="barang_masuk">Barang Masuk</TabsTrigger>
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
                  <Download className="mr-2 h-4 w-4" /> Export Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Cari supplier..." className="pl-8 w-[250px]" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Alamat</TableHead>
                      <TableHead>No. Telepon</TableHead>
                      <TableHead>Total Item</TableHead>
                      <TableHead>Total Harga</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSupplier.length > 0 ? filteredSupplier.map((trx, idx) => (
                      <TableRow key={trx.id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{trx.tanggal ? format(new Date(trx.tanggal), "dd/MM/yyyy") : "-"}</TableCell>
                        <TableCell>{trx.supplier}</TableCell>
                        <TableCell>{trx.alamat_supplier}</TableCell>
                        <TableCell>{trx.nomor_hp}</TableCell>
                        <TableCell>{trx.total_item}</TableCell>
                        <TableCell>Rp {trx.total_harga}</TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">Tidak ada data</TableCell>
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
                  <Download className="mr-2 h-4 w-4" /> Export Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Cari barang..." className="pl-8 w-[250px]" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead>Total Item</TableHead>
                      <TableHead>Harga Jual</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBarangKeluar.length > 0 ? filteredBarangKeluar.map((trx, idx) => (
                      <TableRow key={trx.id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{trx.tanggal ? format(new Date(trx.tanggal), "dd/MM/yyyy") : "-"}</TableCell>
                        <TableCell>{trx.nama_barang}</TableCell>
                        <TableCell>{trx.total_item}</TableCell>
                        <TableCell>Rp {trx.harga_jual}</TableCell>
                        <TableCell className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => { setEditData(trx); setOpenDialogBarangKeluar(true) }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={async () => {
                            if (!confirm("Yakin ingin menghapus data ini?")) return
                            try {
                              const result = await deleteBarangKeluar(trx.id)
                              if (result.success) {
                                toast.success("Data berhasil dihapus")
                                loadBarangKeluar()
                              } else { toast.error(result.message) }
                            } catch (err) { console.error(err); toast.error("Terjadi kesalahan saat menghapus data") }
                          }}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">Tidak ada data</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* === TAB BARANG MASUK === */}
        <TabsContent value="barang_masuk" className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>Barang Masuk</CardTitle>
                <CardDescription>Riwayat barang masuk (stok)</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOpenDialogBarangMasuk(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Tambah Barang Masuk
                </Button>
                <Button variant="outline" onClick={exportToExcelBarangMasuk}>
                  <Download className="mr-2 h-4 w-4" /> Export Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Cari barang..." className="pl-8 w-[250px]" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead>Total Item</TableHead>
                      <TableHead>Harga Beli</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBarangMasuk.length > 0 ? filteredBarangMasuk.map((trx, idx) => (
                      <TableRow key={trx.id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{trx.nama_barang}</TableCell>
                        <TableCell>{trx.total_item}</TableCell>
                        <TableCell>Rp {trx.harga_beli}</TableCell>
                        <TableCell className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => { setEditMasukData(trx); setOpenDialogBarangMasuk(true) }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={async () => {
                            if (!confirm("Yakin ingin menghapus data ini?")) return
                            try {
                              const result = await deleteBarangMasuk(trx.id)
                              if (result.success) {
                                toast.success("Data berhasil dihapus")
                                loadBarangMasuk()
                              } else { toast.error(result.message) }
                            } catch (err) { console.error(err); toast.error("Terjadi kesalahan saat menghapus data") }
                          }}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">Tidak ada data</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <InputLaporanDialog
        open={openDialogSupplier}
        onOpenChange={setOpenDialogSupplier}
        onSuccess={loadSupplier}
      />

      <InputBarangKeluarDialog
        open={openDialogBarangKeluar}
        onOpenChange={(val) => { setOpenDialogBarangKeluar(val); if (!val) setEditData(null) }}
        onSuccess={loadBarangKeluar}
        editData={editData}
        barangMasukData={barangMasukData}
      />
      
      <InputBarangMasukDialog
        open={openDialogBarangMasuk}
        onOpenChange={(val) => { setOpenDialogBarangMasuk(val); if (!val) setEditMasukData(null) }}
        onSuccess={loadBarangMasuk}
        editData={editMasukData}
      />
    </div>
  )
}

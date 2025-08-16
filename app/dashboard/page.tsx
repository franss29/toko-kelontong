"use client"

import { useState } from "react"
import { CalendarIcon, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dummy Data
const transaksiData = [
  { id: "TRX-001", tanggal: "23/05/2023", supplier: "PT Sumber Jaya", alamat: "Jl. Merdeka No.10, Jakarta", telp: "0812-3456-7890", totalItem: 3, totalHarga: "Rp 15.000" },
  { id: "TRX-002", tanggal: "23/05/2023", supplier: "CV Maju Bersama", alamat: "Jl. Melati No.22, Bandung", telp: "0821-9876-5432", totalItem: 5, totalHarga: "Rp 27.500" },
  { id: "TRX-003", tanggal: "24/05/2023", supplier: "UD Sinar Abadi", alamat: "Jl. Kenanga No.5, Surabaya", telp: "0852-1111-2222", totalItem: 2, totalHarga: "Rp 12.000" },
  { id: "TRX-004", tanggal: "24/05/2023", supplier: "PT Cahaya Baru", alamat: "Jl. Pahlawan No.88, Medan", telp: "0877-3333-4444", totalItem: 1, totalHarga: "Rp 7.500" },
  { id: "TRX-005", tanggal: "25/05/2023", supplier: "CV Sukses Makmur", alamat: "Jl. Mawar No.12, Yogyakarta", telp: "0813-2222-5555", totalItem: 4, totalHarga: "Rp 22.000" },
]

const stokData = [
  { kode: "001", nama: "Buku Tulis", kategori: "ATK", stokAwal: 100, masuk: 50, keluar: 30, stokAkhir: 120 },
  { kode: "002", nama: "Pensil 2B", kategori: "Alat Tulis", stokAwal: 20, masuk: 0, keluar: 12, stokAkhir: 8 },
  { kode: "003", nama: "Penghapus", kategori: "Alat Tulis", stokAwal: 50, masuk: 0, keluar: 5, stokAkhir: 45 },
  { kode: "004", nama: "Penggaris 30cm", kategori: "ATK", stokAwal: 25, masuk: 0, keluar: 10, stokAkhir: 15 },
  { kode: "005", nama: "Tip-X", kategori: "Alat Tulis", stokAwal: 15, masuk: 0, keluar: 10, stokAkhir: 5 },
]

export default function LaporanPage() {
  const [date, setDate] = useState({
    from: new Date(2023, 0, 20),
    to: new Date(),
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <Tabs defaultValue="penjualan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="penjualan">Penjualan</TabsTrigger>
          <TabsTrigger value="stok">Stok</TabsTrigger>
        </TabsList>

        {/* Penjualan */}
        <TabsContent value="penjualan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Supplier</CardTitle>
              <CardDescription>Lihat riwayat transaksi penjualan</CardDescription>
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
                  <Input type="search" placeholder="Cari transaksi..." className="pl-8 w-[250px]" />
                </div>
              </div>

              {/* Table tanpa kolom status */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Transaksi</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Alamat Supplier</TableHead>
                      <TableHead>No. Telepon</TableHead>
                      <TableHead>Total Item</TableHead>
                      <TableHead>Total Harga</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transaksiData.map((trx) => (
                      <TableRow key={trx.id}>
                        <TableCell>{trx.id}</TableCell>
                        <TableCell>{trx.tanggal}</TableCell>
                        <TableCell>{trx.supplier}</TableCell>
                        <TableCell>{trx.alamat}</TableCell>
                        <TableCell>{trx.telp}</TableCell>
                        <TableCell>{trx.totalItem}</TableCell>
                        <TableCell>{trx.totalHarga}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stok */}
        <TabsContent value="stok" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Stok</CardTitle>
              <CardDescription>Lihat perubahan stok barang</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      <SelectItem value="atk">ATK</SelectItem>
                      <SelectItem value="alat-tulis">Alat Tulis</SelectItem>
                      <SelectItem value="buku">Buku</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Cari barang..." className="pl-8 w-[250px]" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kode</TableHead>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Stok Awal</TableHead>
                      <TableHead>Masuk</TableHead>
                      <TableHead>Keluar</TableHead>
                      <TableHead>Stok Akhir</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stokData.map((item) => (
                      <TableRow key={item.kode}>
                        <TableCell>{item.kode}</TableCell>
                        <TableCell>{item.nama}</TableCell>
                        <TableCell>{item.kategori}</TableCell>
                        <TableCell>{item.stokAwal}</TableCell>
                        <TableCell>{item.masuk}</TableCell>
                        <TableCell>{item.keluar}</TableCell>
                        <TableCell>{item.stokAkhir}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { CalendarIcon, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LaporanPage() {
  const [date, setDate] = useState({
    from: new Date(2023, 0, 20),
    to: new Date(),
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Laporan</h2>
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
          <TabsTrigger value="keuangan">Keuangan</TabsTrigger>
        </TabsList>

        <TabsContent value="penjualan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Penjualan</CardTitle>
              <CardDescription>Lihat riwayat transaksi penjualan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
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

                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="completed">Selesai</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="canceled">Dibatalkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative ml-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Cari transaksi..." className="pl-8 w-[250px]" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Transaksi</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Pelanggan</TableHead>
                      <TableHead>Total Item</TableHead>
                      <TableHead>Total Harga</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>TRX-001</TableCell>
                      <TableCell>23/05/2023</TableCell>
                      <TableCell>Umum</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>Rp 15.000</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Selesai</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TRX-002</TableCell>
                      <TableCell>23/05/2023</TableCell>
                      <TableCell>Budi</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>Rp 27.500</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Selesai</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TRX-003</TableCell>
                      <TableCell>24/05/2023</TableCell>
                      <TableCell>Siti</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>Rp 12.000</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Selesai</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TRX-004</TableCell>
                      <TableCell>24/05/2023</TableCell>
                      <TableCell>Umum</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>Rp 7.500</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Selesai</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TRX-005</TableCell>
                      <TableCell>25/05/2023</TableCell>
                      <TableCell>Andi</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>Rp 22.000</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Selesai</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                    <TableRow>
                      <TableCell>001</TableCell>
                      <TableCell>Buku Tulis</TableCell>
                      <TableCell>ATK</TableCell>
                      <TableCell>100</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>120</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>002</TableCell>
                      <TableCell>Pensil 2B</TableCell>
                      <TableCell>Alat Tulis</TableCell>
                      <TableCell>20</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>8</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>003</TableCell>
                      <TableCell>Penghapus</TableCell>
                      <TableCell>Alat Tulis</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>45</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>004</TableCell>
                      <TableCell>Penggaris 30cm</TableCell>
                      <TableCell>ATK</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>005</TableCell>
                      <TableCell>Tip-X</TableCell>
                      <TableCell>Alat Tulis</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>5</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keuangan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Keuangan</CardTitle>
              <CardDescription>Ringkasan keuangan toko</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
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

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Rp 3.250.000</div>
                    <p className="text-xs text-muted-foreground">+15% dari periode sebelumnya</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Rp 1.750.000</div>
                    <p className="text-xs text-muted-foreground">+5% dari periode sebelumnya</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Laba Bersih</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Rp 1.500.000</div>
                    <p className="text-xs text-muted-foreground">+25% dari periode sebelumnya</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Margin Keuntungan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">46.2%</div>
                    <p className="text-xs text-muted-foreground">+10% dari periode sebelumnya</p>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Pemasukan</TableHead>
                      <TableHead>Pengeluaran</TableHead>
                      <TableHead>Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>01/05/2023</TableCell>
                      <TableCell>Saldo Awal</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>Rp 5.000.000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>02/05/2023</TableCell>
                      <TableCell>Pembelian Stok</TableCell>
                      <TableCell>Pengeluaran</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>Rp 1.500.000</TableCell>
                      <TableCell>Rp 3.500.000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>05/05/2023</TableCell>
                      <TableCell>Penjualan Harian</TableCell>
                      <TableCell>Pemasukan</TableCell>
                      <TableCell>Rp 750.000</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>Rp 4.250.000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10/05/2023</TableCell>
                      <TableCell>Penjualan Harian</TableCell>
                      <TableCell>Pemasukan</TableCell>
                      <TableCell>Rp 850.000</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>Rp 5.100.000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>15/05/2023</TableCell>
                      <TableCell>Pembayaran Listrik</TableCell>
                      <TableCell>Pengeluaran</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>Rp 250.000</TableCell>
                      <TableCell>Rp 4.850.000</TableCell>
                    </TableRow>
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

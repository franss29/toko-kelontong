"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PengaturanPage() {
  const [tokoInfo, setTokoInfo] = useState({
    nama: "Toko ATK Sejahtera",
    alamat: "Jl. Raya Utama No. 123, Kota",
    telepon: "0812-3456-7890",
    email: "toko.atk@example.com",
  })

  const handleTokoInfoChange = (e) => {
    const { name, value } = e.target
    setTokoInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
      </div>

      <Tabs defaultValue="toko" className="space-y-4">
        <TabsList>
          <TabsTrigger value="toko">Profil Toko</TabsTrigger>
          <TabsTrigger value="pengguna">Pengguna</TabsTrigger>
          <TabsTrigger value="aplikasi">Aplikasi</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="toko" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Toko</CardTitle>
              <CardDescription>Kelola informasi dasar tentang toko Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Toko</Label>
                  <Input id="nama" name="nama" value={tokoInfo.nama} onChange={handleTokoInfoChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telepon">Nomor Telepon</Label>
                  <Input id="telepon" name="telepon" value={tokoInfo.telepon} onChange={handleTokoInfoChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={tokoInfo.email} onChange={handleTokoInfoChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <Input id="alamat" name="alamat" value={tokoInfo.alamat} onChange={handleTokoInfoChange} />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Logo Toko</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-md border flex items-center justify-center bg-muted">Logo</div>
                  <Button variant="outline">Ganti Logo</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Struk</CardTitle>
              <CardDescription>Kustomisasi tampilan struk penjualan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="header">Header Struk</Label>
                  <Input id="header" defaultValue="Toko ATK Sejahtera" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer">Footer Struk</Label>
                  <Input id="footer" defaultValue="Terima kasih telah berbelanja" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-logo" />
                <Label htmlFor="show-logo">Tampilkan logo pada struk</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-pajak" defaultChecked />
                <Label htmlFor="show-pajak">Tampilkan informasi pajak</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pengguna" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengguna</CardTitle>
              <CardDescription>Kelola akun pengguna yang dapat mengakses sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Nama</th>
                      <th className="p-2 text-left font-medium">Username</th>
                      <th className="p-2 text-left font-medium">Role</th>
                      <th className="p-2 text-left font-medium">Status</th>
                      <th className="p-2 text-left font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Admin</td>
                      <td className="p-2">admin</td>
                      <td className="p-2">Administrator</td>
                      <td className="p-2">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Aktif
                        </span>
                      </td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Kasir</td>
                      <td className="p-2">kasir</td>
                      <td className="p-2">Kasir</td>
                      <td className="p-2">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Aktif
                        </span>
                      </td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Button>Tambah Pengguna</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aplikasi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Aplikasi</CardTitle>
              <CardDescription>Konfigurasi umum aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currency">Mata Uang</Label>
                  <Select defaultValue="idr">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mata uang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idr">Rupiah (IDR)</SelectItem>
                      <SelectItem value="usd">Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax">Pajak (%)</Label>
                  <Input id="tax" type="number" defaultValue="10" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Notifikasi</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="stok-menipis" defaultChecked />
                    <Label htmlFor="stok-menipis">Notifikasi stok menipis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="transaksi-baru" defaultChecked />
                    <Label htmlFor="transaksi-baru">Notifikasi transaksi baru</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="light" name="theme" value="light" defaultChecked />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="dark" name="theme" value="dark" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="system" name="theme" value="system" />
                    <Label htmlFor="system">System</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>Kelola backup data aplikasi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Backup Data</h3>
                <p className="text-sm text-muted-foreground">
                  Buat backup data aplikasi Anda untuk mencegah kehilangan data
                </p>
                <Button>Buat Backup Sekarang</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Backup Otomatis</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-backup" />
                  <Label htmlFor="auto-backup">Aktifkan backup otomatis</Label>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Frekuensi Backup</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih frekuensi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Harian</SelectItem>
                        <SelectItem value="weekly">Mingguan</SelectItem>
                        <SelectItem value="monthly">Bulanan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Restore Data</h3>
                <p className="text-sm text-muted-foreground">Pulihkan data dari file backup yang ada</p>
                <div className="flex items-center gap-2">
                  <Input type="file" />
                  <Button variant="outline">Restore</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

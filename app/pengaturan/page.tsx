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
    nama: "Toko Rara",
    alamat: "Medang Lestari JI. Asri Kencana V, A4/L22",
    telepon: "0821-1051-9731",
    email: "mraihank0@gmail.com",
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
        <h2 className="text-3xl font-bold tracking-tight">Profil Toko</h2>
      </div>

      <Tabs defaultValue="toko" className="space-y-4">

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
                  <Input id="header" defaultValue="Toko Rara" />
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


      </Tabs>
    </div>
  )
}

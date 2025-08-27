"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, ChevronDown, Download, Filter, Plus, Search, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AddBarangDialog } from "@/components/barang/addBarangDialog"
import { EditBarangDialog } from "@/components/barang/editBarangDialog"
import { fetchBarang, deleteBarang, type Barang } from "@/utils/api"
import { toast } from "sonner"

export default function BarangPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null)
  const [barangList, setBarangList] = useState<Barang[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Fungsi untuk memuat data barang
  const loadBarang = async () => {
    setIsLoading(true)
    try {
      const data = await fetchBarang()
      setBarangList(data)
    } catch (error) {
      console.error("Error loading barang:", error)
      toast.error("Gagal memuat data barang")
    } finally {
      setIsLoading(false)
    }
  }

  // Memuat data saat komponen dimount
  useEffect(() => {
    loadBarang()
  }, [])

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      loadBarang()
      return
    }

    const filtered = barangList.filter((barang) =>
      barang.nama.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setBarangList(filtered)
  }

  // Fungsi untuk menangani edit barang
  const handleEdit = (barang: Barang) => {
    setSelectedBarang(barang)
    setIsEditDialogOpen(true)
  }

  // Fungsi untuk menangani hapus barang
  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      try {
        const result = await deleteBarang(id)
        if (result.message.includes("berhasil")) {
          toast.success("Barang berhasil dihapus")
          loadBarang() // Muat ulang data setelah penghapusan
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        console.error("Error deleting barang:", error)
        toast.error("Terjadi kesalahan saat menghapus barang")
      }
    }
  }

  // Fungsi cek stok sesuai kategori
  const isLowStock = (barang: Barang) => {
    const stok = Number(barang.stok)
    switch (barang.kategori) {
      case "ATK":
        return stok < 6
      case "Alat Tulis":
        return stok < 12
      case "Buku":
        return stok < 24
      default: // Lainnya
        return stok < 2
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Data Barang</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Barang
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Barang</CardTitle>
          <CardDescription>Kelola semua barang toko Anda di sini.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari barang..."
                  className="pl-8 w-[250px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleSearch}>
                Cari
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Kategori
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>Semua Kategori</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>ATK</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Alat Tulis</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Buku</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Lainnya</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Nama Barang</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Kategori</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Harga</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Stok</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Alamat</TableHead>
                  <TableHead>Nomor HP</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-10">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      </div>
                      <div className="mt-2">Memuat data...</div>
                    </TableCell>
                  </TableRow>
                ) : barangList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-10">
                      Tidak ada data barang
                    </TableCell>
                  </TableRow>
                ) : (
                  barangList.map((barang) => (
                    <TableRow key={barang.id}>
                      <TableCell>{barang.kode}</TableCell>
                      <TableCell>{barang.nama}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{barang.kategori}</Badge>
                      </TableCell>
                      <TableCell>Rp {Number.parseInt(barang.harga).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={isLowStock(barang) ? "bg-red-500 text-white" : ""}
                        >
                          {barang.stok}
                        </Badge>
                      </TableCell>
                      <TableCell>{barang.supplier}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{barang.alamat}</TableCell>
                      <TableCell>{barang.nomor_hp}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(barang)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(barang.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddBarangDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSuccess={loadBarang} />

      {selectedBarang && (
        <EditBarangDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          barang={selectedBarang}
          onSuccess={loadBarang}
        />
      )}
    </div>
  )
}

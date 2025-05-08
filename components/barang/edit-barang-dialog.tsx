"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { updateBarang, type Barang } from "@/utils/api"

interface EditBarangDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  barang: Barang
  onSuccess?: () => void
}

export function EditBarangDialog({ open, onOpenChange, barang, onSuccess }: EditBarangDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Barang>({
    id: "",
    kode: "",
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
  })

  useEffect(() => {
    if (barang) {
      setFormData({
        id: barang.id || "",
        kode: barang.kode || "",
        nama: barang.nama || "",
        kategori: barang.kategori || "",
        harga: barang.harga || "",
        stok: barang.stok || "",
      })
    }
  }, [barang])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateBarang(formData)

      if (result.message && result.message.includes("berhasil")) {
        toast.success("Barang berhasil diperbarui")
        onSuccess && onSuccess()
        onOpenChange(false)
      } else {
        toast.error(result.message || "Gagal memperbarui barang")
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui barang")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Barang</DialogTitle>
          <DialogDescription>Ubah informasi barang di bawah ini.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input id="id" name="id" value={formData.id} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kode" className="text-right">
                Kode
              </Label>
              <Input
                id="kode"
                name="kode"
                value={formData.kode}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nama" className="text-right">
                Nama
              </Label>
              <Input
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kategori" className="text-right">
                Kategori
              </Label>
              <Select value={formData.kategori} onValueChange={(value) => handleSelectChange("kategori", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATK">ATK</SelectItem>
                  <SelectItem value="Alat Tulis">Alat Tulis</SelectItem>
                  <SelectItem value="Buku">Buku</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="harga" className="text-right">
                Harga
              </Label>
              <Input
                id="harga"
                name="harga"
                type="number"
                value={formData.harga}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stok" className="text-right">
                Stok
              </Label>
              <Input
                id="stok"
                name="stok"
                type="number"
                value={formData.stok}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

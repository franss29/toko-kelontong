"use client"

import { useState } from "react"
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
import { toast } from "sonner"
import { createBarangKeluar } from "@/utils/api"   // ⬅️ endpoint baru

interface InputBarangKeluarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function InputBarangKeluarDialog({ open, onOpenChange, onSuccess }: InputBarangKeluarDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nama_barang: "",
    tanggal: new Date().toISOString().split("T")[0],
    total_item: "",
    harga_jual: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!formData.nama_barang.trim()) {
        toast.error("Nama barang wajib diisi")
        return
      }
      if (!formData.total_item || Number.parseInt(formData.total_item) <= 0) {
        toast.error("Total item harus lebih dari 0")
        return
      }
      if (!formData.harga_jual || Number.parseFloat(formData.harga_jual) <= 0) {
        toast.error("Harga jual harus lebih dari 0")
        return
      }

      const payload = {
        ...formData,
        total_item: Number.parseInt(formData.total_item),
        harga_jual: Number.parseFloat(formData.harga_jual),
      }

      const result = await createBarangKeluar(payload)

      if (result.success) {
        toast.success(result.message || "Barang keluar berhasil ditambahkan")
        onSuccess?.()
        onOpenChange(false)
        // Reset form
        setFormData({
          nama_barang: "",
          total_item: "",
          harga_jual: "",
          tanggal: new Date().toISOString().split("T")[0],
        })
      } else {
        toast.error(result.message || "Gagal menambahkan barang keluar")
      }
    } catch (error) {
      console.error("Error creating barang keluar:", error)
      toast.error("Terjadi kesalahan saat menambahkan barang keluar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Input Barang Keluar</DialogTitle>
          <DialogDescription>
            Masukkan informasi barang keluar. ID transaksi akan dibuat otomatis.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Tanggal */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal" className="text-right">
                Tanggal *
              </Label>
              <Input
                id="tanggal"
                name="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Nama Barang */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nama_barang" className="text-right">
                Nama Barang *
              </Label>
              <Input
                id="nama_barang"
                name="nama_barang"
                type="text"
                value={formData.nama_barang}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Total Item */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total_item" className="text-right">
                Total Item *
              </Label>
              <Input
                id="total_item"
                name="total_item"
                type="number"
                min="1"
                value={formData.total_item}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Harga Jual */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="harga_jual" className="text-right">
                Harga Jual *
              </Label>
              <Input
                id="harga_jual"
                name="harga_jual"
                type="number"
                min="0"
                value={formData.harga_jual}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

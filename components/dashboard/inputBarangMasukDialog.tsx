"use client"

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
import { toast } from "sonner"
import { createBarangMasuk, updateBarangMasuk } from "@/utils/api"

interface InputBarangMasukDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  editData?: any | null
}

export function InputBarangMasukDialog({
  open,
  onOpenChange,
  onSuccess,
  editData,
}: InputBarangMasukDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nama_barang: "",
    tanggal: new Date().toISOString().split("T")[0],
    total_item: "",
    harga_beli: "",
  })

  useEffect(() => {
    if (editData) {
      setFormData({
        nama_barang: editData.nama_barang || "",
        tanggal: editData.tanggal
          ? new Date(editData.tanggal).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        total_item: String(editData.total_item || ""),
        harga_beli: String(editData.harga_beli || ""),
      })
    } else {
      setFormData({
        nama_barang: "",
        tanggal: new Date().toISOString().split("T")[0],
        total_item: "",
        harga_beli: "",
      })
    }
  }, [editData, open])

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
      if (!formData.harga_beli || Number.parseFloat(formData.harga_beli) <= 0) {
        toast.error("Harga beli harus lebih dari 0")
        return
      }

      const payload = {
        ...formData,
        total_item: Number.parseInt(formData.total_item),
        harga_beli: Number.parseFloat(formData.harga_beli),
      }

      let result
      if (editData?.id) {
        result = await updateBarangMasuk(editData.id, payload)
      } else {
        result = await createBarangMasuk(payload)
      }

      if (result.success) {
        toast.success(
          result.message ||
            (editData ? "Barang masuk berhasil diperbarui" : "Barang masuk berhasil ditambahkan")
        )
        onSuccess?.()
        onOpenChange(false)
      } else {
        toast.error(result.message || "Gagal menyimpan barang masuk")
      }
    } catch (error) {
      console.error("Error saving barang masuk:", error)
      toast.error("Terjadi kesalahan saat menyimpan barang masuk")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Barang Masuk" : "Input Barang Masuk"}
          </DialogTitle>
          <DialogDescription>
            {editData
              ? "Ubah informasi barang masuk."
              : "Masukkan informasi barang masuk."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Tanggal */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal" className="text-right">Tanggal *</Label>
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
              <Label htmlFor="nama_barang" className="text-right">Nama Barang *</Label>
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
              <Label htmlFor="total_item" className="text-right">Total Item *</Label>
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

            {/* Harga Beli */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="harga_beli" className="text-right">Harga Beli *</Label>
              <Input
                id="harga_beli"
                name="harga_beli"
                type="number"
                min="0"
                value={formData.harga_beli}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : editData ? "Update" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

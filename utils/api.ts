// Definisi tipe data untuk barang
export interface Barang {
  id: string;
  kode: string;
  nama: string;
  kategori: string;
  harga: string;
  stok: string;
  created_at?: string;
}

// Ubah URL API ke lokasi yang benar
const API_URL = "http://localhost/toko-kelontong-api/api";

export async function fetchBarang(): Promise<Barang[]> {
  try {
    console.log("Fetching data from:", `${API_URL}/barang/read.php`);

    const response = await fetch(`${API_URL}/barang/read.php`);
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log("Response text:", responseText);

    // Coba parse respons sebagai JSON
    try {
      const data = JSON.parse(responseText);
      console.log("Parsed data:", data);

      // Periksa apakah data memiliki format yang benar
      if (data.records) {
        return data.records;
      } else if (data.message) {
        console.log("Message from API:", data.message);
        return [];
      } else {
        console.error("Unexpected data format:", data);
        return [];
      }
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return [];
    }
  } catch (error) {
    console.error("Gagal mengambil data barang:", error);
    return [];
  }
}

export async function getBarangById(id: string): Promise<Barang | null> {
  try {
    const response = await fetch(`${API_URL}/barang/read_one.php?id=${id}`);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Gagal mengambil detail barang:", error.message);
    } else {
      console.error("Gagal mengambil detail barang:", error);
    }
    return null;
  }
}

export async function createBarang(
  barangData: Omit<Barang, "id" | "created_at">
) {
  try {
    console.log("Mengirim data ke API:", barangData);
    const response = await fetch(`${API_URL}/barang/create.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(barangData),
    });

    console.log("Status respons:", response.status);

    try {
      const data = await response.json();
      console.log("Respons data:", data);
      return data;
    } catch (e) {
      const text = await response.text();
      console.log("Respons text:", text);
      return { message: text || "Terjadi kesalahan saat menambahkan barang" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Gagal membuat barang:", error.message);
    } else {
      console.error("Gagal membuat barang:", error);
    }
    return { message: "Terjadi kesalahan saat menambahkan barang" };
  }
}

export async function updateBarang(barangData: Barang) {
  try {
    console.log("Mengirim data update ke API:", barangData);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${API_URL}/barang/update.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(barangData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log("Status respons update:", response.status);

    try {
      const data = await response.json();
      console.log("Respons data update:", data);
      return data;
    } catch (e) {
      const text = await response.text();
      console.log("Respons text update:", text);
      return { message: text || "Terjadi kesalahan saat memperbarui barang" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Gagal memperbarui barang:", error.message);
      if (error.name === "AbortError") {
        return {
          message: "Timeout: Permintaan memperbarui barang terlalu lama",
        };
      }
    } else {
      console.error("Gagal memperbarui barang:", error);
    }
    return { message: "Terjadi kesalahan saat memperbarui barang" };
  }
}

export async function deleteBarang(id: string) {
  try {
    console.log("Mengirim permintaan hapus ke API untuk ID:", id);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${API_URL}/barang/delete.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log("Status respons delete:", response.status);

    try {
      const data = await response.json();
      console.log("Respons data delete:", data);
      return data;
    } catch (e) {
      const text = await response.text();
      console.log("Respons text delete:", text);
      return { message: text || "Terjadi kesalahan saat menghapus barang" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Gagal menghapus barang:", error.message);
      if (error.name === "AbortError") {
        return { message: "Timeout: Permintaan menghapus barang terlalu lama" };
      }
    } else {
      console.error("Gagal menghapus barang:", error);
    }
    return { message: "Terjadi kesalahan saat menghapus barang" };
  }
}

export async function searchBarang(query: string): Promise<Barang[]> {
  try {
    const response = await fetch(`${API_URL}/barang/search.php?s=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.records || [];
  } catch (error) {
    if (error instanceof Error) {
      console.error("Gagal mencari barang:", error.message);
    } else {
      console.error("Gagal mencari barang:", error);
    }
    return [];
  }
}



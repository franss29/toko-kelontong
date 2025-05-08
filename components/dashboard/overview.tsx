"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Sen",
    total: 400000,
  },
  {
    name: "Sel",
    total: 300000,
  },
  {
    name: "Rab",
    total: 520000,
  },
  {
    name: "Kam",
    total: 480000,
  },
  {
    name: "Jum",
    total: 580000,
  },
  {
    name: "Sab",
    total: 690000,
  },
  {
    name: "Min",
    total: 390000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

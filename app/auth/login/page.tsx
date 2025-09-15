"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Chrome, Shield, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would integrate with your authentication service
    console.log("Login attempt:", { email, password })

    setIsLoading(false)
  }

  const handleGoogleLogin = () => {
    // Integrate with Google OAuth
    console.log("Google login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
              <span className="font-bold text-xl">Premium</span>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl font-bold mb-6">Selamat Datang Kembali di Premium 3D</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Akses koleksi eksklusif produk 3D premium dengan teknologi terdepan dan pengalaman berbelanja yang tak
                terlupakan.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Akses ke produk eksklusif</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Pengalaman AR/VR premium</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Dukungan pelanggan 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Gratis ongkir untuk member</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Masuk ke Akun Anda</h2>
              <p className="text-gray-600">Masuk untuk melanjutkan berbelanja</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="shadow-xl border-0">
                <CardContent className="p-8 space-y-6">
                  {/* Google Login */}
                  <Button
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:bg-gray-50 bg-transparent"
                    onClick={handleGoogleLogin}
                  >
                    <Chrome className="h-5 w-5 mr-3" />
                    Masuk dengan Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="bg-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-500">atau masuk dengan email</span>
                    </div>
                  </div>

                  {/* Email/Password Form */}
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="nama@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-11 h-12 border-gray-300 focus:border-black focus:ring-black"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password Anda"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-11 pr-11 h-12 border-gray-300 focus:border-black focus:ring-black"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          id="remember"
                          type="checkbox"
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-600">
                          Ingat saya
                        </Label>
                      </div>
                      <Link href="/auth/forgot-password" className="text-sm text-black hover:underline font-medium">
                        Lupa password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sedang masuk..." : "Masuk"}
                    </Button>
                  </form>

                  <div className="text-center text-sm">
                    <span className="text-gray-600">Belum punya akun? </span>
                    <Link href="/auth/register" className="text-black hover:underline font-medium">
                      Daftar sekarang
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center space-x-2 text-sm text-gray-500"
            >
              <Shield className="h-4 w-4 text-green-500" />
              <span>Dilindungi dengan enkripsi SSL 256-bit</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

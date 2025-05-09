"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil, Upload, User } from "lucide-react";
import {
  passwordFormSchema,
  PasswordFormValues,
} from "@/schemas/SellerUserProfileScema";
import { toast } from "@/components/ui/use-toast";
import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import SellerUserProfileTab from "@/components/seller-components/user/tabs/SellerUserProfileTab";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditing } from "@/store/formControlSlice";
import SellerUserPasswordUpdateTab from "@/components/seller-components/user/tabs/SellerUserPasswordUpdateTab";

export default function SellerUserProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { isEditing } = useSelector((state: RootState) => state.formControl);

  // Mock user data
  const [userData, setUserData] = useState({
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "0555 123 4567",
    address: "Kadıköy, İstanbul, Türkiye",
    roles: ["Satıcı", "Premium Üye"],
    memberSince: "Ocak 2022",
    profileImage: "https://fakeimg.pl/100x100",
  });

  // Handle profile image upload
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);

      setUserData({
        ...userData,
        profileImage: imageUrl,
      });
      toast({
        title: "Profil resmi güncellendi",
        description: "Profil resminiz başarıyla güncellendi.",
      });
    }
  }

  return (
    <SellerInnerContainer>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar with user info */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Kullanıcı Bilgileri</CardTitle>
              <CardDescription>
                Hesap detaylarınızı görüntüleyin ve düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-2 border-gray-200">
                  <AvatarImage
                    src={userData.profileImage || "/placeholder.svg"}
                    alt={userData.fullName}
                  />
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>

                {isEditing ? (
                  <>
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        id="profile-image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </>
                ) : (
                  <div className=" p-1 absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full cursor-pointer">
                    <Pencil
                      className="w-4 h-4 "
                      onClick={() => dispatch(setIsEditing(true))}
                    />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold">{userData.fullName}</h3>
              <p className="text-gray-500 text-sm">{userData.email}</p>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {userData.roles.map((role, index) => (
                  <Badge key={index} variant="secondary">
                    {role}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Üyelik Başlangıcı: {userData.memberSince}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side with tabs */}
        <div className="w-full md:w-2/3">
          <Tabs value={"profile"} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="security">Güvenlik</TabsTrigger>
              <TabsTrigger value="preferences">Tercihler</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <SellerUserProfileTab />
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <SellerUserPasswordUpdateTab />
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences"></TabsContent>
          </Tabs>
        </div>
      </div>
    </SellerInnerContainer>
  );
}

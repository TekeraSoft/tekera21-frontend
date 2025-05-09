import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  profileFormSchema,
  ProfileFormValues,
} from "@/schemas/SellerUserProfileScema";
import { setIsEditing } from "@/store/formControlSlice";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Pencil } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "recharts";

function SellerUserProfileTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.User);
  const { isEditing } = useSelector((state: RootState) => state.formControl);

  console.log(userInfo);

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    // defaultValues: {
    //   fullName: userInfo.fullName,
    //   email: userData.email,
    //   phone: userData.phone,
    //   address: userData.address,
    // },
  });

  // Handle profile form submission
  //   function onProfileSubmit(data: ProfileFormValues) {
  //     setUserData({
  //       ...userData,
  //       ...data,
  //     });
  //     setIsEditing(false);
  //     toast({
  //       title: "Profil güncellendi",
  //       description: "Profil bilgileriniz başarıyla güncellendi.",
  //     });
  //   }

  return (
    <Card>
      {/* <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profil Bilgileri</CardTitle>
          <CardDescription>Kişisel bilgilerinizi güncelleyin</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(setIsEditing(!isEditing))}
          className="flex items-center gap-1"
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4" /> İptal
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4" /> Düzenle
            </>
          )}
        </Button>
      </CardHeader> */}
      {/* <CardContent>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Ad Soyad</Label>
              <Input
                id="fullName"
                disabled={!isEditing}
                {...profileForm.register("fullName")}
              />
              {profileForm.formState.errors.fullName && (
                <p className="text-sm text-red-500">
                  {profileForm.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                disabled={!isEditing}
                {...profileForm.register("email")}
              />
              {profileForm.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {profileForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                disabled={!isEditing}
                {...profileForm.register("phone")}
              />
              {profileForm.formState.errors.phone && (
                <p className="text-sm text-red-500">
                  {profileForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Adres</Label>
              <Textarea
                id="address"
                disabled={!isEditing}
                {...profileForm.register("address")}
              />
              {profileForm.formState.errors.address && (
                <p className="text-sm text-red-500">
                  {profileForm.formState.errors.address.message}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <Button type="submit" className="mt-4">
              Değişiklikleri Kaydet
            </Button>
          )}
        </form>
      </CardContent> */}
    </Card>
  );
}

export default SellerUserProfileTab;

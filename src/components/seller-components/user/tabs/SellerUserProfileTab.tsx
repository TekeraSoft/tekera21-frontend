import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  profileFormSchema,
  ProfileFormValues,
} from "@/schemas/SellerUserProfileScema";
import { setIsEditing } from "@/store/formControlSlice";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Pencil, Upload, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function SellerUserProfileTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.User);
  const { isEditing } = useSelector((state: RootState) => state.formControl);

  // Profil resmi yükleme işlemi
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // Gerçek uygulamada buraya upload işlemi yazılır
      toast({
        title: "Profil resmi güncellendi",
        description: "Profil resminiz başarıyla güncellendi.",
      });
    }
  }

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: userInfo.fullName,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    dispatch(setIsEditing(false));
    toast({
      title: "Profil güncellendi",
      description: "Profil bilgileriniz başarıyla güncellendi.",
    });
  }

  return (
    <div>
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
                src={userInfo.image || "/placeholder.svg"}
                alt={userInfo.fullName}
              />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>

            {isEditing ? (
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
            ) : (
              <div className="p-1 absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full cursor-pointer">
                <Pencil
                  className="w-4 h-4"
                  onClick={() => dispatch(setIsEditing(true))}
                />
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold">{userInfo.fullName}</h3>
          <p className="text-gray-500 text-sm">{userInfo.email}</p>

          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {userInfo.role.map(({ role, index }: any) => (
              <Badge key={index} variant="secondary">
                {role}
              </Badge>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <p>Üyelik Başlangıcı: {userInfo.memberSince}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
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
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}

export default SellerUserProfileTab;

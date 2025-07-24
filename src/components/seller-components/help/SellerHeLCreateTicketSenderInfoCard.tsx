import { User, Mail, Store, Hash } from "lucide-react";
import { SellerCompanyProps } from "../../../../types/CompanyTypes/CompanySliceTypes";
import { IUserPayload } from "@/types/AuthTypes";

interface Props {
  user: IUserPayload | null;
  SellerCompanyInfo: SellerCompanyProps;
}

export function SellerHeLCreateTicketSenderInfoCard({
  user,
  SellerCompanyInfo,
}: Props) {
  return (
    <div className="bg-white  ">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2  text-gray-800">
        <User className="w-6 h-6 text-secondary" />
        Gönderen Bilgileri
      </h3>
      <div className="grid grid-cols-2 gap-6 text-gray-700 text-sm border-b pb-4">
        <InfoRow
          icon={<User className="w-5 h-5 text-secondary" />}
          label="Ad Soyad"
          value={user?.nameSurname || "Kullanıcı Adı"}
        />
        <InfoRow
          icon={<Mail className="w-5 h-5 text-secondary" />}
          label="E-posta"
          value={user?.email || "kullanici@ornek.com"}
        />
        <InfoRow
          icon={<Store className="w-5 h-5 text-secondary" />}
          label="Mağaza"
          value={user?.email || "Mağaza Adı"}
        />

        <InfoRow
          icon={<Hash className="w-5 h-5 text-secondary" />}
          label="Firma ID"
          value={SellerCompanyInfo.id || "CMP67890"}
        />
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center bg-gray-100 rounded-md p-2">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm md:text-base">
          {label}
        </p>
        <p className="truncate max-w-xs text-xs md:text-sm">{value}</p>
      </div>
    </div>
  );
}

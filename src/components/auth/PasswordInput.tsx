"use client";

import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check, X } from "lucide-react";

interface AdvancedPasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  showStrengthIndicator?: boolean;
}

export const AdvancedPasswordInput = forwardRef<
  HTMLInputElement,
  AdvancedPasswordInputProps
>(({ error, showStrengthIndicator = false, value, onChange, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const password = String(value ?? "");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Strength checks
  const hasMinLength = password.length >= 6;
  // const hasUpperCase = /[A-Z]/.test(password);
  // const hasLowerCase = /[a-z]/.test(password);
  // const hasNumber = /\d/.test(password);
  // const hasSpecialChar = /[!@#$%^&-+*(),.?":{}|<>]/.test(password);

  const strengthChecks = [
    { label: "En az 6 Karakter", valid: hasMinLength },
    // { label: "En az 1 büyük harf", valid: hasUpperCase },
    // { label: "En az 1 küçük harf", valid: hasLowerCase },
    // { label: "En az 1 rakam", valid: hasNumber },
    // { label: "En az 1 özel karakter", valid: hasSpecialChar },
  ];

  const validChecks = strengthChecks.filter((c) => c.valid).length;
  const strengthLevel =
    validChecks === 5 ? "Strong" : validChecks >= 3 ? "Medium" : "Weak";

  const strengthColor =
    strengthLevel === "Strong"
      ? "text-green-600"
      : strengthLevel === "Medium"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          {...props}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-500" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </div>

      {showStrengthIndicator && password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Password strength:</span>
            <span className={`text-sm font-medium ${strengthColor}`}>
              {strengthLevel}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                strengthLevel === "Strong"
                  ? "bg-green-500"
                  : strengthLevel === "Medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${(validChecks / 5) * 100}%` }}
            />
          </div>

          <div className="space-y-1">
            {strengthChecks.map((check, i) => (
              <div key={i} className="flex items-center space-x-2 text-sm">
                {check.valid ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <X className="h-3 w-3 text-gray-400" />
                )}
                <span
                  className={check.valid ? "text-green-600" : "text-gray-500"}
                >
                  {check.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

AdvancedPasswordInput.displayName = "AdvancedPasswordInput";

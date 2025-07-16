"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check, X } from "lucide-react";

interface AdvancedPasswordInputProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  showStrengthIndicator?: boolean;
}

export function AdvancedPasswordInput({
  id,
  name,
  placeholder,
  required,
  error,
  showStrengthIndicator = false,
}: AdvancedPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password strength validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strengthChecks = [
    { label: "At least 8 characters", valid: hasMinLength },
    { label: "One uppercase letter", valid: hasUpperCase },
    { label: "One lowercase letter", valid: hasLowerCase },
    { label: "One number", valid: hasNumber },
    { label: "One special character", valid: hasSpecialChar },
  ];

  const validChecks = strengthChecks.filter((check) => check.valid).length;
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
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          className="pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-500" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </div>

      {/* Password Strength Indicator */}
      {showStrengthIndicator && password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Password strength:</span>
            <span className={`text-sm font-medium ${strengthColor}`}>
              {strengthLevel}
            </span>
          </div>

          {/* Progress bar */}
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

          {/* Requirements checklist */}
          <div className="space-y-1">
            {strengthChecks.map((check, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
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
}

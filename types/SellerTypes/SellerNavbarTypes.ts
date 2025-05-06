export type User = {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  role: string[];
  isActive: boolean;
};

// Define the menu structure with roles
export type MenuItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  requiredRole: string;
  subItems?: SubMenuItem[];
};

export type SubMenuItem = {
  key: string;
  label: string;
  requiredRole: string;
  href?: string;
  flyout?: FlyoutItem[];
};

export type FlyoutItem = {
  key: string;
  label: string;
  requiredRole: string;
  href: string;
};

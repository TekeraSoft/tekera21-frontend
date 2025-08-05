"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formSchema } from "@/data/users";
import { PopoverClose } from "@radix-ui/react-popover";
import { enUS, tr as dateFnsTr } from "date-fns/locale";
import { useLocale } from "next-intl";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "../ui/tabs";
import DocumentCard from "./DocumentCard";

const countries = [
  { label: "Türkiye", value: "tr" },
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "Italy", value: "it" },
  { label: "Spain", value: "es" },
  { label: "Netherlands", value: "nl" },
];

type CustomerFormValues = z.infer<typeof formSchema>;

interface CustomerEditFormProps {
  customer?: CustomerFormValues;

  onSave: (data: CustomerFormValues) => void;
}

export function AdminCustomerEditForm({
  customer,
  onSave,
}: CustomerEditFormProps) {
  const router = useRouter();

  const defaultValues: Partial<CustomerFormValues> = {
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    address: customer?.address || "",
    city: customer?.city || "",
    state: customer?.state || "",
    postalCode: customer?.postalCode || "",
    country: customer?.country || "us",
    dateOfBirth: customer?.dateOfBirth || new Date(),
    customerRole: customer?.customerRole || "customer",
    notes: customer?.notes || "",
  };

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(data: CustomerFormValues) {
    onSave(data);
  }
  const locale = useLocale() === "tr" ? dateFnsTr : enUS;

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Edit Customer</h1>
        <p className="text-muted-foreground">
          Update customer information. Click save when you're done.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.smith@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State / Province</FormLabel>
                      <FormControl>
                        <Input placeholder="NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 w-full">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col lg:w-52">
                      <FormLabel>Country</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? countries.find(
                                    (country) => country.value === field.value
                                  )?.label
                                : "Select country"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <PopoverClose asChild>
                                <CommandGroup>
                                  {countries.map((country) => (
                                    <CommandItem
                                      value={country.label}
                                      key={country.value}
                                      onSelect={() => {
                                        form.setValue("country", country.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          country.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {country.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </PopoverClose>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "P", { locale: locale })
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            className=""
                            captionLayout="dropdown"
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerRole"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Customer Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select customer type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="superadmin">
                            Super Admin
                          </SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="seller">Seller</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The customer type determines pricing and benefits.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional information about the customer..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Internal notes about the customer that are not visible to
                      them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Belgeler</CardTitle>
          <CardDescription>
            Kayıt sürecinde yüklenen tüm belgeler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="verified">Onaylananlar</TabsTrigger>
              <TabsTrigger value="pending">Bekleyenler</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {customer?.documents.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="verified" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {customer?.documents
                  .filter((doc) => doc.status === "verified")
                  .map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {customer?.documents
                  .filter((doc) => doc.status === "pending")
                  .map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

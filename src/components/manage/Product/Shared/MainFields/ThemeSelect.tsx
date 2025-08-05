import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ImageView from "@/components/shared/ImageView";
import { getAllTheme } from "@/app/actions";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TProductFormData } from "@/types/ProductFormData";
import { genders } from "../Data/Genders";

interface ITagOption {
  id: string;
  name: string;
  image: string;
}

interface IProps {
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

const ThemeSelect = ({
  className,
  disabled,
  emptyMessage,
  placeholder,
}: IProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const filteredTagFields = tagFields.filter(
    (tag) => !genders.includes(tag.value)
  );
  const [open, setOpen] = React.useState(false);
  const [tagOptions, setTagOptions] = React.useState<ITagOption[]>([]);

  React.useEffect(() => {
    async function handleGetAllTheme() {
      const { data, success, message } = await getAllTheme();
      if (success && data) {
        setTagOptions(data);
      }
    }

    handleGetAllTheme();

    return () => {};
  }, []);

  const handleSelect = (value: string) => {
    if (filteredTagFields.find((item) => item.value === value)) {
      const index = tagFields.findIndex((item) => item.value === value);
      removeTag(index);
    } else {
      appendTag({ value });
    }
  };

  const tagFieldsLabels = filteredTagFields.map((tagFields) => {
    const option = tagOptions.find((option) => option.name === tagFields.value);
    return option?.name || tagFields.value;
  });
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Tema Seçimi</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
          >
            <div className="flex flex-wrap gap-1 items-center">
              {filteredTagFields.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : filteredTagFields.length > 2 ? (
                <div className="flex items-center gap-1">
                  <Badge variant="square" className="rounded-sm">
                    {tagFieldsLabels[0]}
                  </Badge>
                  <Badge variant="square" className="rounded-sm">
                    {tagFieldsLabels[1]}
                  </Badge>
                  <Badge variant="square" className="rounded-sm">
                    {tagFieldsLabels[2]}
                  </Badge>
                  <Badge variant="square" className="rounded-sm">
                    {tagFieldsLabels[3]}
                  </Badge>
                  <Badge variant="square" className="rounded-sm">
                    +{tagFields.length - 4}
                  </Badge>
                </div>
              ) : (
                tagFieldsLabels.map((label) => (
                  <Badge key={label} variant="square" className="rounded-sm">
                    {label}
                  </Badge>
                ))
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {tagOptions.map((option) => {
                  const istagFields = tagFields.filter(
                    (item) => item.value === option.name
                  ).length;
                  return (
                    <CommandItem
                      disabled={disabled}
                      key={option.name}
                      value={option.name}
                      onSelect={() => handleSelect(option.name)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {/* {option.image && (
                        <ImageView
                          imageInfo={{ url: option.image, name: option.label }}
                          className="h-4 w-4 rounded"
                        />
                      )} */}
                        <span>{option.name}</span>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            istagFields ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
          {tagFields.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 w-full text-center"
              onClick={() => replace([])}
            >
              Temizle
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeSelect;

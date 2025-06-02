"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Category } from "../../../../../types/AdminTypes/category";
import ImageView from "@/components/shared/ImageView";

interface CategoryNavigationProps {
  categories: Category[];
  onCategorySelect?: (categoryId: string) => void;
  onSubcategorySelect?: (categoryId: string, subcategoryId: string) => void;
  selectedCategory?: string;
  selectedSubcategory?: string;
}

export function CategoryNavigation({
  categories,
  onCategorySelect,
  onSubcategorySelect,
  selectedCategory,
  selectedSubcategory,
}: CategoryNavigationProps) {
  const [openCategories, setOpenCategories] = React.useState<Set<string>>(
    new Set()
  );

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories);
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId);
    } else {
      newOpenCategories.add(categoryId);
    }
    setOpenCategories(newOpenCategories);
  };

  const handleCategoryClick = (categoryId: string) => {
    toggleCategory(categoryId);
    onCategorySelect?.(categoryId);
  };

  const handleSubcategoryClick = (
    categoryId: string,
    subcategoryId: string
  ) => {
    onSubcategorySelect?.(categoryId, subcategoryId);
  };

  return (
    <div className="w-full space-y-1">
      {categories?.map((category) => {
        const isOpen = openCategories.has(category.id);
        const isSelected = selectedCategory === category.id;

        return (
          <Collapsible
            key={category.id}
            open={isOpen}
            onOpenChange={() => toggleCategory(category.id)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant={isSelected ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 h-auto py-2 px-3",
                  isSelected && "bg-secondary"
                )}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center gap-2 flex-1">
                  {category.image ? (
                    <ImageView
                      className="h-5 w-5 rounded object-cover"
                      imageInfo={{
                        url: category.image || "/placeholder.svg",
                        name: category.name,
                      }}
                    />
                  ) : isOpen ? (
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Folder className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="flex-1 text-left">{category.name}</span>
                </div>
                {category.count !== undefined && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                )}
                {category.subcategories?.length > 0 && (
                  <div className="ml-auto">
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
              </Button>
            </CollapsibleTrigger>

            {category.subcategories?.length > 0 && (
              <CollapsibleContent className="space-y-1">
                <div className="ml-6 space-y-1 border-l border-border pl-4">
                  {category?.subcategories?.map((subcategory) => {
                    const isSubSelected =
                      selectedCategory === category.id &&
                      selectedSubcategory === subcategory.id;

                    return (
                      <Button
                        key={subcategory.id}
                        variant={isSubSelected ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start gap-2 h-auto py-1.5 px-3",
                          isSubSelected && "bg-secondary"
                        )}
                        onClick={() =>
                          handleSubcategoryClick(category.id, subcategory.id)
                        }
                      >
                        <div className="flex items-center gap-2 flex-1">
                          {subcategory.image ? (
                            <ImageView
                              className="h-4 w-4 rounded object-cover"
                              imageInfo={{
                                url: subcategory.image || "/placeholder.svg",
                                name: subcategory.name,
                              }}
                            />
                          ) : (
                            <Tag className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className="flex-1 text-left text-sm">
                            {subcategory.name}
                          </span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            )}
          </Collapsible>
        );
      })}
    </div>
  );
}

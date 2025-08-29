"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ISubCategory } from "@/types/AdminTypes/category";

interface SubCategoryTreeSelectProps {
  categories: ISubCategory[];
  selectedValues: { value: string; name: string; image?: string }[];
  onSelectionChange: (
    selected: { value: string; name: string; image?: string }[]
  ) => void;
  className?: string;
}

interface TreeNodeProps {
  category: ISubCategory;
  level: number;
  selectedValues: { value: string; name: string; image?: string }[];
  onToggleSelection: (category: ISubCategory) => void;
  expandedNodes: Set<string>;
  onToggleExpand: (categoryId: string) => void;
  isSelectable: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  category,
  level,
  selectedValues,
  onToggleSelection,
  expandedNodes,
  onToggleExpand,
  isSelectable,
}) => {
  const isSelected = selectedValues.some((item) => item.value === category.id);
  const isExpanded = expandedNodes.has(category.id);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-2 hover:bg-muted/50 rounded-md cursor-pointer",
          level > 0 && "ml-4"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0"
            onClick={() => onToggleExpand(category.id)}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        ) : (
          <div className="w-4" />
        )}

        {isSelectable && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelection(category)}
            className="h-4 w-4"
          />
        )}

        {category.image && (
          <img
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            className="h-6 w-6 rounded object-cover"
          />
        )}

        <span className="text-sm font-medium flex-1">{category.name}</span>

        {isSelected && <Check className="h-4 w-4 text-primary" />}
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-2">
          {category.children.map((child) => (
            <TreeNode
              isSelectable={hasChildren}
              key={child.id}
              category={child}
              level={level + 1}
              selectedValues={selectedValues}
              onToggleSelection={onToggleSelection}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const SubCategoryTreeSelect: React.FC<SubCategoryTreeSelectProps> = ({
  categories,
  selectedValues,
  onSelectionChange,
  className,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleToggleExpand = useCallback(
    (categoryId: string) => {
      const currentScrollTop =
        scrollAreaRef.current?.querySelector(
          "[data-radix-scroll-area-viewport]"
        )?.scrollTop || 0;

      const newExpanded = new Set(expandedNodes);
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
      }
      setExpandedNodes(newExpanded);

      requestAnimationFrame(() => {
        const viewport = scrollAreaRef.current?.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (viewport) {
          viewport.scrollTop = currentScrollTop;
        }
      });
    },
    [expandedNodes]
  );

  const handleToggleSelection = (category: ISubCategory) => {
    const isSelected = selectedValues.some(
      (item) => item.value === category.id
    );

    if (isSelected) {
      const newSelection = selectedValues.filter(
        (item) => item.value !== category.id
      );
      onSelectionChange(newSelection);
    } else {
      const newSelection = [
        ...selectedValues,
        {
          value: category.id,
          name: category.name,
          image: category.image,
        },
      ];
      onSelectionChange(newSelection);
    }
  };

  const handleExpandAll = () => {
    const getAllIds = (cats: ISubCategory[]): string[] => {
      return cats.flatMap((cat) => [cat.id, ...getAllIds(cat.children || [])]);
    };
    setExpandedNodes(new Set(getAllIds(categories)));
  };

  const handleCollapseAll = () => {
    setExpandedNodes(new Set());
  };

  const handleClearSelection = () => {
    onSelectionChange([]);
  };

  return (
    <div className={cn("border rounded-lg", className)}>
      <div className="flex items-center justify-between p-3 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            Alt Kategoriler ({selectedValues.length} seçili)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExpandAll}
            className="text-xs bg-transparent"
          >
            Tümünü Aç
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCollapseAll}
            className="text-xs bg-transparent"
          >
            Tümünü Kapat
          </Button>
          {selectedValues.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClearSelection}
              className="text-xs bg-transparent"
            >
              Seçimi Temizle
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="h-64" ref={scrollAreaRef}>
        <div className="p-2">
          {categories.map((category) => (
            <TreeNode
              isSelectable={!category.children.length}
              key={category.id}
              category={category}
              level={0}
              selectedValues={selectedValues}
              onToggleSelection={handleToggleSelection}
              expandedNodes={expandedNodes}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>
      </ScrollArea>

      {selectedValues.length > 0 && (
        <div className="p-3 border-t bg-muted/30">
          <div className="text-xs text-muted-foreground mb-2">
            Seçilen kategoriler:
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedValues.map((item) => (
              <div
                key={item.value}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-secondary rounded text-xs"
              >
                {item.image && (
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-3 w-3 rounded object-cover"
                  />
                )}
                {item.name}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-3 w-3 p-0 hover:bg-primary/20"
                  onClick={() => {
                    const newSelection = selectedValues.filter(
                      (selected) => selected.value !== item.value
                    );
                    onSelectionChange(newSelection);
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

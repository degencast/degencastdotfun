"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ToggleOption = {
  value: any;
  label?: string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
};
interface ToggleProps {
  value: any;
  options: Array<ToggleOption>;
  onChange?: (value: any) => void;
  disabledValues?: any[];
  onClickDisableOption?: (opt: ToggleOption) => void;
}

export default function ButtonToggle({
  value,
  options,
  onChange,
  disabledValues,
  onClickDisableOption,
}: ToggleProps) {
  const selected = value || options[0].value;

  const handleClick = (value: any) => {
    onChange && onChange(value);
  };

  return (
    <div className="flex rounded-lg bg-primary p-1 w-full h-[68px] max-sm:h-[42px]">
      {options.map((option) => (
        <button
          key={option.value}
          // disabled={disabledValues?.includes(option.value)}
          onClick={() => {
            if (disabledValues?.includes(option.value)) {
              onClickDisableOption && onClickDisableOption(option);
            } else {
              handleClick(option.value);
            }
          }}
          className={cn(
            "flex-1 text-[36px] font-bold rounded-md transition-colors flex justify-center items-center gap-2",
            "max-sm:text-base",
            selected === option.value
              ? "bg-white text-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          {selected === option.value
            ? option.activeIcon || option.icon
            : option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function ButtonToggle2({
  value,
  options,
  onChange,
  disabledValues,
  onClickDisableOption,
}: ToggleProps) {
  const selected = value || options[0].value;

  const handleClick = (value: any) => {
    onChange && onChange(value);
  };

  return (
    <div className="flex rounded-lg bg-tertiary h-[52px] max-sm:h-[30px] overflow-hidden">
      {options.map((option) => (
        <button
          key={option.value}
          // disabled={disabledValues?.includes(option.value)}
          onClick={() => {
            if (disabledValues?.includes(option.value)) {
              onClickDisableOption && onClickDisableOption(option);
            } else {
              handleClick(option.value);
            }
          }}
          className={cn(
            "text-[24px] font-bold transition-colors flex justify-center items-center gap-2 px-3 max-md:px-2",
            "max-sm:text-xs",
            selected === option.value
              ? "bg-primary text-primary-foreground"
              : "bg-tertiary text-tertiary-foreground"
          )}
        >
          {selected === option.value
            ? option.activeIcon || option.icon
            : option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

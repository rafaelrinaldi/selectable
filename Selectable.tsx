import React, {
  createElement,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useId } from "@reach/auto-id";

export type HTMLSelectable = "radio" | "checkbox";
export type HTMLSelectableTag = "form" | "fieldset" | "div";

export interface ISelectable {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label: string;
  value: string;
}

interface IProps {
  as?: HTMLSelectableTag;
  data: ISelectable[];
  multiple?: boolean;
  name?: string;
  onChange?: (values: string[]) => void;
}

export const Selectable: FunctionComponent<IProps> = ({
  as = "form",
  data = [],
  multiple = false,
  name = useId("selectable"),
  onChange = Function(),
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const type: HTMLSelectable = multiple ? "checkbox" : "radio";

  // Update selected items based on `data` whenever it changes
  useEffect(
    () =>
      setSelected(
        new Set(
          data
            .filter(({ checked }) => checked)
            .reduce((accumulator, { value }) => [...accumulator, value], [])
        )
      ),
    [data]
  );

  // Trigger `onChange` passing a list of selected items
  useEffect(() => onChange(Array.from(selected)), [selected]);

  return createElement(
    as,
    {},
    data.map(({ id: _id, value, label, disabled }, index) => {
      const id: string = _id ?? `${name}${index}`;
      const checked: boolean = selected.has(value);

      return (
        <label htmlFor={id} key={id}>
          <input
            id={id}
            name={name}
            type={type}
            disabled={disabled}
            checked={checked}
            onChange={(event) => {
              const next: Set<string> = new Set(selected);
              next.delete(value);
              if (!multiple) next.clear();
              if (event.target.checked) next.add(value);

              setSelected(next);
            }}
          />
          {label}
        </label>
      );
    })
  );
};

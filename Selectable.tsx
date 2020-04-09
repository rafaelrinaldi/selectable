import React, { FunctionComponent, useEffect, useState } from "react";
import { useId } from "@reach/auto-id";

export interface ISelectable {
  id?: string;
  label: string;
  value: string;
  checked?: boolean;
}

interface IProps {
  name?: string;
  data: ISelectable[];
  multiple?: boolean;
  onChange?: (values: string[]) => void;
}

type HTMLSelectable = "radio" | "checkbox";

export const Selectable: FunctionComponent<IProps> = ({
  name = useId("selectable"),
  data = [],
  multiple = false,
  onChange = Function(),
}) => {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(
      data
        .filter(({ checked }) => checked)
        .reduce((accumulator, current) => [...accumulator, current.value], [])
    )
  );
  const type: HTMLSelectable = multiple ? "checkbox" : "radio";

  useEffect(() => onChange(Array.from(selected), selected));

  return (
    <form>
      {data.map(({ id: _id, value, label }, index) => {
        const id: string = _id ?? `${name}${index}`;
        const checked: boolean = selected.has(value);

        return (
          <label htmlFor={id} key={id}>
            <input
              id={id}
              name={name}
              type={type}
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
      })}
    </form>
  );
};

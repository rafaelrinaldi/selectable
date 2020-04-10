import React from "react";
import { Selectable, ISelectable, HTMLSelectableTag } from "./Selectable";
import { action } from "@storybook/addon-actions";
import {
  boolean,
  object,
  optionsKnob as options,
  text,
} from "@storybook/addon-knobs";

export default {
  title: "Selectable",
  component: Selectable,
};

const data: ISelectable[] = [
  { value: "foo", label: "Foo", id: "toninho" },
  { value: "bar", label: "Bar", id: "eita" },
  { value: "baz", label: "Baz" },
  { value: "lorem", label: "Lorem" },
  { value: "ipsum", label: "Ipsum" },
];

const tags = ["form", "fieldset", "div"]
  .reverse()
  .reduce(
    (accumulator, current) => ({ [current]: current, ...accumulator }),
    {}
  );

export const demo = () => {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 10 }}>
      <Selectable
        multiple={boolean("Multiple", false)}
        as={options("Tag", tags, Object.keys(tags)[0] as HTMLSelectableTag, {
          display: "inline-radio",
        })}
        name={text("Name", "selectable")}
        data={object("Data", data)}
        onChange={action("onChange")}
      />
    </div>
  );
};

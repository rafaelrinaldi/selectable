import React from "react";
import { render } from "react-dom";
import { Selectable, ISelectable } from "./Selectable";

const data: ISelectable[] = [
  { value: "foo", label: "Foo", id: "toninho" },
  { value: "bar", label: "Bar", id: "eita" },
  { value: "baz", label: "Baz" },
  { value: "lorem", label: "Lorem", checked: true },
  { value: "ipsum", label: "Ipsum" },
];

const onChange = (value) => console.log("Selected:", value);

const App = () => <Selectable data={data} onChange={onChange} />;

render(<App />, document.querySelector("[data-app]"));

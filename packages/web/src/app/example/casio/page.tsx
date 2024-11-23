"use client";

import Select, {
  SelectItem,
} from "@sparcs-students/web/common/components/Select";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ExamplePage: React.FC = () => {
  const [singleSelected, setSingleSelected] = useState<string>("");
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  const singleSelectItems: SelectItem[] = [
    { label: "Option 1", value: "option1", selectable: true },
    { label: "Option 2", value: "option2", selectable: true },
    { label: "Option 3", value: "option3", selectable: true },
  ];

  const multiSelectItems: SelectItem[] = [
    { label: "Apple", value: "apple", selectable: true },
    { label: "Banana", value: "banana", selectable: true },
    { label: "Cherry", value: "cherry", selectable: true },
    { label: "Grapes", value: "grapes", selectable: true },
  ];

  console.log(errorStatus);

  return (
    <Container>
      <Header>Select Component Example</Header>

      {/* 단일 선택 */}
      <Section>
        <h2>Single Select</h2>
        <Select
          label="Choose an option"
          items={singleSelectItems}
          selectedValue={singleSelected}
          onSelect={value => setSingleSelected(value as string)}
          errorMessage="You must select an option"
          setErrorStatus={setErrorStatus}
        />
        <p>
          <strong>Selected Value:</strong> {singleSelected || "None"}
        </p>
      </Section>

      {/* 다중 선택 */}
      <Section>
        <h2>Multi Select</h2>
        <Select
          label="Select your favorite fruits"
          items={multiSelectItems}
          selectedValue={multiSelected}
          multi
          onSelect={value => setMultiSelected(value as string[])}
          errorMessage="At least one fruit must be selected"
          setErrorStatus={setErrorStatus}
        />
        <p>
          <strong>Selected Values:</strong>{" "}
          {multiSelected.length > 0 ? multiSelected.join(", ") : "None"}
        </p>
      </Section>
    </Container>
  );
};

export default ExamplePage;

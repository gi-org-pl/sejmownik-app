import { render, screen } from "@testing-library/react";
import { EducationStepNotes } from "./EducationStepNotes";

describe("EducationStepNotes", () => {
  it("renders the heading and every item as a list entry", () => {
    render(
      <EducationStepNotes
        heading="Senat może"
        items={[
          { key: "accept", label: "przyjąć ustawę bez zmian" },
          { key: "amend", label: "uchwalić poprawki" },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 4, name: "Senat może" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual(["przyjąć ustawę bez zmian", "uchwalić poprawki"]);
  });
});

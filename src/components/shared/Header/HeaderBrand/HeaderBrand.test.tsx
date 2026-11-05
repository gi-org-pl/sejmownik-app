import { render } from "@testing-library/react";
import { HeaderBrand } from "./HeaderBrand";

describe("<HeaderBrand />", () => {
  it("renders both brand logos as decorative", () => {
    const { container } = render(<HeaderBrand />);
    const logos = container.querySelectorAll("img");

    expect(logos).toHaveLength(2);
    for (const logo of logos) {
      expect(logo).toHaveAttribute("aria-hidden", "true");
      expect(logo).toHaveAttribute("src");
      expect(logo).toHaveClass("h-6");
    }
  });

  it("gives the vertical dash 12 px side padding", () => {
    const { container } = render(<HeaderBrand />);

    expect(container.querySelector(".px-3")).toBeInTheDocument();
  });
});

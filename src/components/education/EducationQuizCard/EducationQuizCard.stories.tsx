import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { EducationQuizCard } from "./EducationQuizCard";

const meta = {
  title: "Education/EducationQuizCard",
  component: EducationQuizCard,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    eyebrow: "Quiz",
    title: "Droga ustawy",
    description:
      "Osiem pytań o to, kto i jak uchwala prawo. Po każdej odpowiedzi krótkie wyjaśnienie.",
    questionCount: 8,
    durationMinutes: 5,
    startHref: "/quiz/droga-ustawy",
  },
} satisfies Meta<typeof EducationQuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutStartLink: Story = {
  render: ({ eyebrow, title, description, questionCount, durationMinutes }) => (
    <EducationQuizCard
      eyebrow={eyebrow}
      title={title}
      description={description}
      questionCount={questionCount}
      durationMinutes={durationMinutes}
    />
  ),
};

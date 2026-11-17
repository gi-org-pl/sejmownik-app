import type { Meta, StoryObj } from "@storybook/react-vite";
import { MpMetricBar } from "./MpMetricBar";
import type {
  MedianMetricProps,
  PercentMetricProps,
} from "./MpMetricBar.types";

const meta: Meta<typeof MpMetricBar> = {
  title: "Mps/MpMetricBar",
  component: MpMetricBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
One labelled metric row for an MP: a label, a bar and the value as text.

### Variants

| \`variant\` | Shows | Use for |
| --- | --- | --- |
| \`"percent"\` | Fill from 0 to 100% | A share of a whole, e.g. voting attendance |
| \`"median"\` | The MP's value (dot) against all MPs: Sejm median (tick) and middle half of MPs (band) | Counts compared across the Sejm, e.g. interpellations |

### Layouts

| \`layout\` | Where | Look |
| --- | --- | --- |
| \`"inline"\` (default) | MP card in the list | Label, bar and value in one row |
| \`"stacked"\` | MP profile header | Label and value above the bar |

### Types

\`\`\`ts
type MetricLayout = "inline" | "stacked";

type PercentMetricProps = {
  variant: "percent";
  label: string;
  layout?: MetricLayout;
  percent: number | null; // 0–100; null = no data
};

type MedianMetricProps = {
  variant: "median";
  label: string;
  layout?: MetricLayout;
  value: number | null; // the MP's value, the dot; null = no data
  median: number;       // Sejm median, the tick
  q1: number;           // 25th percentile, start of the band
  q3: number;           // 75th percentile, end of the band
  scaleMax: number;     // end of the scale, e.g. the 95th percentile
};

type MpMetricBarProps = PercentMetricProps | MedianMetricProps;
\`\`\`

### Median scale

The scale runs from **0** to \`scaleMax\`. Every element is placed at \`x / scaleMax\`:

- **Dot**: the MP's \`value\`. Left of the band: bottom 25% of MPs; inside: the typical middle half; right: top 25%.
- **Tick**: \`median\`, half of MPs have less and half more.
- **Band**: from \`q1\` to \`q3\`, where the middle half of MPs falls.

\`median\`, \`q1\`, \`q3\` and \`scaleMax\` are computed by the data layer over all MPs; the component does no statistics.
Use the **95th percentile** as \`scaleMax\`, not the maximum: one record holder would squeeze everyone else into the first few percent of the bar.

### Missing and edge data

| Case | Rendering |
| --- | --- |
| \`percent\` or \`value\` is \`null\` | No fill / no dot; value text **brak danych** (Lingui) |
| \`percent\` outside 0–100 | Fill clamped; text shows the given value unchanged |
| \`value\` above \`scaleMax\` | Dot clamped to the end; text shows the full value |
| \`median\` variant without \`value\` | Tick and band are still drawn |

### Design

Custom Tailwind track instead of Athena \`ProgressBar\`, because it has no tick, dot or band.
Text and bars are identical in both layouts: 14px text (label regular, value bold), 6px track, 16px dot with a 2px white border, 1.5 × 20px median tick.
Colours: label \`gi-dark-gray\`, value, fill, tick and dot \`gi-primary\`, track \`gi-dark-ash\`, band \`gi-light-primary/35\`.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description:
        '`"percent"`: fill bar. `"median"`: dot on a 0–`scaleMax` scale with the median tick and Q1–Q3 band.',
      control: "inline-radio",
      options: ["percent", "median"],
      table: { type: { summary: '"percent" | "median"' } },
    },
    label: {
      description: "Visible metric name, e.g. `Głosowania` or `Interpelacje`.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    layout: {
      description:
        '`"inline"`: one row (MP card). `"stacked"`: label and value above the bar (profile header).',
      control: "inline-radio",
      options: ["inline", "stacked"],
      table: {
        type: { summary: '"inline" | "stacked"' },
        defaultValue: { summary: '"inline"' },
      },
    },
    percent: {
      description:
        "`percent` variant only. 0–100; values outside are clamped in the fill only. `null` = no data.",
      control: { type: "number" },
      if: { arg: "variant", eq: "percent" },
      table: { type: { summary: "number | null" } },
    },
    value: {
      description:
        "`median` variant only. The MP's value, drawn as the dot; clamped to `scaleMax` in the bar only. `null` = no data.",
      control: { type: "number" },
      if: { arg: "variant", eq: "median" },
      table: { type: { summary: "number | null" } },
    },
    median: {
      description: "`median` variant only. Sejm median, drawn as the tick.",
      control: { type: "number" },
      if: { arg: "variant", eq: "median" },
      table: { type: { summary: "number" } },
    },
    q1: {
      description:
        "`median` variant only. 25th percentile, start of the middle-half band.",
      control: { type: "number" },
      if: { arg: "variant", eq: "median" },
      table: { type: { summary: "number" } },
    },
    q3: {
      description:
        "`median` variant only. 75th percentile, end of the middle-half band.",
      control: { type: "number" },
      if: { arg: "variant", eq: "median" },
      table: { type: { summary: "number" } },
    },
    scaleMax: {
      description:
        "`median` variant only. End of the scale, e.g. the 95th percentile.",
      control: { type: "number" },
      if: { arg: "variant", eq: "median" },
      table: { type: { summary: "number" } },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[270px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MpMetricBar>;

// Flat args with both variants' fields, so the variant can be switched in the
// controls without losing data.
type PlaygroundArgs = Omit<PercentMetricProps, "variant"> &
  Omit<MedianMetricProps, "variant"> & { variant: "percent" | "median" };

export const Playground: StoryObj<PlaygroundArgs> = {
  name: "Playground (switch variant and layout)",
  args: {
    variant: "median",
    layout: "inline",
    label: "Interpelacje",
    percent: 98,
    value: 85,
    median: 30.5,
    q1: 12,
    q3: 62,
    scaleMax: 120,
  },
  render: ({ variant, percent, value, median, q1, q3, scaleMax, ...rest }) =>
    variant === "percent" ? (
      <MpMetricBar {...rest} variant="percent" percent={percent} />
    ) : (
      <MpMetricBar
        {...rest}
        variant="median"
        value={value}
        median={median}
        q1={q1}
        q3={q3}
        scaleMax={scaleMax}
      />
    ),
};

const participation = {
  variant: "percent",
  label: "Głosowania",
} as const;

// Example Sejm statistics: median 30.5, middle half (Q1–Q3) 12–62,
// scale end 120 (95th percentile).
const interpellations = {
  variant: "median",
  label: "Interpelacje",
  median: 30.5,
  q1: 12,
  q3: 62,
  scaleMax: 120,
} as const;

export const ParticipationHigh: Story = {
  name: "Percent · inline: Głosowania 98% (bar almost full)",
  args: { ...participation, percent: 98 },
};

export const ParticipationZero: Story = {
  name: "Percent · inline: Głosowania 0% (empty bar)",
  args: { ...participation, percent: 0 },
};

export const ParticipationNoData: Story = {
  name: "Percent · inline: Głosowania no data",
  args: { ...participation, percent: null },
};

export const InterpellationsNone: Story = {
  name: "Median · inline: Interpelacje 0 (dot at start)",
  args: { ...interpellations, value: 0 },
};

export const InterpellationsBelowMedian: Story = {
  name: "Median · inline: Interpelacje 12 (left of median)",
  args: { ...interpellations, value: 12 },
};

export const InterpellationsAtMedian: Story = {
  name: "Median · inline: Interpelacje 31 = median (dot on tick)",
  args: { ...interpellations, median: 31, value: 31 },
};

export const InterpellationsAboveMedian: Story = {
  name: "Median · inline: Interpelacje 85 (right of median)",
  args: { ...interpellations, value: 85 },
};

export const InterpellationsAboveScale: Story = {
  name: "Median · inline: Interpelacje 505 > scale end 120 (dot clamped)",
  args: { ...interpellations, value: 505 },
};

export const InterpellationsNoData: Story = {
  name: "Median · inline: Interpelacje no data (tick and band only)",
  args: { ...interpellations, value: null },
};

const stackedDecorator: Story["decorators"] = [
  (Story) => (
    <div className="w-64">
      <Story />
    </div>
  ),
];

export const StackedParticipationHigh: Story = {
  name: "Percent · stacked: Głosowania 98%",
  decorators: stackedDecorator,
  args: { ...participation, layout: "stacked", percent: 98 },
};

export const StackedParticipationNoData: Story = {
  name: "Percent · stacked: Głosowania no data",
  decorators: stackedDecorator,
  args: { ...participation, layout: "stacked", percent: null },
};

export const StackedInterpellationsInMiddleHalf: Story = {
  name: "Median · stacked: Interpelacje 45 (inside middle half)",
  decorators: stackedDecorator,
  args: { ...interpellations, layout: "stacked", value: 45 },
};

export const StackedInterpellationsAboveMiddleHalf: Story = {
  name: "Median · stacked: Interpelacje 85 (top 25%)",
  decorators: stackedDecorator,
  args: { ...interpellations, layout: "stacked", value: 85 },
};

export const StackedInterpellationsNone: Story = {
  name: "Median · stacked: Interpelacje 0 (bottom 25%)",
  decorators: stackedDecorator,
  args: { ...interpellations, layout: "stacked", value: 0 },
};

export const StackedInterpellationsNoData: Story = {
  name: "Median · stacked: Interpelacje no data",
  decorators: stackedDecorator,
  args: { ...interpellations, layout: "stacked", value: null },
};

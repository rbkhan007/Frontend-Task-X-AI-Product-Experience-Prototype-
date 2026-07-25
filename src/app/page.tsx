import dynamic from "next/dynamic";
import { Hero } from "@/components/site/hero";
import { NarrativeBand, Pillars, MetricsBand } from "@/components/site/landing-sections";

const InsightFlow = dynamic(
  () => import("@/components/site/insight-flow").then((m) => m.InsightFlow)
);

const DashboardPreview = dynamic(
  () => import("@/components/site/dashboard-preview").then((m) => m.DashboardPreview)
);

const Signature = dynamic(
  () => import("@/components/site/signature").then((m) => m.Signature)
);

const Automations = dynamic(
  () => import("@/components/site/automations").then((m) => m.Automations)
);

export default function Home() {
  return (
    <>
      <Hero />
      <NarrativeBand />
      <InsightFlow />
      <DashboardPreview />
      <Signature />
      <Automations />
      <Pillars />
      <MetricsBand />
    </>
  );
}

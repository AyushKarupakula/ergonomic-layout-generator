import { Button } from "@/components/ui/button";
import { Layout, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-6 text-center">
      <div className="bg-primary/10 p-4 rounded-full mb-8">
        <Layout className="h-12 w-12" />
      </div>
      <h1 className="text-4xl font-bold mb-4">ErgoSpace</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Create your personalized workspace layout based on your ergonomic needs and work habits
      </p>
      <Link href="/onboarding">
        <Button size="lg" className="gap-2">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

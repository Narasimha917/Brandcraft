import React from "react";
import Navbar from "@/components/Navbar";

const VisualAssetLibrary = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto pt-28 px-6 pb-24">
        <h1 className="text-3xl font-display font-bold mb-4">Visual Asset Library</h1>
        <p className="text-muted-foreground mb-8">Browse and download AI-generated images, icons, and graphics tailored to your brand.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder assets — can be wired to the asset API */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-muted border border-border p-2">
              <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-xl text-muted-foreground">Asset {i + 1}</div>
              <div className="p-3">
                <div className="text-sm font-semibold">AI Image {i + 1}</div>
                <div className="text-xs text-muted-foreground">Placeholder description</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VisualAssetLibrary;

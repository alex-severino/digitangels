export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-fill"
        src="/videos/Presentation_Film-1.mp4"
      />
      <div className="absolute inset-0 z-10 bg-black/40" aria-hidden />
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-foreground">
        <h1 className="text-display-2xl">Digitangels</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-foreground/90">
          Pioneering digital-to-physical fulfillment.
        </p>
      </div>
    </main>
  );
}

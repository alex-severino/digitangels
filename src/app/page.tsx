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
    </main>
  );
}

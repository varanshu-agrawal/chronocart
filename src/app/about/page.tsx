export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-10 py-20">
      <h1 className="text-4xl font-semibold mb-8">About ChronoCart</h1>

      <p className="text-gray-400 mb-6 leading-relaxed">
        ChronoCart is a demo luxury watch ecommerce platform built to
        showcase modern web development using Next.js, Firebase and
        premium UI design principles.
      </p>

      <p className="text-gray-400 mb-6 leading-relaxed">
        This project demonstrates guest checkout, user authentication,
        order management, cart system and a luxury ecommerce interface.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-[#111] p-8 rounded-2xl">
          <h3 className="font-semibold mb-2">Luxury Brands</h3>
          <p className="text-gray-400 text-sm">
            Rolex, Omega, AP and more curated watches.
          </p>
        </div>

        <div className="bg-[#111] p-8 rounded-2xl">
          <h3 className="font-semibold mb-2">Modern Tech</h3>
          <p className="text-gray-400 text-sm">
            Built with Next.js, Firebase and TypeScript.
          </p>
        </div>

        <div className="bg-[#111] p-8 rounded-2xl">
          <h3 className="font-semibold mb-2">Portfolio Project</h3>
          <p className="text-gray-400 text-sm">
            Created as a demonstration ecommerce platform.
          </p>
        </div>
      </div>
    </div>
  );
}

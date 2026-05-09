export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-2">
        <div className="size-5 rounded-sm bg-white/90" />
        <span className="text-sm font-semibold text-white">Notio</span>
      </div>
      <ul className="hidden items-center gap-6 md:flex">
        {["Product", "Company", "Log in"].map((item) => (
          <li key={item}>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              {item}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
          >
            Start for free
          </a>
        </li>
      </ul>
    </nav>
  );
}

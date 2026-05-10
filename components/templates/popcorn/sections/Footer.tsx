export default function Footer() {
  return (
    <footer className="relative z-20 mt-[-3rem] overflow-hidden rounded-t-[3rem] bg-inverse pt-24 pb-8 text-primary-content">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-32 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-bright text-xl font-bold text-primary">
              B
            </div>
          </div>
          <div className="col-span-1">
            <h4 className="mb-6 text-sm font-medium">Product</h4>
            <ul className="space-y-4 text-sm text-inverse-muted">
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  Changelog
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="mb-6 text-sm font-medium">Company</h4>
            <ul className="space-y-4 text-sm text-inverse-muted">
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="mb-6 text-sm font-medium">Connect</h4>
            <ul className="space-y-4 text-sm text-inverse-muted">
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  X
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-content" href="#">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="-mb-[6vw] text-center font-serif text-[15vw] leading-none font-bold tracking-tighter text-primary-content select-none">
          Bloom
        </div>
      </div>
    </footer>
  );
}

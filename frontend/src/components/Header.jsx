function Header() {
  return (
    <div className="px-6 py-4 bg-[#1A1A40] flex items-center justify-between">
      {/* Left Logo */}
      <img src="src/assets/su.png" alt="SU Logo" className="h-14 rounded-full" />

      {/* Center Title */}
      <div className="text-center flex-1">
        <h1 className="text-4xl font-bold text-white font-[Montserrat] mb-1">
          SCET Nexus
        </h1>
        <p className="text-lg text-green-400 tracking-wide mt-3">
          Sarvajanik College of Engineering and Technology
        </p>
      </div>

      {/* Right Logo */}
      <img src="src/assets/scet.png" alt="SCET Logo" className="h-14 rounded-full" />
    </div>
  );
}

export default Header;
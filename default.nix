with import <nixpkgs> {};
stdenv.mkDerivation rec {
  name = "env";
  shellHook = ''
    npm install




'';
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = [
    stdenv
    sqlite
    # Emacs can connect to SQLite via edbi and edbi-sqlite
    # and they rely on Perls Database independent interface
    perlPackages.DBI


  ];
}

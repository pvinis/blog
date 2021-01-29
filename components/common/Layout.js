import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "next-themes";

export function Layout({ children }) {
  return (
    <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white">
      <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
        <Header />
        <main>{children}</main>
        <footer className="text-lg font-light">
          © {new Date().getFullYear()}, Built by{" "}
	  <a href="https://twitter.com/pvinis">pvinis</a>{" "}
	  with 💜 using{" "}
	  <a href="https://nextjs.org">Next.js</a>
	  ,{" "}
	  <a href="https://github.com">GitHub</a>
	  ,{" "}
	  <a href="https://netlify.com">Netlify</a>
	  ,{" "}
	  <a href="https://cloudflare.com">Cloudflare</a>
	  .
	  <div>
	  <p>Feeds</p>
	  	<a href="/feed/atom.xml">atom</a>
	  	<a href="/feed/feed.xml">rss</a>
	  	<a href="/feed/feed.json">json</a>
	  </div>
        </footer>
      </div>
    </div>
  );
}

const Header = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleDarkMode = (checked) => {
    const isDarkMode = checked;

    if (isDarkMode) setTheme("dark");
    else setTheme("light");
  };

  const isRoot = pathname === "/";
  const isDarkMode = resolvedTheme === "dark";

  return (
    <header
      className={clsx("flex items-center justify-between ", {
        "mb-8": isRoot,
        "mb-2": !isRoot,
      })}
    >
      <div className={"max-w-md"}>
        {isRoot ? <LargeTitle /> : <SmallTitle />}
      </div>
      {mounted && (
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className={isRoot ? 28 : 24}
        />
      )}
    </header>
  );
};

const LargeTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-3xl font-black leading-none text-black no-underline font-display",
          "sm:text-5xl",
          "dark:text-white"
        )}
      >
        Purple Royale
      </a>
    </Link>
  </h1>
);

const SmallTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-2xl font-black text-black no-underline font-display",
          "dark:text-white"
        )}
      >
        Purple Royale
      </a>
    </Link>
  </h1>
);

/**
 * Things Pavlos has worked on.
 *
 * A flat list on purpose, ordered by hand rather than by date. Adding one is a
 * single entry, no build step and nothing to keep in sync.
 *
 * Every url here was checked and answered 200. If one dies, it should go, a
 * portfolio of dead links is worse than a short one.
 */
export type ProjectTag = "app" | "site" | "oss" | "package" | "talk" | "video" | "contribution" | "silly"

export interface Project {
	name: string
	url: string
	tag: ProjectTag
}

export const projects: Project[] = [
	// things people can actually use
	{ name: "LeanScaper", url: "https://apps.apple.com/us/app/leanscaper-ai/id6754711316", tag: "app" },
	{ name: "LeanScaper website", url: "https://leanscaper.com", tag: "site" },
	{ name: "Autographer", url: "https://apps.apple.com/us/app/autographer/id6499551485", tag: "app" },
	{ name: "Hour Bell", url: "https://quad.codes/hour-bell", tag: "app" },
	{ name: "Browsers Party", url: "https://browsers.party", tag: "site" },
	{ name: "Markdown Viewer", url: "https://md.quad.codes", tag: "site" },
	{ name: "PaceVer", url: "https://pacever.org", tag: "site" },
	{ name: "Crypto Icons", url: "https://crypto-icons.dev", tag: "site" },
	{ name: "Kardiologos Agapitou", url: "https://kardiologos-agapitou.gr", tag: "site" },
	{ name: "Taxpedia", url: "https://taxpedia.gr", tag: "site" },
	{ name: "Artsy Salon 2022", url: "https://salon-2022.pvinis.art", tag: "site" },

	// code other people use
	{ name: "react-native-xcodegen", url: "https://github.com/pvinis/react-native-xcodegen", tag: "oss" },
	{ name: "colortools", url: "https://github.com/pvinis/colortools", tag: "oss" },
	{ name: "iosevka-webfont", url: "https://github.com/pvinis/iosevka-webfont", tag: "oss" },
	{ name: "textworm", url: "https://github.com/pvinis/textworm", tag: "oss" },
	{ name: "flick", url: "https://github.com/pvinis/flick", tag: "oss" },
	{ name: "i-kick-you-out", url: "https://github.com/pvinis/i-kick-you-out", tag: "oss" },
	{ name: "catapult", url: "https://github.com/pvinis/catapult", tag: "oss" },
	{ name: "update-cloudflare-dns", url: "https://github.com/pvinis/update-cloudflare-dns", tag: "oss" },
	{ name: "homebrew-pvinis", url: "https://github.com/pvinis/homebrew-pvinis", tag: "oss" },
	{ name: "react-conditional-wrap", url: "https://jsr.io/@pvinis/react-conditional-wrap", tag: "package" },
	{ name: "signals-storage", url: "https://jsr.io/@pvinis/signals-storage", tag: "package" },

	{
		name: "React Native native crash reporting",
		url: "https://github.com/pvinis/react-native-project-with-crash-heaven-pr",
		tag: "contribution",
	},

	// speaking
	{ name: "xcodegen and React Native", url: "https://github.com/pvinis/talk-xcodegen-rn", tag: "talk" },
	{ name: "Upgrading React Native", url: "https://github.com/pvinis/talk-upgrading-react-native", tag: "talk" },
	{ name: "RxJS", url: "https://github.com/pvinis/talk-rxjs", tag: "talk" },
	{
		name: "UIExplorer in ClojureScript",
		url: "https://www.youtube.com/playlist?list=PLmalQP9SU3s4TTRfyox68RBYkEj14X3cb",
		tag: "video",
	},

	// not serious, kept on purpose
	{ name: "notch-troll", url: "https://youtu.be/doEwhLtsACU", tag: "silly" },
	{ name: "swordsmen", url: "https://github.com/pvinis/swordsmen", tag: "silly" },
	{ name: "mazical", url: "https://github.com/pvinis/mazical", tag: "silly" },
]

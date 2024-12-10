import { PropsWithChildren } from "react"
import { HelmetProvider } from "react-helmet-async"

export function Providers({ children }: PropsWithChildren) {
	return <HelmetProvider>{children}</HelmetProvider>
}

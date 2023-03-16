import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { WagmiConfig, configureChains, createClient } from "wagmi"
import { mainnet, goerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import type { AppProps } from "next/app"
import "@rainbow-me/rainbowkit/styles.css"

const { chains, provider } = configureChains(
	[mainnet, goerli],
	[publicProvider()]
)

const { connectors } = getDefaultWallets({
	appName: "RainbowKit Example",
	chains,
})

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

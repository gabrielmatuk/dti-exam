import { Header } from "./Header/header";
import { Footer } from "./Footer/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="layout">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
}


import Head from "next/dist/shared/lib/head";
import Sidebar from "../components/Sidebar";

// Tailwind => 
//      - h-screen => Coge toda la altura de la pantalla
//      - overflow-y-scroll => Para que solo haga scroll el div


export default function Layout({ children, pagina }) {

    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name = "description" content = 'Quiosco Cafeteria' />
            </Head>

            <div className = "md:flex">

                <aside className = "md:w-4/12 xl:w-1/4 2xl:w-1/5">
                    <Sidebar />
                </aside>

                <main className = "md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                    <div className = "p-10">
                        {children}
                    </div>
                </main>

            </div>
        </>
    );
}
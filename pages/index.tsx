import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import requests from "../utils/requests";
import { Movie } from "../typings";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import { modalState, movieState } from "../atoms/modalAtom";
import { useRecoilValue } from "recoil";
import Modal from "../components/Modal";
import Plans from "../components/Plans";
import payments from "../lib/stripe";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import useSubscription from "../hooks/useSubscription";
import useList from "../hooks/useList";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  animationMovies: Movie[];
  products: Product[];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  animationMovies,
  products,
}: Props) => {
  const { loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);
  const subscription = useSubscription(user);
  const movie = useRecoilValue(movieState);
  const list = useList(user?.uid);

  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Netflix - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HEADER */}
      <Header />
      <main className="relative pl-4 pb-16 lg:pb-24 lg:space-y-24 lg:pl-16">
        {/* BANNER */}
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Documentaries" movies={documentaries} />
          <Row title="Animation" movies={animationMovies} />
        </section>
      </main>
      {showModal && <Modal />}
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    animationMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchAnimationMovies).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      animationMovies: animationMovies.results,
      products,
    },
  };
};

import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import requests from "../utils/requests";
import { Movie } from "../typings";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import { modalState } from "../atoms/modalAtom";
import { useRecoilValue } from "recoil";
import Modal from "../components/Modal";

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
}: Props) => {
  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);

  if (loading) return null;

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Netflix - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HEADER */}
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* BANNER */}
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Animation" movies={animationMovies} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Documentaries" movies={documentaries} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
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
    },
  };
};

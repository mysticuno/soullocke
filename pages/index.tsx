import Head from "next/head";
import useSWR from "swr";
import styles from "styles/Home.module.css";

function Home({ data }) {
  const { data: DATA, error } = useSWR("/api/hello", fetch);
  // console.log(data);
  console.log(DATA);

  return (
    <div className={styles.container}>
      <Head>
        <title>Soullocke</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Soullocke</h1>
      </main>

      <footer className={styles.footer}>Made with {"<3"} by jynnie</footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/region/hoenn");
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

export default Home;
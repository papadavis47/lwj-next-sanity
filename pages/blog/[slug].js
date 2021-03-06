import sanityClient from "../../sanityClient.js";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import React from "react";

export default function BlogPost({ _id, title, likes, name }) {
  const [likesState, setLikes] = React.useState(likes);

  const addLike = async () => {
    const { likes: newLikes } = await fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify({ _id }),
    }).then((response) => response.json());

    setLikes(newLikes);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <p> Posted by: {name}</p>
        <button onClick={addLike}>{likesState} likes</button>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const [post] = await sanityClient.fetch(
    `*[_type == 'post' && slug.current == '${slug}']{_id, title, likes, 'name': author->name}`
  );
  return { props: { ...post } };
}

export async function getStaticPaths() {
  // TODO: find all page names
  const posts = await sanityClient.fetch(`*[_type == 'post']{'slug': slug.current}`);
  return {
    paths: posts.map(({ slug }) => `/blog/${slug}`),
    fallback: false,
  };
}

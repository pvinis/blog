import Link from "next/link";

import { Layout, Bio, SEO } from "@components/common";
import { getSortedPosts } from "@lib/posts";
import { draftsFilter } from "@lib/helpers";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="All posts" />
      <Bio className="my-14" />
      {posts
	  .filter(draftsFilter)
	  .map(({ frontmatter: { title, description, date, draft }, slug }) => (
        <article key={slug}>
          <header className="mb-2">
            <h3 className="mb-2">
              <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                <a className="text-4xl font-bold text-yellow-600 font-display">
                  {draft === true && "[DRAFT] - "}{title}
                </a>
              </Link>
            </h3>
            <span className="text-sm">{date}</span>
          </header>
          <section>
            <p className="mb-8 text-lg">{description}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}



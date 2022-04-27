import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from "../src/components/Layout"

export default function Home({ stars }) {
  console.log("stars", stars);
  return (
    <div className={styles.container}>
      <Head>
        <title>{`Pause a Moment ${stars}`}</title>
        <link rel="icon" href="/favicon.ico" />

        {/* <link rel="canonical" href="__META_URL__" /> */}
        <meta name="title" content={`Pause a Moment ${stars}`} id="meta_title" />
        <meta name="description" content="The COVID-19 pandemic has taken a toll. Pause a moment to focus on your well-being." id="meta_description" />
        <meta name="keywords" content="mental health, mood, burnout, anxiety, stress, PTSD, Depression, trauma, cbt, cognitive behavioral therapy, COVID, healthcare worker, meditation, visualization, relaxation, problem solving, breathing, behavioral activation, behavior activation, positive psychology, activity scheduling, cognitive bias, loving kindness, treatment resistant depression, compassion, self-compassion, rumination, hindsight bias, second guess, reappraisal, gratitude" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="__META_OG_URL__" id="meta_og_url" /> */}
        <meta property="og:title" content={`Pause a Moment ${stars}`} id="meta_og_title" />
        <meta property="og:description" content="The COVID-19 pandemic has taken a toll. Pause a moment to focus on your well-being." id="meta_og_description" />
        <meta property="og:image" content="https://storage.googleapis.com/pause-a-moment-api-dev-public-content/thumbnail/pam-full-logo.png" id="meta_og_image" />
        {/* <meta property="og:image" content="%PUBLIC_URL%/logo192.png" id="meta_og_image" /> */}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        {/* <meta property="twitter:url" content="__META_TWITTER_URL__" id="meta_twt_url" /> */}
        <meta property="twitter:title" content={`Pause a Moment ${stars}`} id="meta_twt_title" />
        <meta property="twitter:description" content="The COVID-19 pandemic has taken a toll. Pause a moment to focus on your well-being." id="meta_twt_description" />
        <meta property="twitter:image" content="https://storage.googleapis.com/pause-a-moment-api-dev-public-content/thumbnail/pam-full-logo.png" id="meta_twt_image" />
      </Head>

      <main className={styles.main}>
        <Layout isLoggedIn={false}>
          <Link href="/tools">
            <a>{`Tool on ${stars}`}</a>
          </Link>
        </Layout>
      </main>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  // console.log("ctxc", Object.keys(ctx.req));
  return { stars: ctx.req.headers.referer }
}

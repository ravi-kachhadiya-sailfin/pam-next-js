import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Pause A Moment</title>
                <link rel="icon" href="/favicon.ico" />

                {/* <link rel="canonical" href="__META_URL__" /> */}
                <meta name="title" content="Tools" id="meta_title" />
                <meta name="description" content="Tols..sdfsadfbjdsbf" id="meta_description" />
                <meta name="keywords" content="mental health, mood, burnout, anxiety, stress, PTSD, Depression, trauma, cbt, cognitive behavioral therapy, COVID, healthcare worker, meditation, visualization, relaxation, problem solving, breathing, behavioral activation, behavior activation, positive psychology, activity scheduling, cognitive bias, loving kindness, treatment resistant depression, compassion, self-compassion, rumination, hindsight bias, second guess, reappraisal, gratitude" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                {/* <meta property="og:url" content="__META_OG_URL__" id="meta_og_url" /> */}
                <meta property="og:title" content="Pause a Moment" id="meta_og_title" />
                <meta property="og:description" content="The COVID-19 pandemic has taken a toll. Pause a moment to focus on your well-being." id="meta_og_description" />
                <meta property="og:image" content="https://storage.googleapis.com/pause-a-moment-api-dev-public-content/thumbnail/pam-full-logo.png" id="meta_og_image" />
                {/* <meta property="og:image" content="%PUBLIC_URL%/logo192.png" id="meta_og_image" /> */}

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                {/* <meta property="twitter:url" content="__META_TWITTER_URL__" id="meta_twt_url" /> */}
                <meta property="twitter:title" content="Pause a Moment" id="meta_twt_title" />
                <meta property="twitter:description" content="The COVID-19 pandemic has taken a toll. Pause a moment to focus on your well-being." id="meta_twt_description" />
                <meta property="twitter:image" content="https://storage.googleapis.com/pause-a-moment-api-dev-public-content/thumbnail/pam-full-logo.png" id="meta_twt_image" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <Link href="/">
                    <a>{`Home`}</a>
                </Link>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h2>Documentation &rarr;</h2>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h2>Learn &rarr;</h2>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/canary/examples"
                        className={styles.card}
                    >
                        <h2>Examples &rarr;</h2>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h2>Deploy &rarr;</h2>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
                </div>
            </main>
        </div>
    )
}

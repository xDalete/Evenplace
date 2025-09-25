import Head from "next/head";
import styles from "./Colors.module.scss";

export default function ColorsPage() {
  return (
    <div className={`${styles.container}`}>
      <Head>
        <title>Color Palette</title>
        <meta name="description" content="Display of defined color palette" />
      </Head>
      <main className={`${styles.main}`}>
        <h1 className={`${styles.title}`}>Color Palette</h1>

        <section className={`${styles.colorSection}`}>
          <h2>Background Colors</h2>
          <div className={`${styles.colorGrid}`}>
            <div className={`${styles.colorSwatch} ${styles.bgDark}`}>
              <span>$bg-dark</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.bg}`}>
              <span>$bg</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.bgLight}`}>
              <span>$bg-light</span>
            </div>
          </div>
        </section>

        <section className={`${styles.colorSection}`}>
          <h2>Text Colors</h2>
          <div className={`${styles.colorGrid}`}>
            <div className={`${styles.colorSwatch} ${styles.text}`}>
              <span>$text</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.textMuted}`}>
              <span>$text-muted</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.highlight}`}>
              <span>$highlight</span>
            </div>
          </div>
        </section>

        <section className={`${styles.colorSection}`}>
          <h2>Border Colors</h2>
          <div className={`${styles.colorGrid}`}>
            <div className={`${styles.colorSwatch} ${styles.border}`}>
              <span>$border</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.borderMuted}`}>
              <span>$border-muted</span>
            </div>
          </div>
        </section>

        <section className={`${styles.colorSection}`}>
          <h2>Variant Colors</h2>
          <div className={`${styles.colorGrid}`}>
            <div className={`${styles.colorSwatch} ${styles.primary}`}>
              <span>$primary</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.secondary}`}>
              <span>$secondary</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.danger}`}>
              <span>$danger</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.warning}`}>
              <span>$warning</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.success}`}>
              <span>$success</span>
            </div>
            <div className={`${styles.colorSwatch} ${styles.info}`}>
              <span>$info</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

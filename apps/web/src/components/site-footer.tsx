import styles from './site-footer.module.css';

interface SiteFooterProps {
  legal: string;
}

export function SiteFooter({ legal }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {legal}
      </div>
    </footer>
  );
}

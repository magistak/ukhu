interface SiteFooterProps {
  legal: string;
}

export function SiteFooter({ legal }: SiteFooterProps) {
  return (
    <footer style={{ marginTop: '3rem', background: 'white' }}>
      <div style={{ width: 'min(960px, 90vw)', margin: '0 auto', padding: '1rem 0', fontSize: '0.85rem' }}>
        {legal}
      </div>
    </footer>
  );
}

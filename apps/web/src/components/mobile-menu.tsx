'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { type Locale, type RouteKey, buildRoute } from '@ukhu/i18n';
import { LanguageSwitcher } from './language-switcher';
import styles from './mobile-menu.module.css';

interface MobileMenuProps {
  locale: Locale;
  navigation: Array<{
    key: RouteKey;
    label: string;
  }>;
  languageLabel: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ locale, navigation, languageLabel, isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !menuRef.current) return;

      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div 
        ref={menuRef}
        id="mobile-menu"
        className={styles.menu} 
        role="dialog" 
        aria-modal="true" 
        aria-label="Mobile navigation"
      >
        <div className={styles.header}>
          <button 
            ref={closeButtonRef}
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close menu"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.key}>
                <Link 
                  href={buildRoute(locale, item.key)} 
                  className={styles.navLink}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className={styles.languageSection}>
            <LanguageSwitcher locale={locale} label={languageLabel} />
          </div>
        </nav>
      </div>
    </>
  );
}

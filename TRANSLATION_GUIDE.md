# Direction-Specific Content Strategy

> **Note**: This project no longer uses translation workflows. Each portal serves different audiences and content purposes.

## New Content Model

Instead of translating content between languages, we create **direction-specific content**:

### Hungarian Site (`/hu/*`) - Hungarians Moving to UK
- **Audience**: `hu-to-uk` 
- **Language**: Hungarian content
- **Focus**: UK visa guides, British settlement processes, English requirements

### English Site (`/en/*`) - Anyone Moving to Hungary
- **Audience**: `to-hungary`
- **Language**: English content  
- **Focus**: Hungary permit guides, Budapest living, Hungarian systems

## Migration from Translation Model

1. **Remove translation plugins** from WordPress (Polylang, WPML)
2. **Tag existing content** with appropriate audience:
   - Content for Hungarians moving to UK → `audience: hu-to-uk`
   - Content for people moving to Hungary → `audience: to-hungary`
3. **Create direction-specific content** rather than translating existing pieces
4. **Update editorial workflows** to focus on audience needs rather than language parity

## Content Creation Guidelines

See [EDITORIAL_GUIDELINES.md](./EDITORIAL_GUIDELINES.md) for complete direction-specific content strategy.

**Key principle**: Each portal serves a different relocation direction with purpose-built content, not translations.
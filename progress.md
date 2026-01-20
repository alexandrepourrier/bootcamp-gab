# Feature: Page Events

## Statut global : En cours de définition

---

## 1. Contexte

La page events doit afficher les événements de la communauté GAB (meetups, webinars, workshops, conférences).

### Décisions prises
- [x] Données locales (pas Supabase pour le moment)
- [x] Stockage : fichier JSON (`data/events.json`)
- [ ] Scope des fonctionnalités : à définir

### Stack technique
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Composant existant : `EventCard`

---

## 2. État actuel du code

| Élément | Fichier | Statut |
|---------|---------|--------|
| Types Event | `lib/supabase/types.ts` | ✅ Défini |
| Composant EventCard | `components/events/event-card.tsx` | ✅ Créé |
| Page Events | `app/(public)/events/page.tsx` | ⚠️ Placeholder statique |
| Page détail Event | `app/(public)/events/[slug]/page.tsx` | ❌ N'existe pas |
| Données mock | `data/events.json` | ❌ À créer |
| Helper de lecture | `lib/data/events.ts` | ❌ À créer |

---

## 3. Guidelines en attente

> À compléter avec les guidelines supplémentaires de l'utilisateur

---

## 4. Recommandations (à valider)

### Structure des fichiers à créer

```
data/
└── events.json              # Données mock des events

lib/
└── data/
    └── events.ts            # Fonctions de lecture et filtrage

app/(public)/events/
├── page.tsx                 # Liste des events (à modifier)
└── [slug]/
    └── page.tsx             # Page détail (optionnel)
```

### Fonctionnalités possibles

1. **Basique**
   - Affichage liste des events à venir
   - Affichage liste des replays

2. **Intermédiaire**
   - Filtrage par type (meetup, webinar, workshop, conference)
   - Tri par date

3. **Complet**
   - Page détail par event (`/events/[slug]`)
   - Hero dynamique avec prochain event
   - Pagination

---

## 5. Tâches

### Phase 1 : Setup données
- [ ] Créer `data/events.json` avec données mock
- [ ] Créer `lib/data/events.ts` avec helpers

### Phase 2 : Page events
- [ ] Modifier `app/(public)/events/page.tsx`
- [ ] Intégrer `EventCard` avec données mock

### Phase 3 : Améliorations (optionnel)
- [ ] Page détail `[slug]`
- [ ] Filtres par type
- [ ] Hero dynamique

---

## 6. Notes et discussions

*Espace pour les échanges et décisions*

---

Dernière mise à jour : 2026-01-20

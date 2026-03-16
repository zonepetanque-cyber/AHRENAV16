# AHRENA — Application Pétanque Live

Application PWA mobile-first pour suivre la pétanque en direct.

## Déploiement sur Vercel

### 1. Prérequis
- Un compte [Vercel](https://vercel.com) (gratuit)
- Un compte [GitHub](https://github.com) (gratuit)
- Votre clé API YouTube (Google Cloud Console)

### 2. Déposer le code sur GitHub
1. Créez un nouveau repository sur GitHub
2. Uploadez tous les fichiers de ce dossier
3. (ou utilisez : `git init && git add . && git commit -m "init" && git push`)

### 3. Déployer sur Vercel
1. Allez sur [vercel.com](https://vercel.com) → **New Project**
2. Importez votre repository GitHub
3. Vercel détecte automatiquement Vite ✅
4. Allez dans **Settings > Environment Variables**
5. Ajoutez : `YOUTUBE_API_KEY` = votre clé API YouTube
6. Cliquez **Deploy** → votre app est en ligne !

### 4. Installer comme app sur mobile
Une fois déployée, depuis votre téléphone :
- **Android** : Chrome → menu ⋮ → "Ajouter à l'écran d'accueil"
- **iOS** : Safari → Partager → "Sur l'écran d'accueil"

## Comment fonctionne le cache

```
Toutes les 30 min → Vercel appelle YouTube API (100 unités)
                  → Stocke le résultat dans le CDN Vercel
                  
1000 utilisateurs → Reçoivent le cache → 0 unité supplémentaire
```

**Consommation quotidienne : ~4 800 unités / 10 000 disponibles ✅**

## Structure
```
api/
  youtube.ts     ← Route API avec cache 30 min (Vercel)
src/
  services/
    youtubeService.ts  ← Appelle /api/youtube
  components/    ← Tous vos composants React
public/
  manifest.json  ← Config PWA (installable)
  sw.js          ← Service Worker
```

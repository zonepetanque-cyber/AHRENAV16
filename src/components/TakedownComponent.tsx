import React from 'react';
import { Shield, Mail, FileText, Clock, AlertTriangle } from 'lucide-react';

const TakedownComponent = () => (
  <div className="pt-24 pb-24 px-5 max-w-2xl mx-auto">
    <h1 className="text-3xl font-black text-white uppercase italic mb-1">Retrait de contenu</h1>
    <p className="text-white/40 text-xs mb-8">Politique de retrait & déréférencement</p>

    {/* Intro */}
    <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4 mb-6 flex items-start gap-3">
      <Shield size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-white/60 text-sm leading-relaxed">
        AHRENA agit comme service d'agrégation de contenus publics disponibles sur des plateformes tierces.
        <span className="text-white font-semibold"> AHRENA n'héberge aucun fichier vidéo.</span> Les contenus restent hébergés par YouTube et accessibles selon leurs propres conditions.
      </p>
    </div>

    {/* Qui peut demander */}
    <div className="mb-5">
      <h2 className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-3 border-b border-red-600/20 pb-2">
        Qui peut faire une demande ?
      </h2>
      <div className="space-y-2">
        {[
          'Tout ayant droit ou représentant autorisé',
          'Organisateur d\'un tournoi ou d\'un événement',
          'Chaîne YouTube référencée dans l\'application',
          'Toute personne justifiant d\'un intérêt légitime',
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-zinc-900/40 rounded-lg p-3 border border-white/5">
            <span className="text-red-600 text-xs font-black">→</span>
            <span className="text-white/70 text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Comment faire */}
    <div className="mb-5">
      <h2 className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-3 border-b border-red-600/20 pb-2">
        Comment faire la demande ?
      </h2>
      <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4 mb-3">
        <div className="flex items-center gap-2 mb-3">
          <Mail size={15} className="text-red-500" />
          <span className="text-white font-bold text-sm">Envoyez un email à :</span>
        </div>
        <a href="mailto:support@ahrena.com" className="text-red-500 font-black text-base hover:text-red-400 transition-colors">
          support@ahrena.com
        </a>
      </div>
      <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={15} className="text-white/40" />
          <span className="text-white/60 text-sm font-bold">Informations à fournir</span>
        </div>
        <ul className="space-y-2">
          {[
            'Vos coordonnées complètes (nom, email)',
            'Le lien ou nom de la chaîne / contenu concerné',
            'La nature de votre demande (retrait, déréférencement...)',
            'La justification juridique ou factuelle',
            'Tout document utile à l\'appui de votre demande',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-white/50 text-xs">
              <span className="text-white/20 mt-0.5">·</span>{item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Traitement */}
    <div className="mb-5">
      <h2 className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-3 border-b border-red-600/20 pb-2">
        Traitement de la demande
      </h2>
      <div className="flex items-start gap-3 bg-zinc-900/40 rounded-xl p-4 border border-white/5">
        <Clock size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-white/60 text-sm leading-relaxed">
          AHRENA examine chaque demande dans les meilleurs délais et peut, selon les cas,
          <span className="text-white"> masquer, déréférencer, retirer ou restreindre</span> l'affichage du contenu concerné.
          AHRENA se réserve le droit de demander des justificatifs complémentaires avant toute mesure définitive.
        </p>
      </div>
    </div>

    {/* Note importante */}
    <div className="flex items-start gap-3 bg-amber-600/10 border border-amber-600/20 rounded-xl p-4">
      <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-white/50 text-xs leading-relaxed">
        Pour les demandes de retrait urgent de vidéos hébergées par YouTube, nous vous recommandons
        de contacter directement <span className="text-white">YouTube via leur procédure officielle</span>, car AHRENA n'héberge pas les fichiers vidéo et ne peut pas les supprimer de la plateforme YouTube.
      </p>
    </div>

    <div className="mt-8 text-center">
      <p className="text-white/20 text-[10px]">AHRENA © 2026 — Romaric Gouleret</p>
    </div>
  </div>
);

export default TakedownComponent;

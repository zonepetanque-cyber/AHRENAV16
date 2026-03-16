import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Section = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/5 rounded-xl overflow-hidden mb-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900/60 hover:bg-zinc-900 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-red-600 font-black text-xs">{num}</span>
          <span className="text-white text-sm font-bold text-left">{title}</span>
        </div>
        {open ? <ChevronUp size={14} className="text-white/40 flex-shrink-0" /> : <ChevronDown size={14} className="text-white/40 flex-shrink-0" />}
      </button>
      {open && <div className="px-4 py-3 text-white/60 text-sm leading-relaxed border-t border-white/5">{children}</div>}
    </div>
  );
};

const CGUComponent = () => (
  <div className="pt-24 pb-24 px-5 max-w-2xl mx-auto">
    <h1 className="text-3xl font-black text-white uppercase italic mb-1">CGU</h1>
    <p className="text-white/40 text-xs mb-2">Conditions Générales d'Utilisation</p>
    <p className="text-white/20 text-[10px] mb-8">Dernière mise à jour : Mars 2026</p>

    <Section num="01" title="Objet">
      Les présentes CGU régissent l'accès et l'utilisation du service AHRENA, plateforme d'agrégation et d'indexation de contenus vidéo publics relatifs à la pétanque.
    </Section>

    <Section num="02" title="Nature du service">
      <p className="mb-2">AHRENA référence, organise et affiche des contenus publiquement accessibles via des plateformes tierces, notamment YouTube, au moyen de lecteurs intégrés, liens, métadonnées et interfaces techniques mises à disposition par ces plateformes.</p>
      <p className="font-semibold text-white/80">AHRENA n'héberge aucune vidéo et ne revendique aucun droit de propriété sur les contenus référencés.</p>
    </Section>

    <Section num="03" title="Absence d'affiliation">
      Sauf mention expresse contraire, AHRENA n'est ni affilié, ni sponsorisé, ni approuvé par YouTube, Google, ou par les chaînes référencées.
    </Section>

    <Section num="04" title="Accès au service">
      Le service est accessible en ligne, sous réserve de disponibilité technique. AHRENA peut modifier, suspendre ou interrompre tout ou partie du service à tout moment.
    </Section>

    <Section num="05" title="Fonctionnalités premium (VIP)">
      <p className="mb-2">Certaines fonctionnalités sont proposées dans une formule premium : organisation de flux, affichage multi-fenêtres, chat en direct, favoris, notifications personnalisées.</p>
      <p className="font-semibold text-white/80">L'abonnement VIP rémunère exclusivement des fonctionnalités d'interface et d'expérience utilisateur, et non l'accès aux contenus vidéo eux-mêmes.</p>
    </Section>

    <Section num="06" title="Responsabilité sur les contenus">
      Les contenus affichés restent sous la responsabilité de leurs éditeurs et/ou ayants droit. AHRENA ne garantit ni l'exactitude, ni la disponibilité, ni la légalité de chaque contenu tiers.
    </Section>

    <Section num="07" title="Propriété intellectuelle">
      Tous les éléments propres à AHRENA (interface, design, code, base de données, marque, logo, textes originaux) sont protégés par les droits de propriété intellectuelle de Romaric Gouleret.
    </Section>

    <Section num="08" title="Procédure de retrait">
      Toute personne estimant qu'un contenu référencé porte atteinte à ses droits peut adresser une demande motivée à <span className="text-red-500">support@ahrena.com</span>. AHRENA s'engage à examiner la demande et à prendre les mesures nécessaires.
    </Section>

    <Section num="09" title="Limitation de responsabilité">
      AHRENA ne saurait être tenu responsable des interruptions de service, de la suppression d'un contenu par une plateforme tierce, de l'indisponibilité d'une API, ou de tout dommage indirect.
    </Section>

    <Section num="10" title="Droit applicable">
      Les présentes CGU sont soumises au droit français. Tout litige relève de la compétence des tribunaux français.
    </Section>

    <div className="mt-8 p-4 bg-zinc-900/50 rounded-xl border border-white/5 text-center">
      <p className="text-white/30 text-[10px]">AHRENA · Romaric Gouleret · SIRET 449 491 448 00022</p>
      <a href="mailto:support@ahrena.com" className="text-red-500 text-[10px] hover:text-red-400 transition-colors">support@ahrena.com</a>
    </div>
  </div>
);

export default CGUComponent;

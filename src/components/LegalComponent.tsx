import React from 'react';
import { ChevronRight, Mail, Globe, Shield, FileText, Database } from 'lucide-react';

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-4 border-b border-red-600/20 pb-2">
      {title}
    </h2>
    <div className="text-white/70 text-sm leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const LegalComponent = ({ onTabChange }: { onTabChange?: (tab: string) => void }) => {
  return (
    <div className="pt-24 pb-24 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black text-white uppercase italic mb-2">Mentions Légales</h1>
      <p className="text-white/40 text-xs mb-10">Conformément à la loi n°2004-575 du 21 juin 2004</p>

      <Section title="Éditeur de l'application">
        <p><span className="text-white font-semibold">Nom :</span> Romaric Gouleret</p>
        <p><span className="text-white font-semibold">Adresse :</span> 14 Route des Renardières, 03400 Saint-Ennemond, France</p>
        <p><span className="text-white font-semibold">SIRET :</span> 449 491 448 00022</p>
        <p>
          <span className="text-white font-semibold">Contact : </span>
          <a href="mailto:support@ahrena.com" className="text-red-500 hover:text-red-400 transition-colors">
            support@ahrena.com
          </a>
        </p>
      </Section>

      <Section title="Hébergement">
        <p><span className="text-white font-semibold">Hébergeur :</span> Vercel Inc.</p>
        <p><span className="text-white font-semibold">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
        <p><span className="text-white font-semibold">Site web :</span> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">vercel.com</a></p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L'application AHRENA et son contenu original (logo, design, code) sont la propriété exclusive de Romaric Gouleret. Toute reproduction, distribution ou utilisation sans autorisation est interdite.
        </p>
        <p>
          Les vidéos, miniatures et contenus affichés dans l'application proviennent de chaînes YouTube tierces via l'API officielle YouTube Data v3 et les flux RSS publics. AHRENA n'héberge aucune vidéo et ne revendique aucun droit sur ces contenus. Tous les droits appartiennent à leurs auteurs respectifs.
        </p>
      </Section>

      <Section title="Données personnelles & RGPD">
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants concernant vos données personnelles :
        </p>
        <ul className="space-y-1 pl-4">
          {[
            "Droit d'accès à vos données",
            "Droit de rectification",
            "Droit à l'effacement (droit à l'oubli)",
            "Droit à la portabilité",
            "Droit d'opposition au traitement",
          ].map((right, i) => (
            <li key={i} className="flex items-start gap-2">
              <ChevronRight size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
              {right}
            </li>
          ))}
        </ul>
        <p>
          Pour exercer ces droits, contactez : <a href="mailto:support@ahrena.com" className="text-red-500 hover:text-red-400 transition-colors">support@ahrena.com</a>
        </p>
      </Section>

      <Section title="Données collectées">
        <p>Dans le cadre de l'utilisation de l'application, les données suivantes peuvent être collectées :</p>
        <ul className="space-y-1 pl-4">
          {[
            "Adresse email et nom (lors de la création de compte)",
            "Données de connexion (via Supabase Auth)",
            "Favoris et préférences (stockés localement)",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <ChevronRight size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>
          Ces données sont stockées de manière sécurisée via <span className="text-white">Supabase</span> (infrastructure conforme RGPD) et ne sont jamais vendues à des tiers.
        </p>
      </Section>

      <Section title="Sous-traitants & Services tiers">
        <div className="space-y-2">
          {[
            { name: "YouTube Data API v3", role: "Récupération des lives et vidéos", link: "https://policies.google.com/privacy" },
            { name: "Supabase", role: "Authentification et base de données", link: "https://supabase.com/privacy" },
            { name: "Vercel", role: "Hébergement de l'application", link: "https://vercel.com/legal/privacy-policy" },
          ].map((service, i) => (
            <div key={i} className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-lg border border-white/5">
              <div>
                <p className="text-white text-xs font-bold">{service.name}</p>
                <p className="text-white/40 text-[10px]">{service.role}</p>
              </div>
              <a href={service.link} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
                <Globe size={14} />
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Cookies">
        <p>
          L'application AHRENA utilise uniquement le stockage local (localStorage) pour sauvegarder vos préférences et favoris. Aucun cookie de tracking ou publicitaire n'est utilisé.
        </p>
      </Section>

      <Section title="Responsabilité">
        <p>
          AHRENA est une application agrégateur de contenu. Elle ne peut être tenue responsable du contenu des vidéos diffusées par les chaînes YouTube tierces référencées. Chaque créateur de contenu est seul responsable de ses publications.
        </p>
        <p>
          AHRENA se réserve le droit de modifier les présentes mentions légales à tout moment. L'utilisateur est invité à les consulter régulièrement.
        </p>
      </Section>

      {/* Liens vers les autres pages juridiques */}
      <div className="mb-6 space-y-2">
        <p className="text-white/20 text-[9px] uppercase tracking-[0.2em] mb-3">Documents juridiques</p>
        {[
          { label: "Conditions Générales d'Utilisation (CGU)", tab: 'cgu' },
          { label: 'Politique de confidentialité & RGPD', tab: 'privacy' },
          { label: 'Politique de retrait de contenu', tab: 'takedown' },
        ].map((doc, i) => (
          <button
            key={i}
            onClick={() => onTabChange?.(doc.tab)}
            className="w-full flex items-center justify-between bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 hover:border-white/15 transition-colors"
          >
            <span className="text-white/60 text-xs">{doc.label}</span>
            <ChevronRight size={14} className="text-white/20" />
          </button>
        ))}
      </div>

      <div className="text-center pt-4 pb-2 border-t border-white/5">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
          Dernière mise à jour : Mars 2026
        </p>
        <p className="text-white/20 text-[10px] mt-1">
          AHRENA © 2026 — Romaric Gouleret
        </p>
      </div>
    </div>
  );
};

export default LegalComponent;

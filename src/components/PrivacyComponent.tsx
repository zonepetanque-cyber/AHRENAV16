import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe } from 'lucide-react';

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

const PrivacyComponent = () => (
  <div className="pt-24 pb-24 px-5 max-w-2xl mx-auto">
    <h1 className="text-3xl font-black text-white uppercase italic mb-1">Confidentialité</h1>
    <p className="text-white/40 text-xs mb-2">Politique de confidentialité & RGPD</p>
    <p className="text-white/20 text-[10px] mb-8">Dernière mise à jour : Mars 2026</p>

    <Section num="01" title="Responsable du traitement">
      <p><span className="text-white font-semibold">Romaric Gouleret</span></p>
      <p>14 Route des Renardières, 03400 Saint-Ennemond</p>
      <p>SIRET : 449 491 448 00022</p>
      <p>Contact : <a href="mailto:support@ahrena.com" className="text-red-500">support@ahrena.com</a></p>
    </Section>

    <Section num="02" title="Données collectées">
      Selon votre usage, AHRENA peut traiter : adresse email, identifiants de compte, données techniques (logs, appareil, navigateur), préférences utilisateur, favoris, abonnements aux chaînes, et données d'abonnement VIP le cas échéant.
    </Section>

    <Section num="03" title="Finalités du traitement">
      Gestion du compte, accès aux fonctionnalités, support, sécurité, prévention des abus, amélioration du service, facturation de l'abonnement VIP, et respect des obligations légales.
    </Section>

    <Section num="04" title="Bases légales">
      Exécution du contrat d'utilisation, intérêt légitime, respect des obligations légales, et consentement lorsque requis.
    </Section>

    <Section num="05" title="Sous-traitants & services tiers">
      <div className="space-y-2">
        {[
          { name: 'Supabase', role: 'Authentification & base de données', link: 'https://supabase.com/privacy' },
          { name: 'Vercel', role: 'Hébergement de l\'application', link: 'https://vercel.com/legal/privacy-policy' },
          { name: 'YouTube / Google', role: 'Données vidéo via API officielle', link: 'https://policies.google.com/privacy' },
          { name: 'Stripe (à venir)', role: 'Paiement sécurisé', link: 'https://stripe.com/fr/privacy' },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between bg-zinc-800/50 p-2.5 rounded-lg">
            <div>
              <p className="text-white text-xs font-bold">{s.name}</p>
              <p className="text-white/40 text-[10px]">{s.role}</p>
            </div>
            <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
              <Globe size={13} />
            </a>
          </div>
        ))}
      </div>
    </Section>

    <Section num="06" title="Durées de conservation">
      Les données sont conservées pendant la durée strictement nécessaire aux finalités poursuivies, puis supprimées. Les données de compte sont supprimées sur demande ou après 2 ans d'inactivité.
    </Section>

    <Section num="07" title="Vos droits RGPD">
      <p className="mb-2">Vous disposez des droits suivants :</p>
      <ul className="space-y-1 pl-2">
        {['Accès à vos données','Rectification','Effacement (droit à l\'oubli)','Limitation du traitement','Opposition','Portabilité','Retrait du consentement'].map((r,i) => (
          <li key={i} className="flex items-center gap-2 text-[11px]"><span className="text-red-600">→</span>{r}</li>
        ))}
      </ul>
      <p className="mt-3">Pour exercer vos droits : <a href="mailto:support@ahrena.com" className="text-red-500">support@ahrena.com</a></p>
    </Section>

    <Section num="08" title="Cookies & stockage local">
      AHRENA utilise uniquement le stockage local (localStorage) pour sauvegarder vos préférences. Aucun cookie de tracking ou publicitaire n'est utilisé. Aucun bandeau cookie n'est donc requis.
    </Section>

    <Section num="09" title="Transferts hors UE">
      Certains prestataires (Vercel, Supabase) peuvent traiter des données hors Union européenne. Des garanties appropriées sont mises en place via leurs clauses contractuelles types conformes au RGPD.
    </Section>

    <div className="mt-8 p-4 bg-zinc-900/50 rounded-xl border border-white/5 text-center">
      <p className="text-white/30 text-[10px]">Pour toute question relative à vos données personnelles</p>
      <a href="mailto:support@ahrena.com" className="text-red-500 text-[10px] hover:text-red-400 transition-colors">support@ahrena.com</a>
    </div>
  </div>
);

export default PrivacyComponent;

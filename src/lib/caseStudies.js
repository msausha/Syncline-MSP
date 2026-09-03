// Shared case-study data used by the Resources hub gallery and the detail pages.
export const caseStudies = [
  {
    slug: 'law-firm-cloud-migration',
    sector: 'Legal',
    title: 'Melbourne law firm cuts downtime to zero with managed cloud',
    metric: '100%',
    metricLabel: 'uptime after migration',
    image: 'https://media.base44.com/images/public/6a9945979125e52ca447b2b6/4183f90b9_generated_aeef78e3.jpg',
    summary:
      'A 40-staff commercial law firm replaced an ageing on-premise server with a fully managed Azure and Microsoft 365 environment — eliminating unplanned downtime and giving lawyers secure access from chambers, court, and home.',
    client:
      'Harper & Vance is a mid-sized commercial law firm based in Melbourne\'s CBD. With around 40 staff across litigation, corporate, and property practices, the firm runs on documents: briefs, contracts, and discovery files that people need instantly, wherever they are.',
    challenge:
      'The practice relied on a single on-premise server approaching end of vendor support. Outages were becoming more frequent — and each one stopped work firm-wide, since every document lived on that box. Backups ran nightly but had never been restore-tested, remote access was protected by a single shared password, and there was no documented plan for patching, recovery, or the eventual server replacement.',
    solution: [
      'Migrated all files, email, and practice-management data to Microsoft 365 and Azure over a staged four-week cutover, with work timed around court calendars so no billable day was lost.',
      'Deployed Azure Virtual Desktop so every lawyer has an identical, secured desktop from chambers, court, or home.',
      'Enforced multi-factor authentication and conditional access across every account, with privileged sign-in locked to managed devices only.',
      'Moved the firm onto a managed support plan with 24/7 monitoring, tested backups, and a dedicated account manager.',
    ],
    outcomes: [
      'Unplanned downtime has been zero in the twelve months since migration.',
      'Document retrieval is roughly 60% faster now that files live in SharePoint with full-text search.',
      'Every staff member can work securely from any location — including remote court appearances.',
      'The firm passed a legal-sector cybersecurity review with no critical findings.',
    ],
    stats: [
      { k: '100%', v: 'uptime since migration' },
      { k: '60%', v: 'faster document retrieval' },
      { k: '0', v: 'hours of unplanned downtime' },
    ],
  },
  {
    slug: 'field-service-device-deployment',
    sector: 'Trades',
    title: 'Field-service team unifies devices and secures remote access',
    metric: '48hr',
    metricLabel: 'to full deployment',
    image: 'https://media.base44.com/images/public/6a9945979125e52ca447b2b6/9d7569990_generated_7d2f5acf.jpg',
    summary:
      'A 25-technician electrical services company unified its field devices onto a single secured platform — deployed and fully operational within 48 hours, with no interruption to scheduled jobs.',
    client:
      'Ridgeline Electrical is a growing electrical services contractor serving construction and maintenance clients across Melbourne\'s west. Its 25 field technicians live on their tablets and phones: job sheets, site photos, safety forms, and quotes all happen on the road.',
    challenge:
      'Devices had accumulated organically — a mix of models and operating systems, some personally owned. Logins were shared and passwords passed around by text message, so nothing was attributable and nothing could be revoked properly. When a tablet was left on a site, there was no way to lock or wipe it, and no certainty about what company data was still on it.',
    solution: [
      'Standardised every technician on managed iPhones and iPads, enrolled into Microsoft Intune within a two-day rollout window.',
      'Replaced shared logins with individual Microsoft 365 accounts, each protected by multi-factor authentication.',
      'Automated app deployment so the job-management app installs itself and stays up to date on every device.',
      'Configured remote lock and wipe policies so a lost or stolen device can be neutralised in minutes, not days.',
    ],
    outcomes: [
      'Full deployment completed within 48 hours, with no interruption to scheduled jobs.',
      'Every device is now encrypted, tracked, and remotely wipeable.',
      'Shared credentials are gone — every action on company systems is attributable to an individual.',
      'Onboarding a new technician went from half a day to under an hour.',
    ],
    stats: [
      { k: '48hr', v: 'to full deployment' },
      { k: '25', v: 'devices secured and enrolled' },
      { k: '1hr', v: 'new-starter onboarding' },
    ],
  },
  {
    slug: 'accounting-onboarding-automation',
    sector: 'Professional Services',
    title: 'Accounting practice automates onboarding and offboarding',
    metric: '12hrs',
    metricLabel: 'saved per week',
    image: 'https://media.base44.com/images/public/6a9945979125e52ca447b2b6/966fca5f0_generated_4ecdfd53.jpg',
    summary:
      'A 30-staff accounting practice automated its IT onboarding and offboarding — cutting manual administration by around 12 hours a week and tightening security at the same time.',
    client:
      'Meridian Advisory is a 30-strong accounting and advisory practice in regional Victoria. Its workload swings hard with tax season, and a steady stream of interns and graduates cycles through the business all year.',
    challenge:
      'Every starter and leaver was handled manually by the office manager: creating the mailbox, assigning licences, adding groups, granting payroll-system access — a half-day of admin per person, repeated constantly. Offboarding was worse: accounts sometimes stayed active for weeks after a departure, and the practice had no reliable way to notice.',
    solution: [
      'Mapped every onboarding and offboarding step into documented, scripted workflows built on Microsoft 365 and Entra ID.',
      'Automated account creation, licensing, group membership, and payroll-system access from a single intake form.',
      'Made offboarding automatic: the moment HR flags a departure, accounts are disabled, access revoked, and mailbox data archived.',
      'Added a weekly automated licence and stale-account audit so unused accounts are caught in days, not months.',
    ],
    outcomes: [
      'Around 12 hours of manual administration saved per week across the practice.',
      'Offboarding that used to take days now completes in minutes — and never gets forgotten.',
      'No orphaned accounts have surfaced in the two audits since go-live.',
      'Seasonal intern intake scales without adding any extra admin load.',
    ],
    stats: [
      { k: '12hrs', v: 'saved per week' },
      { k: 'Minutes', v: 'to fully offboard a leaver' },
      { k: '0', v: 'orphaned accounts since go-live' },
    ],
  },
];

export function getCaseStudy(slug) {
  return caseStudies.find((s) => s.slug === slug);
}
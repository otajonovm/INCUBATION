import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { normalizeContent } from '../utils/textNormalize'

export const useHomepageContent = () => {
  const { t, tm } = useI18n()

  const content = computed(() => {
    const servicesCards = tm('homePage.services.cards')
    const tasksPoints = tm('homePage.tasks.points')
    const statsDescription = tm('homePage.stats.description')
    const footerUsefulLinks = tm('homePage.footer.usefulLinks')
    const footerContacts = tm('homePage.footer.contacts')

    return normalizeContent({
      brand: 'TUIT INCUBATION CENTER',
      nav: {
        links: [
          { label: t('nav.about'), href: '/about' },
          { label: t('nav.incubation'), href: '/incubation' },
          { label: t('nav.research'), href: '/research' },
          { label: t('nav.journals'), href: '/journals' },
          { label: t('nav.conferences'), href: '#tasks' },
          { label: t('nav.commercialization'), href: '/commercialization' },
        ],
        cta: t('nav.cta'),
      },
      hero: {
        title: t('homePage.hero.title'),
        description: t('homePage.hero.description'),
        videoText: t('homePage.hero.videoText'),
        videoSubtext: t('homePage.hero.videoSubtext'),
        cta: t('homePage.hero.cta'),
      },
      stats: {
        title: t('homePage.stats.title'),
        description: Array.isArray(statsDescription) ? statsDescription : [],
        cta: t('homePage.stats.cta'),
        cards: [
          { value: '8 +', label: t('homePage.stats.cardLabels.startups') },
          { value: '80 +', label: t('homePage.stats.cardLabels.itProjects') },
          { value: '500 +', label: t('homePage.stats.cardLabels.students') },
          { value: '50 +', label: t('homePage.stats.cardLabels.investments') },
        ],
      },
      services: {
        sectionTitle: t('homePage.services.sectionTitle'),
        sectionDescription: t('homePage.services.sectionDescription'),
        cards: Array.isArray(servicesCards) ? servicesCards : [],
        logos: ['swift', 'w', 'aws', 'figma', 'firebase', 'flutter', 'Google-cloud', 'Java'],
        badge: t('homePage.services.badge'),
        techTitle: t('homePage.services.techTitle'),
      },
      news: {
        title: t('homePage.news.title'),
        viewAll: t('homePage.news.viewAll'),
        items: [
          { title: 'News 1', imageClass: 'gallery-photo-a' },
          { title: 'News 2', imageClass: 'gallery-photo-b' },
          { title: 'News 3', imageClass: 'gallery-photo-c' },
          { title: 'News 4', imageClass: 'gallery-photo-d' },
        ],
      },
      tasks: {
        title: t('homePage.tasks.title'),
        points: Array.isArray(tasksPoints) ? tasksPoints : [],
      },
      team: {
        title: t('homePage.team.title'),
        members: [],
      },
      footer: {
        newsletterTitle: t('homePage.footer.newsletterTitle'),
        newsletterPlaceholder: t('homePage.footer.newsletterPlaceholder'),
        socialTitle: t('homePage.footer.socialTitle'),
        usefulLinksTitle: t('homePage.footer.usefulLinksTitle'),
        usefulLinks: Array.isArray(footerUsefulLinks) ? footerUsefulLinks : [],
        contactTitle: t('homePage.footer.contactTitle'),
        contacts: Array.isArray(footerContacts) ? footerContacts : [],
        copyright: t('homePage.footer.copyright'),
      },
    })
  })

  return {
    content,
  }
}

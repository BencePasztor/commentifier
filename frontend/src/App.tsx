import Layout from '@/components/Layout/Layout'
import PostsGrid from '@/features/posts/components/PostsGrid'

import PLACEHOLDER_IMAGE from '@/assets/post_placeholder.png'
const MOCK_DATA = [
  {
    id: 3,
    sourceUrl: 'https://444.hu/2024/02/26/olcsobb-lesz-a-bkk-berlet',
    title: 'Olcsóbb lesz a BKK-bérlet',
    description: 'Március 1-től csak 8950 forint.',
    image: PLACEHOLDER_IMAGE,
    createdAt: '2024-02-26T18:02:02.309Z',
    createdBy: 1,
    _count: { comment: 0 }
  },
  {
    id: 2,
    sourceUrl:
      'https://telex.hu/eszkombajn/2024/01/26/elatkozott-presley-csalad',
    title: 'A Presley család átka',
    description: 'Lorem ipsum dolor sit amet',
    image: PLACEHOLDER_IMAGE,
    createdAt: '2024-01-26T17:50:06.073Z',
    createdBy: 1,
    _count: { comment: 0 }
  },
  {
    id: 1,
    sourceUrl:
      'https://www.gamekapocs.hu/hir/82154/the_thaumaturge_igy_nez_ki_egy_komplett_kuldetes',
    title: 'The Thaumaturge - így néz ki egy komplett küldetés',
    description: 'Lorem ipsum dolor sit amet',
    image: PLACEHOLDER_IMAGE,
    createdAt: '2024-02-08T17:46:08.463Z',
    createdBy: 1,
    _count: { comment: 2 }
  },
  {
    id: 4,
    sourceUrl:
      'https://www.gamekapocs.hu/hir/82154/the_thaumaturge_igy_nez_ki_egy_komplett_kuldetes',
    title: 'The Thaumaturge - így néz ki egy komplett küldetés',
    description: 'Lorem ipsum dolor sit amet',
    image: PLACEHOLDER_IMAGE,
    createdAt: '2024-02-08T17:46:08.463Z',
    createdBy: 1,
    _count: { comment: 2 }
  },
  {
    id: 5,
    sourceUrl:
      'https://www.gamekapocs.hu/hir/82154/the_thaumaturge_igy_nez_ki_egy_komplett_kuldetes',
    title: 'The Thaumaturge - így néz ki egy komplett küldetés',
    description: 'Lorem ipsum dolor sit amet',
    image: PLACEHOLDER_IMAGE,
    createdAt: '2024-02-08T17:46:08.463Z',
    createdBy: 1,
    _count: { comment: 2 }
  },
  {
    id: 6,
    sourceUrl:
      'https://www.gamekapocs.hu/hir/82154/the_thaumaturge_igy_nez_ki_egy_komplett_kuldetes',
    title: 'The Thaumaturge - így néz ki egy komplett küldetés',
    description: 'Lorem ipsum dolor sit amet',
    image: PLACEHOLDER_IMAGE,
    createdAt: '2024-02-08T17:46:08.463Z',
    createdBy: 1,
    _count: { comment: 2 }
  },
  {
    id: 7,
    sourceUrl:
      'https://www.gamekapocs.hu/hir/82154/the_thaumaturge_igy_nez_ki_egy_komplett_kuldetes',
    title: 'The Thaumaturge - így néz ki egy komplett küldetés',
    description: 'Lorem ipsum dolor sit amet',
    image: PLACEHOLDER_IMAGE,
    createdAt: '2024-02-08T17:46:08.463Z',
    createdBy: 1,
    _count: { comment: 2 }
  }
]

function App() {
  return (
    <Layout>
      <PostsGrid posts={MOCK_DATA} />
    </Layout>
  )
}

export default App

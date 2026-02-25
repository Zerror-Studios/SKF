import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S, context) =>
  S.list()
    .title('Dashboard')
    .items([
      orderableDocumentListDeskItem({
        type: 'post', // 👈 your schema type
        title: 'Posts',
        S,
        context,
      }),
      S.documentTypeListItem('upcomingRelease').title('Upcoming Releases'),
      S.documentTypeListItem('blog').title('Blog'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'upcomingRelease', 'blog'].includes(item.getId()),
      ),
    ])

import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure = (S, context) =>
  S.list()
    .title("Dashboard")
    .items([

      orderableDocumentListDeskItem({
        type: "homeTopMovie",
        title: "Home – Top 3 Movies",
        S,
        context,
      }),
      // Upcoming Releases
      S.documentTypeListItem("upcomingRelease").title("Upcoming Releases"),

      // Blogs
      S.documentTypeListItem("blog").title("Blogs"),

      // Movies (orderable)
      orderableDocumentListDeskItem({
        type: "movies",
        title: "Movies",
        S,
        context,
      }),
      S.documentTypeListItem("filmography").title("Filmography"),
      // Gallery (orderable)
      orderableDocumentListDeskItem({
        type: "galleryAlbum",
        title: "Gallery Albums",
        S,
        context,
      }),

      S.divider(),

      // Remove duplicates from auto list
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["homeTopMovie", "upcomingRelease", "blog", "movies", "filmography", "galleryAlbum"].includes(
            item.getId()
          )
      ),
    ]);
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure = (S, context) =>
  S.list()
    .title("Dashboard")
    .items([
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


      S.divider(),

      // Remove duplicates from auto list
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["upcomingRelease", "blog", "movies","filmography"].includes(
            item.getId()
          )
      ),
    ]);
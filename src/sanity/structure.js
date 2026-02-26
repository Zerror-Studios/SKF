import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure = (S, context) =>
  S.list()
    .title("Dashboard")
    .items([
      // Upcoming Releases
      S.documentTypeListItem("upcomingRelease").title("Upcoming Releases"),

      // Blogs
      S.documentTypeListItem("blogs").title("Blogs"),

      // Movies (orderable)
      orderableDocumentListDeskItem({
        type: "movies",
        title: "Movies",
        S,
        context,
      }),

      // ✅ Filmography — SINGLE DOCUMENT
      S.listItem()
        .title("Filmography")
        .id("filmography")
        .child(
          S.document()
            .schemaType("filmography")
            .documentId("filmography")
        ),

      S.divider(),

      // Remove duplicates from auto list
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["upcomingRelease", "blogs", "movies", "filmography"].includes(
            item.getId()
          )
      ),
    ]);
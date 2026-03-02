import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure = (S, context) =>
  S.list()
    .title("Dashboard")
    .items([

      S.listItem()
        .title("Home Page – Hero Section Video")
        .id("heroSection")
        .child(
          S.document()
            .schemaType("heroSection")
            .documentId("heroSection") // 👈 fixed ID (singleton)
        ),
      orderableDocumentListDeskItem({
        type: "homeTopMovie",
        title: "Home Page – Top 3 Movies",
        S,
        context,
      }),
      // Upcoming Releases
      S.listItem()
        .title("Home Page – Upcoming Movie Banner")
        .id("upcomingRelease")
        .child(
          S.document()
            .schemaType("upcomingRelease")
            .documentId("upcomingRelease") // 🔒 fixed ID
        ),
      S.documentTypeListItem("homeDirectorSpotlight").title("Home Page – Director Spotlight"),

      // Blogs
      S.documentTypeListItem("blog").title("Manage Blogs"),

      // Movies (orderable)
      orderableDocumentListDeskItem({
        type: "movies",
        title: "Manage Movies",
        S,
        context,
      }),
      // ℹ️ ABOUT PAGE (NEW)
      S.listItem()
        .title("About Page – Hero Section")
        .id("aboutHeroSection")
        .child(
          S.document()
            .schemaType("aboutHeroSection")
            .documentId("aboutHeroSection") // 🔒 singleton
        ),

      S.documentTypeListItem("filmography").title("Manage Filmography"),
      // Gallery (orderable)
      orderableDocumentListDeskItem({
        type: "galleryAlbum",
        title: "Manage Gallery",
        S,
        context,
      }),

      S.divider(),

      // Remove duplicates from auto list
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["heroSection", "homeTopMovie", "homeDirectorSpotlight", "upcomingRelease", "aboutHeroSection", "blog", "movies", "filmography", "galleryAlbum"].includes(
            item.getId()
          )
      ),
    ]);
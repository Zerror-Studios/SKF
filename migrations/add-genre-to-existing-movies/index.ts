import { defineMigration, at, setIfMissing } from "sanity/migrate";

export default defineMigration({
  title: "add-genre-to-existing-movies",

  migrate: {
    document(doc) {
      // only target movies documents
      if (doc._type !== "movies") return;

      // set genre only if it does not exist
      return at("genre", setIfMissing("Action | Thriller"));
    },
  },
});
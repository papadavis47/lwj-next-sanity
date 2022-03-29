import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "1zvcurry",
  dataset: "production",
  useCdn: false,
});

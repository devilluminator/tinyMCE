import { getAllData } from "@/server/actions/write-to-db";

export const contentsQueryOptions = () => ({
  queryKey: ["contents"],
  queryFn: getAllData,
});

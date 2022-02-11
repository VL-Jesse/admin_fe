export const useQuery = (search: string, name: string) => {
  let query = new URLSearchParams(search);
  return query.get(name);
};


export const getPopularCategories = async (
  apiEndpoint: string,
  isPashto: boolean
): Promise<{ label: string; value: string }[]> => {
  try {
    const response = await fetch(`${apiEndpoint}/api/categories/popular/`);
    const data = await response.json();
    console.log("Popular categories data:", data);
    return data.map((cat: any) => ({
      label: isPashto ? cat.ps : cat.en,
      value: isPashto ? cat.ps : cat.en,
    }));
  } catch (error) {
    console.error("Error fetching popular categories:", error);
    return [];
  }
};

export const searchCategories = async (
  apiEndpoint: string,
  name: string,
  language: string,
  isPashto: boolean
): Promise<{ label: string; value: string }[]> => {
  try {
    const query = encodeURIComponent(name);
    const response = await fetch(
      `${apiEndpoint}/api/categories/search?name=${query}&language=${language}`
    );
    const data = await response.json();

    return data.map((cat: any) => ({
      label: isPashto ? cat.ps : cat.en,
      value: isPashto ? cat.ps : cat.en,
    }));
  } catch (error) {
    console.error("Error searching categories:", error);
    return [];
  }
};









// const [popularCategories, setPopularCategories] = useState<
//     { label: string; value: string }[]
//   >([]);
//   const [searchResults, setSearchResults] = useState<
//     { label: string; value: string }[]
//   >([]);

//   // Load popular categories on mount
  
//   const apiendpoint =  process.env.NEXT_PUBLIC_API_ENDPOINT;
// useEffect(() => {
//   if (apiendpoint) {
//     getPopularCategories(apiendpoint, isPashto).then(setPopularCategories);
//   }
// }, [apiendpoint, isPashto]);
// useEffect(() => {
//   const delay = setTimeout(() => {
//     if (apiendpoint && inputValue.trim()) {
//       searchCategories(apiendpoint, inputValue, language, isPashto).then(
//         setSearchResults
//       );
//     } else {
//       setSearchResults([]);
//     }
//   }, 300);

// }, [inputValue, apiendpoint, language, isPashto]);
//   return () => clearTimeout(delay);
// }, [inputValue, apiendpoint, language, isPashto]);
export async function fetchBrands(searchTerm?: string) {
  try {
    // Using local API route instead of direct external API call
    const response = await fetch('/api/brands');
    if (!response.ok) throw new Error('Failed to fetch brands');
    
    const brands = await response.json();
    
    if (!searchTerm) return brands;
    
    // Filter brands based on search term
    return brands.filter((brand: { brand_name: string; brand_country?: string; brand_tags: string[] }) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        brand.brand_name.toLowerCase().includes(searchLower) ||
        brand.brand_country?.toLowerCase().includes(searchLower) ||
        brand.brand_tags.some((tag: string) =>
          tag.toLowerCase().includes(searchLower)
        )
      );
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
}

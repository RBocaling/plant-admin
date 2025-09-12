import { useState, useEffect } from "react";
import { Leaf, Search, Filter } from "lucide-react";
import { supabase } from "../lib/supabaseClient"; // Make sure you have your Supabase client
import heroImage from "../assets/hero-plant-shop.jpg";

const ProductCard = ({ product }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "plants":
        return <Leaf className="h-4 w-4 text-plant-green" />;
      case "pots":
        return <Leaf className="h-4 w-4 text-earth-terracotta" />;
      case "fertilizers":
        return <Leaf className="h-4 w-4 text-earth-brown" />;
      default:
        return <Leaf className="h-4 w-4" />;
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-square overflow-hidden bg-accent">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors space-x-1 bg-secondary text-secondary-foreground">
            {getCategoryIcon(product.category)}
            <span className="capitalize">{product.category}</span>
          </span>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${
              product.in_stock
                ? "bg-primary text-primary-foreground"
                : "bg-destructive text-destructive-foreground"
            }`}
          >
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <p className="text-xl font-bold text-plant-green">
          ₱{product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["all", "plants", "pots", "fertilizers"];

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data: plants, error: plantsError } = await supabase
          .from("plants")
          .select("*");
        const { data: pots, error: potsError } = await supabase
          .from("pots")
          .select("*");
        const { data: fertilizers, error: fertError } = await supabase
          .from("fertilizers")
          .select("*");

        if (plantsError || potsError || fertError) {
          console.error(plantsError || potsError || fertError);
          return;
        }

        // Merge all products and add category
        const allProducts = [
          ...(plants?.map((p) => ({ ...p, category: "plants" })) || []),
          ...(pots?.map((p) => ({ ...p, category: "pots" })) || []),
          ...(fertilizers?.map((f) => ({ ...f, category: "fertilizers" })) ||
            []),
        ];

        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Green Paradise
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of plants, pots, and fertilizers to
            create your perfect green space.
          </p>
        </div>
      </section>

      <section className="py-8 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-bold transition-colors cursor-pointer capitalize ${
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : " text-primary"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading products...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;

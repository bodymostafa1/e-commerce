import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import productRouter from "./product/product.routes.js"
import subCategoryRouter from "./subCategory/subCategory.routes.js"

export const bootsrap = (app)=>{
    app.use("/api/categories",categoryRouter)
    app.use("/api/subCategories",subCategoryRouter)
    app.use("/api/brands",brandRouter)
    app.use("/api/products",productRouter)
}
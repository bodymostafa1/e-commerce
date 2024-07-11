import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import subCategoryRouter from "./subCategory/subCategory.routes.js"

export const bootsrap = (app)=>{
    app.use("/api/categories",categoryRouter)
    app.use("/api/subCategories",subCategoryRouter)
    app.use("/api/brand",brandRouter)
}